const API_URL = "/api/users";

// ===============================
// Load Users
// ===============================

async function loadUsers() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load users");
        }

        const users = await response.json();

        const table = document.getElementById("usersTable");

        table.innerHTML = "";

        users.forEach(user => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.address}</td>
                <td>${user.mobile}</td>
                <td>
                    <button
                        class="edit-btn"
                        onclick="editUser(${user.id})">
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteUser(${user.id})">
                        Delete
                    </button>
                </td>
            `;

            table.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading users:", error);
        alert("Unable to load users");
    }
}


// ===============================
// Open Create Form
// ===============================

function openCreateForm() {

    document.getElementById("formTitle").textContent = "Create User";

    document.getElementById("userFormContainer")
        .classList.remove("hidden");

    document.getElementById("userForm").reset();

    document.getElementById("userId").value = "";
}


// ===============================
// Close Form
// ===============================

function closeForm() {

    document.getElementById("userFormContainer")
        .classList.add("hidden");

    document.getElementById("userForm").reset();

    document.getElementById("userId").value = "";
}


// ===============================
// Edit User
// ===============================

async function editUser(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error("Failed to get user");
        }

        const user = await response.json();

        // Change form title
        document.getElementById("formTitle")
            .textContent = "Edit User";

        // Fill form
        document.getElementById("userId").value = user.id;
        document.getElementById("name").value = user.name;
        document.getElementById("address").value = user.address;
        document.getElementById("mobile").value = user.mobile;

        // Show form
        document.getElementById("userFormContainer")
            .classList.remove("hidden");

    } catch (error) {

        console.error("Error getting user:", error);

        alert("Unable to load user");
    }
}


// ===============================
// Create / Update User
// ===============================

document.getElementById("userForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();

        const id = document.getElementById("userId").value;

        const user = {
            name: document.getElementById("name").value,
            address: document.getElementById("address").value,
            mobile: document.getElementById("mobile").value
        };

        try {

            let response;

            if (id) {

                // ===============================
                // UPDATE
                // ===============================

                response = await fetch(`${API_URL}/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });

            } else {

                // ===============================
                // CREATE
                // ===============================

                response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });
            }

            if (!response.ok) {
                throw new Error("Failed to save user");
            }

            const result = await response.json();

            console.log(result);

            alert(
                id
                    ? "User updated successfully"
                    : "User created successfully"
            );

            closeForm();

            // Refresh table
            loadUsers();

        } catch (error) {

            console.error("Error saving user:", error);

            alert("Unable to save user");
        }
    });


// ===============================
// Delete User
// ===============================

async function deleteUser(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
        return;
    }

    try {

        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete user");
        }

        const result = await response.json();

        console.log(result);

        alert("User deleted successfully");

        // Refresh table
        loadUsers();

    } catch (error) {

        console.error("Error deleting user:", error);

        alert("Unable to delete user");
    }
}


// ===============================
// Load users when page opens
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    loadUsers();
});