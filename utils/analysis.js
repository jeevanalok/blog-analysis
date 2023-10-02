/*
------------------------------------------------------
blogAnalysis function with respect to fetched blogs from curl
------------------------------------------------------

function 'blogAnalysis' that takes one parameter blogs runs various analysis such as
an array of blogs which matchtes the query parameter and performs the following analysis using lodash
1.calculates total blogs
2.calculates blog with longest title
3.calculates blog with 'privacy' keyword in title
4.calculates no.of unique  blog titles

and returns it in JSON format
*/


const _ = require("lodash");

function blogAnalysis(blogs) {
  const totalBlogs = blogs.length;

  const blogWithLongestTitle = _.maxBy(blogs, "title.length");

  const blogsWithPrivacyKeyword = _.filter(blogs, (blog) =>
    _.includes(_.toLower(blog.title), "privacy")
  );

  const numberOfBlogsWithPrivacyKeyword = blogsWithPrivacyKeyword.length;

  const uniqueBlogTitles = _.uniqBy(blogs, "title").map((blog) => blog.title);

  return {
    totalBlogs,
    blogWithLongestTitle,
    numberOfBlogsWithPrivacyKeyword,
    uniqueBlogTitles,
  };
}

module.exports = { blogAnalysis };
