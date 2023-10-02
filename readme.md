# Express Server with Memoization for Blog Analysis and Search

This is an Express.js server that provides two endpoints for analyzing and searching blogs. It uses memoization techniques to cache and optimize repeated requests for blog analysis and searches.

## Dependencies

- [axios](https://github.com/axios/axios): A promise-based HTTP client for making requests to external APIs.
- [express](https://expressjs.com/): A web application framework for Node.js.
- [lodash](https://lodash.com/): A modern JavaScript utility library delivering modularity, performance & extras.
- [memoizationWithExpiration](#): A custom memoization function with expiration capabilities leveraging lodash memoize.
- [blogAnalysis](#): A custom function for analyzing blog data.
- [searchBlogs](#): A custom function for searching blogs.

## Server Setup

The server is set up with Express.js and listens on a specified port (default is 3000).

## Middleware

There is a middleware function that fetches blog data from an external API and attaches it to the request object. It also checks for a specific admin secret key in the request headers for authorization.

## Endpoints

### 1. Get Blog Statistics and Analysis (Memoized)

- **Endpoint:** `/api/blog-stats`
- **HTTP Method:** GET

This endpoint retrieves blog data, performs analysis on it, and returns the results. The analysis results are memoized to improve performance. If the analysis has not been memoized yet or has expired, it will be recalculated and cached.

### 2. Get Blog Search Results (Memoized)

- **Endpoint:** `/api/blog-search`
- **HTTP Method:** GET

This endpoint allows you to search for blogs based on a query parameter. The search results are memoized to optimize repetitive queries. If the search results for a specific query are not available or have expired, a new search will be performed and cached.

## Error Handling

The server handles various error scenarios:

- Invalid or missing authorization key in the headers results in a 401 Unauthorized response.
- Errors during fetching of blog data result in a 401 Unauthorized response.
- If the blog analysis or search functions encounter errors, a 500 Internal Server Error response is sent.

## Running the Server

You can run this Express.js server by executing the code provided. Make sure to install the required dependencies using npm or yarn before starting the server.

To start the server, you can run:

```bash
node index.js
```

The server will run on the specified port (default is 3000), and you can access the endpoints to perform blog analysis and searches.

Make sure to set the `x-hasura-admin-secret` header with a valid key when making requests to the server for authorization.
