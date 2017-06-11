(function () {
  function init() {
    //change request method
    $("#method").change(methodChange);
    $("#add-header").click(addHeader);
    $("#add-data").click(addBody);
    $("#send").click(makeRequest);

    getUsers();
  }

  function getUsers() {
    ajax({
      method: "GET",
      url: "https://api.github.com/users"
    }).done(function(result) {
      debugger;
      $("#response").text(result);
    })
  }

  function methodChange() {
    switch ($(this).find("option:selected").attr("id")) {
      case "method-get":
        $(".new-request #add-data").addClass("disabled");
        break;
      case "method-head":
        $(".new-request #add-data").addClass("disabled");
        break;
      case "method-post":
        $(".new-request #add-data").removeClass("disabled");
        break;
      case "method-put":
        $(".new-request #add-data").addClass("disabled");
        break;
    }
  }

  function addHeader() {
    /*<div class="request-header">
        <button class="btn remove" type="button"><span class="glyphicon glyphicon-minus"></span></button>
        <input type="text" class="form-control header-name" placeholder="header">
        <input type="text" class="form-control header-value" placeholder="value">
      </div>*/
    var div = makeElement({
      name: "div",
      class: "request-header"
    });

    var button = makeElement({
      name: "button",
      class: "btn remove",
      type: "button",
      event: {
        name: "click",
        handler: removeHeader
      }
    });

    var span = makeElement({
      name: "span",
      class: "glyphicon glyphicon-minus",
    });
    button.append(span);

    var headerName = makeElement({
      name: "input",
      class: "form-control header-name",
      type: "text",
      placeholder: "header",
      required: "required"
    });
    var headerValue = makeElement({
      name: "input",
      class: "form-control header-value",
      type: "text",
      placeholder: "value",
      required: "required"
    });

    div.append(button, headerName, headerValue);

    $(".request-headers").append(div);
  }

  function removeHeader() {
    $(this).closest(".request-header").remove();
  }

  function addBody() {
    /*<div class="data">
        <button class="btn remove" type="button"><span class="glyphicon glyphicon-minus"></span></button>
        <input type="text" class="form-control key" placeholder="key">
        <input type="text" class="form-control value" placeholder="value">
      </div>*/
    var div = makeElement({
      name: "div",
      class: "data"
    });

    var button = makeElement({
      name: "button",
      class: "btn remove",
      type: "button",
      event: {
        name: "click",
        handler: removeData
      }
    });

    var span = makeElement({
      name: "span",
      class: "glyphicon glyphicon-minus",
    });
    button.append(span);

    var keyName = makeElement({
      name: "input",
      class: "form-control key",
      type: "text",
      placeholder: "key",
      required: "required"
    });
    var keyValue = makeElement({
      name: "input",
      class: "form-control value",
      type: "text",
      placeholder: "value",
      required: "required"
    });

    div.append(button, keyName, keyValue);

    $(".request-data").append(div);
  }

  function removeData() {
    console.log("r");
    $(this).closest(".data").remove();
  }

  //Element maker
  function makeElement(el) {
    if (!el.name) {
      return $("<div></div>");
    }

    var newElement = $("<" + el.name + "/>");
    for (var key in el) {
      if (key === "class") {
        newElement.addClass(el[key]);
      } else if (key === "event") {
        newElement.on(el[key].name, el[key].handler);
      } else {
        newElement.attr(key, el[key]);
      }
    }
    return newElement;
  }

  //AJAX request
  function makeRequest(e) {
    e.preventDefault();
  }

  init();
})();