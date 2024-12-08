let users = JSON.parse(localStorage.getItem('users')) || [];

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            sessionStorage.setItem('username', user.username);
            sessionStorage.setItem('fullName', user.fullName);

            window.location.href = '../html/index.html';
        } else {
            alert('Invalid username or password!');
        }
    });
}

// Handle Sign-Up Form Submission
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
            
            const newUser = { fullName, username, password };
            users.push(newUser);

            localStorage.setItem('users', JSON.stringify(users));

            alert('Sign-up successful! You can now log in.');

           
            window.location.href = '../html/sign-in.html';
        }
    });
}

// Update Sidebar with Logged-in User
const userNameElement = document.getElementById('userName');
if (userNameElement) {
    const loggedInUsername = sessionStorage.getItem('username') || "Guest";
    userNameElement.textContent = loggedInUsername;
}

// Handle Logout
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        // Clear sessionStorage for the logged-in user
        sessionStorage.clear();

        alert("You have been logged out.");
        
        window.location.href = '../html/sign-in.html';
    });
}
