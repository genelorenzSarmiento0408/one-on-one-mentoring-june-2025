const fetchUsersBtn = document.getElementById("fetch-users");
const usersList = document.getElementById("user-list");

async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    const tableHTML = `
      <h2>Users List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          ${users
            .map(
              (user) => `
            <tr>
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.username}</td>
              <td>${user.address.city}, ${user.address.street}</td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    `;
    usersList.innerHTML = tableHTML;
    console.log("Usernames:", usersUname);
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
  }
}

fetchUsersBtn.addEventListener("click", fetchUsers);
