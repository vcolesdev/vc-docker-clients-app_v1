/* Promise.js */
const handleResponse = (response, data) => response.status(200).send(data);
const handleError = (response, error = {}) => response.status(error.status || 500).send({error: error.message});

/**
 * Promise middleware
 * This middleware is used to resolve promises in Express.js routes.
 * @link https://www.toptal.com/express-js/routes-js-promises-error-handling
 * @returns {function(*, *, *): *}
 */
export default function promiseMiddleware() {
  return (request, response, next) => {
    response.promise = (promise) => {
      let promiseToResolve;

      if (promise.then && promise.catch) {
        promiseToResolve = promise;
      } else if (typeof promise === "function") {
        promiseToResolve = Promise.resolve().then(() => promise());
      } else {
        promiseToResolve = Promise.resolve(promise);
      }

      return promiseToResolve
        .then((data) => handleResponse(response, data))
        .catch((error) => handleError(response, error));
    }

    return next();
  }
}