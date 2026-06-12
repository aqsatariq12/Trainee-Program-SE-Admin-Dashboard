const loginFormContainer =
  document.getElementById("loginFormContainer");

loginFormContainer.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  const { email, password } = data;

  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  if (users.length === 0) {
    alert("Please Signup first");
    return;
  }

  const foundUser = users.find(
    (user) => user.email === email
  );

  if (!foundUser) {
    alert("Email not found");
    return;
  }

  if (foundUser.password !== password) {
    alert("Invalid Credentials");
    return;
  }

  localStorage.setItem(
    "currentUser",
    JSON.stringify(foundUser)
  );

  localStorage.setItem(
    "isLogin",
    true
  );

  alert("Login Successful");

  window.location.href = "dashboard.html";
});