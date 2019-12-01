const localStorage = (function() {

  const get = (name) => {
    return this.localStorage.getItem(name);
  };

  const set = (key, name) => {
    this.localStorage.setItem(key, name);
  };

  const del = (key) => {
    this.localStorage.removeItem(key);
  };

  const has = (key) => {
    if (this.localStorage.getItem(key)) {
      return true
    } else {
      return false
    }
  };

  return {
    get: get,
    set: set,
    del: del,
    has: has
  };

})();