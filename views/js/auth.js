let admins = [
    { username: 'admin1', password: 'adminpassword1', role: 'admin' },
    { username: 'admin2', password: 'adminpassword2', role: 'admin' },
    { username: 'admin3', password: 'adminpassword3', role: 'admin' }
];

let users = JSON.parse(localStorage.getItem('users')) || [];

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const admin = admins.find(a => a.username === username && a.password === password);
        if (admin) {
            sessionStorage.setItem('username', admin.username);
            sessionStorage.setItem('role', admin.role);
            window.location.href = '../html/index.html';
        } else {
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                sessionStorage.setItem('username', user.username);
                sessionStorage.setItem('role', user.role);
                window.location.href = '../html/index.html';
            } else {
                alert('Invalid username or password!');
            }
        }
    });
}

const signUpForm = document.getElementById('sign-up-form');
if (signUpForm) {
    signUpForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const fullName = document.getElementById('full_name').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const userExists = users.some(user => user.username === username);

        if (userExists) {
            alert('Username already taken. Please choose another one.');
        } else {
            const newUser = { fullName, username, password, role: 'user' };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Sign-up successful! You can now log in.');
            window.location.href = '../html/sign-in.html';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const userNameElement = document.getElementById('userName');
    const villageMgtMenuItem = document.querySelector('[data-section="village-mgt"]');
    const loggedInUsername = sessionStorage.getItem('username') || "Guest";
    const role = sessionStorage.getItem('role');

    if (userNameElement) userNameElement.textContent = loggedInUsername;

    if (role === 'user' && villageMgtMenuItem) {
        villageMgtMenuItem.style.display = 'none';
    }
});

const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        sessionStorage.clear();
        alert('You have been logged out.');
        window.location.href = '../html/sign-in.html';
    });
}
