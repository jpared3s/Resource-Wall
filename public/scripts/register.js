const registerUserName = document.getElementById("register-username");

if (registerUserName.value === "") {
  alert("username can not be empty!");
  return false;
}
