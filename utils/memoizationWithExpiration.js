/*
------------------------------------------------------
CUSTOM memoizationWithTimeExpiration code explanation
------------------------------------------------------

function 'memoizationWithExpiration' that takes a function 'fn',
 a 'resolveFn', and an optional 'expirationTime' (default is 60,000 milliseconds)

the startTime variable keeps track of starting time and hasExpired acts as a cache counter.
if the cache has expired i.e hasExpired= True, return the original function 'fn' without memoization
If the cache is still valid, apply memoization using 'memoize' from lodash
 
 
 */
const { memoize } = require("lodash");

let startTime = Date.now();
let hasExpired = false;

function memoizationWithExpiration(fn, resolveFn, expirationTime = 60000) {
  if (!hasExpired) {
    let currTime = Date.now();

    // If the expiration time has passed, mark as expired and reset the start time
    if (currTime - startTime >= expirationTime) {
      hasExpired = true;
      startTime = Date.now();
    }
  }

  if (hasExpired) {
    hasExpired = false;
    return fn;
  } else {
    return memoize(fn, resolveFn);
  }
}

module.exports = { memoizationWithExpiration };
