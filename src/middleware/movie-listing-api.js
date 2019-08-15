const callApi = (fullUrl) => {

  console.log('Middleware movie-listing-api', fullUrl);

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json)
        }
        return Object.assign({}, json)
      })
    )
}
export const CALL_API = 'Call API';

export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }
  let { endpoint } = callAPI;
  const {types} = callAPI;
  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }
  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }
  const [ requestType, successType, errorType ] = types;
  next(actionWith({ type: requestType }));

  return callApi(callAPI.value).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: errorType,
      error: error.message
    }))
  )
}