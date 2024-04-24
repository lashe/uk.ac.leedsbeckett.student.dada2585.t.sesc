$("#registerForm").submit(function (e) {
  e.preventDefault(e);

  $.ajax({
    url: $("#registerForm").attr("action"),
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      email: $("#email").val(),
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      studentId: $("#studentId").val(),
      intake: $("#intake").val(),
      password: $("#password").val(),
    }),
    success: function (data) {
      window.location.href = "/login";
    },
  });
});

$("#loginForm").submit(function (e) {
  e.preventDefault(e);

  $.ajax({
    url: $("#loginForm").attr("action"),
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      studentId: $("#studentId").val(),
      password: $("#password").val(),
    }),
    success: function (data) {
      window.localStorage.setItem("token", data.data.token);
      window.localStorage.setItem("refreshToken", data.data.refreshToken);
      window.location.href = "/courses";
    },
  });
});
