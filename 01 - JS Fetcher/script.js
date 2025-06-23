const fetchUsersBtn = document.getElementById("fetch-users");
const usersList = document.getElementById("user-list");

async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    usersList.innerHTML = ""; // Clear previous list items
    users.forEach((user) => {
      const listItem = document.createElement("li");
      listItem.textContent = `ID: ${user.id} | Name (Email/Username): ${user.name} (${user.email}/${user.username}) | Address: ${user.address.city}, ${user.address.street}`;
      usersList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
  }
}

fetchUsersBtn.addEventListener("click", fetchUsers);
