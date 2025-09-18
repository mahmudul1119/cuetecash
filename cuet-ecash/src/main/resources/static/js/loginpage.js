const loginForm = document.getElementById('mainform');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const roleInputs = document.getElementsByName('role');

// ডাইনামিকভাবে মেসেজ বক্স বানানো
let messageBox = document.createElement('div');
messageBox.className = "mt-4 p-3 rounded-md text-white hidden";
document.querySelector('.container').appendChild(messageBox);

// ফর্ম সাবমিট ইভেন্ট
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    let selectedRole = '';
    for (const radio of roleInputs) {
        if (radio.checked) {
            selectedRole = radio.value;
            break;
        }
    }

    // --- Validation ---
    if (!email || !password || !selectedRole) {
        showMessage('Please fill in all fields.', 'bg-red-500');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email.', 'bg-red-500');
        return;
    }

    if (password.length < 6) {
        showMessage('Password must be at least 6 characters long.', 'bg-red-500');
        return;
    }

    // --- Redirect ---
    let redirectUrl = '';
    if (selectedRole === 'student') redirectUrl = 'studentdashboard.html';
    if (selectedRole === 'officer') redirectUrl = 'hallofficerdashboard.html';
    if (selectedRole === 'admin') redirectUrl = 'admindashboard.html';

    window.location.href = redirectUrl;
});

// মেসেজ দেখানোর ফাংশন
function showMessage(message, bgClass) {
    messageBox.textContent = message;
    messageBox.className = `mt-4 p-3 rounded-md text-white ${bgClass}`;
    messageBox.classList.remove('hidden');
}
