const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    role
  } = data;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    alert("All fields are required");
    return;
  }

  if (password !== confirmPassword) {
    alert("Password not match");
    return;
  }

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const existingUser = users.find(
    (user) => user.email === email
  );

  if (existingUser) {
    alert("Email already exists");
    return;
  }

  const user = {
    firstName,
    lastName,
    email,
    password,
    role
  };

  users.push(user);

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  alert("Signup successful");

  window.location.href = "index.html";
});