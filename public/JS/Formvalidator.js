(function () {
  "use strict";

  var forms = document.querySelectorAll(".need-validate");

  Array.prototype.slice
    .call(forms) //coverting the response to the respective arrays
    .forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
})();
