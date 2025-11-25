// --- Simple localStorage authentication ---

// Create account
document.getElementById('createBtn')?.addEventListener('click', () => {
const email = document.getElementById('newEmail').value;
const password = document.getElementById('newPassword').value;
if (!email || !password) return alert("Please fill in all fields.");

// Save account in localStorage
localStorage.setItem('gmailEmail', email);
localStorage.setItem('gmailPassword', password);

alert("Account created!");
window.location.href = "index.html";
});

// Login
document.getElementById('loginBtn')?.addEventListener('click', () => {
const email = document.getElementById('loginEmail').value;
const password = document.getElementById('loginPassword').value;

if (
email === localStorage.getItem('gmailEmail') &&
password === localStorage.getItem('gmailPassword')
) {
