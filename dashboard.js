const isLogin = localStorage.getItem("isLogin");
if (isLogin !== "true") {
  window.location.href = "index.html";
}

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const profileBtn = document.getElementById("profileBtn");
console.log(currentUser);
profileBtn.textContent = currentUser.firstName[0].toUpperCase();

const userName = document.getElementById("userName");
userName.textContent = `${currentUser.firstName} ${currentUser.lastName}`;

const dropdown = document.getElementById("dropdown");
profileBtn.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
  localStorage.setItem("isLogin", false);
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});

async function getUsers() {
  try {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    // console.log(data.users);

    return data.users;
  } catch (error) {
    console.log(error);
    return [];
  }
  // console.log(data);
}

function renderUsers(users) {
  const tableBody = document.getElementById("tableBody");
  //   console.log("key is :  ", Object.keys(users[0]));
  const keys = Object.keys(users[0]).filter(
    (key) => typeof users[0][key] != "object",
  );
  const thead = document.querySelector("thead tr");

  keys.forEach((key) => {
    const th = document.createElement("th");
    th.className = "p-3 text-left whitespace-nowrap";
    th.textContent = key;
    thead.appendChild(th);
  });
  tableBody.innerHTML = "";

  users.forEach((user) => {
    const tr = document.createElement("tr");
    tr.className =
      "border-b hover:text-[rgb(80,22,18)] hover:cursor-pointer transition";

    keys.forEach((key) => {
      const td = document.createElement("td");
      td.className = "p-3 border-b whitespace-nowrap";

      let value = user[key];

      if (typeof value === "string") {
        td.textContent = value.length > 20 ? value.slice(0, 20) + "..." : value;
      } else {
        td.textContent = value;
      }

      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
  });
}

async function loadUsers() {
  const user = await getUsers();
  renderUsers(user);
}

loadUsers();
