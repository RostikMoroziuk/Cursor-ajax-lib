(function () { //function ajax for requests
  //static constant for identify state of request
  ajax.FAIL = 0;
  ajax.SUCCESS = 1;

  //static function for request
  ajax.get = function() {

  }

  ajax.head = function() {

  }

  ajax.post = function() {

  }

  ajax.put = function() {

  }

  function ajax(attr) {
    if (!("url" in attr)) {
      alert("URL not defined");
      return new RequestDescriptor(ajax.FAIL);
    }

    var url = attr.url;
    var headers = attr.headers;
    var data = attr.data;
    var method;
    if (url.method) {
      method = url.method.toUpperCase();
    } else {
      method = GET;
    }

    switch (method) {
      case "GET": 
        return ajax.get(url, headers);
      case "HEAD":
        return ajax.head(url, headers);
      case "POST":
        return ajax.post(url, data, headers);
      case "PUT":
        return ajax.put(url, headers);
      default:
        alert("Not correct method");
        return new RequestDescriptor(ajax.FAIL);
    }
  }



  function RequestDescriptor(state) {
    this._state = state;
  }

  RequestDescriptor.prototype.done = function (cb) {
    if (state) {
      cb();
    } else {
      alert("AJAX request was failed");
    }
  }

  window.ajax = ajax;
})();