(function () { //function ajax for requests
  //static constant for identify state of request
  ajax.FAIL = 0;
  ajax.SUCCESS = 1;

  //headers - array with objs {name, value}

  //static function for request
  ajax.get = function (url, headers) {
    var rd = new RequestDescriptor;
    var xhr = new XMLHttpRequest;
    setHeaders(xhr, headers);
    xhr.open("GET", url);
    xhr.onload = function () {
      activateRequestDescriptor(xhr, rd);
    }
    xhr.send();
  }

  ajax.head = function (url, headers) {
    var rd = new RequestDescriptor;
    var xhr = new XMLHttpRequest;
    setHeaders(xhr, headers);
    xhr.open("HEAD", url);
    xhr.onload = function () {
      activateRequestDescriptor(xhr, rd);
    }
    xhr.send();
  }

  ajax.post = function (url, data, headers) {
    var rd = new RequestDescriptor;
    var xhr = new XMLHttpRequest;
    setHeaders(xhr, headers);
    xhr.open("POST", url);
    xhr.onload = function () {
      activateRequestDescriptor(xhr, rd);
    }
    xhr.send(JSON.stringify(data));
  }

  ajax.put = function (url, headers) {
    var rd = new RequestDescriptor;
    var xhr = new XMLHttpRequest;
    setHeaders(xhr, headers);
    xhr.open("PUT", url);
    xhr.onload = function () {
      activateRequestDescriptor(xhr, rd);
    }
    xhr.send();
  }

  function activateRequestDescriptor(xhr, rd) {
    //if RequestDescriptor has handler
    if (rd._onrequestdone) {
      //if request finish successed
      if (xhr.status == 200) {
        rd.setState(ajax.SUCCESS);
      } else {
        rd.setState(ajax.FAIL);
      }
      rd._onrequestdone();
    }
  }

  function setHeaders(xhr, headers) {
    if (headers) {
      for (var i = 0; i < headers.length; i++) {
        xhr.setRequestHeader(headers[i].name, headers[i].value);
      }
    }
  }

  function ajax(attr) {
    if (!("url" in attr)) {
      alert("URL not defined");
      return new RequestDescriptor(ajax.FAIL);
    }

    var method;
    if (attr.method) {
      method = attr.method.toUpperCase();
    } else {
      method = GET;
    }
    var url = attr.url;
    var headers = attr.headers;
    var data = attr.data;

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

  //custom promise
  function RequestDescriptor(state) {
    if (arguments.length > 0) {
      this._state = state;
    } else {
      this._state = null;
    }

    this._onrequestdone = null;
  }

  RequestDescriptor.prototype.done = function (cb) {
    var rd = new RequestDescriptor;
    this._onrequestdone = function () {
      if (this._state) {
        cb();
        rd._state = ajax.SUCCESS;
      } else {
        alert("AJAX request was failed");
        rd._state = ajax.FAIL;
      }
    }
    return rd;
  }

  RequestDescriptor.prototype.setState = function (state) {
    this._state = state;
  }

  window.ajax = ajax;
})();