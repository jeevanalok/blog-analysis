const axios = require("axios");
const express = require("express");

const { blogAnalysis } = require("./utils/analysis");
const { searchBlogs } = require("./utils/searchBlogs");
const {
  memoizationWithExpiration,
} = require("./utils/memoizationWithExpiration");

const app = express();

//config for fetching data for given curl
const config = {
  headers: {
    "x-hasura-admin-secret":
      "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
  },
};

//memoize resolver function for lodash memoize
function memoizeResolveFunction(param) {
  return function () {
    return param;
  };
}

//middleware
app.use(async (req, res, next) => {
  if (config.headers["x-hasura-admin-secret"] == null) {
    res.status(401).json({ Error: "Missing Authroization Key." });
    return;
  }
  try {
    const { data } = await axios.get(
      "https://intent-kit-16.hasura.app/api/rest/blogs",
      config
    );

    if (!data) {
      res
        .status(501)
        .json({ error: "gateway error. couldn't retrieve blog data" });
    }

    req.blogData = data.blogs;
    next();
  } catch (error) {
    console.log("Error:", error.config);
    res.status(401).json({ error: "Error while fetching data" });
  }
});

//get blog statistics and analysis (memoized)
app.get("/api/blog-stats", async (req, res) => {
  let blogData = req.blogData;
  let memoizedBlogAnalysis = memoizationWithExpiration(
    blogAnalysis,
    memoizeResolveFunction(blogData)
  );

  try {
    let responseData = memoizedBlogAnalysis(blogData);

    if (responseData.length == 0) {
      res.status(500).json({ error: "Error generating blog analysis" });
    }
    res.status(200).json({ data: responseData });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get blog search results through query parameter (memoized)
app.get("/api/blog-search", async (req, res) => {
  const query = req.query.query;
  const blogData = req.blogData;

  if (!query) {
    return res
      .status(400)
      .json({ error: 'Query parameter "query" is required.' });
  }
  let memoizedSearchResults = memoizationWithExpiration(
    searchBlogs,
    memoizeResolveFunction(query)
  );
  try {
    let searchResults = memoizedSearchResults(query, blogData);

    if (searchResults.length != 0) {
      res.status(200).json({ data: searchResults });
    } else {
      res.status(404).json({ message: "No blogs found for the given query." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
