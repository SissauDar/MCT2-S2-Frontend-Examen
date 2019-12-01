const dataAccess = (function() {

  // API call
  const quoteAPI = ({
    url,
    method = "GET",
    body = null,
    handleError = "Error: "
  }) => {
    return fetch(url, {
        method: method,
        body: body,
        cache: 'no-cache'
      })
      .then(response => response.json())
      .then(data => data)
      .catch(err => handleError(err));

  };



  return {
    quoteAPI: quoteAPI,
  }
})();