const fetchUsersBtn = document.getElementById("fetch-users");
const usersList = document.getElementById("user-list");

async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    const tableHTML = `
      <h2>Users List</h2>
      <div class="user-cards">
      ${users
        .map(
          (user) => `
          <div class="user-card">
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Username: ${user.username}</p>
            <p>Address: ${user.address.city}, ${user.address.street}</p>
            <p>ID: ${user.id}</p>
          </div>
        `
        )
        .join("")}
        </div>
    `;
    usersList.innerHTML = tableHTML; // Clear previous list items
    console.log("Usernames:", usersUname);
    // users.forEach((user) => {
    //   const listItem = document.createElement("li");
    //   listItem.textContent = `ID: ${user.id} | Name (Email/Username): ${user.name} (${user.email}/${user.username}) | Address: ${user.address.city}, ${user.address.street}`;
    //   usersList.appendChild(listItem);
    // });
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
  }
}

fetchUsersBtn.addEventListener("click", fetchUsers);
