document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("currentUser")) {
        showDashboard();
    } else {
        showLogin();
    }
});

function showLogin() {
    document.getElementById("auth").classList.remove("hidden");
    document.getElementById("register").classList.add("hidden");
    document.getElementById("dashboard").classList.add("hidden");
}

function showRegister() {
    document.getElementById("auth").classList.add("hidden");
    document.getElementById("register").classList.remove("hidden");
    document.getElementById("dashboard").classList.add("hidden");
}

function showDashboard() {
    document.getElementById("auth").classList.add("hidden");
    document.getElementById("register").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    const user = localStorage.getItem("currentUser");
    document.getElementById("userDisplay").innerText = user;
    updateBalance();
}

function register() {
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    if (username && password) {
        const users = JSON.parse(localStorage.getItem("users")) || {};
        if (users[username]) {
            alert("Username already exists");
        } else {
            users[username] = { password, balance: 0 };
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registration successful! Please login.");
            showLogin();
        }
    } else {
        alert("Please fill in both fields");
    }
}

function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username] && users[username].password === password) {
        localStorage.setItem("currentUser", username);
        showDashboard();
    } else {
        alert("Incorrect username or password");
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    showLogin();
}

function updateBalance() {
    const user = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users"));
    document.getElementById("balanceDisplay").innerText = users[user].balance;
}

function deposit() {
    const amount = parseFloat(document.getElementById("amount").value);
    if (amount && amount > 0) {
        const user = localStorage.getItem("currentUser");
        const users = JSON.parse(localStorage.getItem("users"));
        users[user].balance += amount;
        localStorage.setItem("users", JSON.stringify(users));
        updateBalance();
        alert(`Deposited ₹${amount}`);
    } else {
        alert("Please enter a valid amount");
    }
}

function withdraw() {
    const amount = parseFloat(document.getElementById("amount").value);
    if (amount && amount > 0) {
        const user = localStorage.getItem("currentUser");
        const users = JSON.parse(localStorage.getItem("users"));
        if (users[user].balance >= amount) {
            users[user].balance -= amount;
            localStorage.setItem("users", JSON.stringify(users));
            updateBalance();
            alert(`Withdrew ₹${amount}`);
        } else {
            alert("Insufficient balance");
        }
    } else {
        alert("Please enter a valid amount");
    }
}
