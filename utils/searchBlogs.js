/*
------------------------------------------------------
searchblogs function with respect to query parameter
------------------------------------------------------

function 'searchBlogs' that takes parameter query and blogs and returns 
an array of blogs which matchtes the query parameter
*/

const _ = require("lodash");

function searchBlogs(query, blogs) {
  const res = [];

  for (const blog of blogs) {
    if (blog.title.toLowerCase().includes(query.toLowerCase())) {
      res.push(blog);
    }
  }

  return res;
}

module.exports = { searchBlogs };
