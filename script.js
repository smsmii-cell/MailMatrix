// Handle login button on index.html
document.getElementById('loginBtn')?.addEventListener('click', () => {
window.location.href = 'inbox.html';
});

// Handle sending emails on inbox.html
document.getElementById('sendBtn')?.addEventListener('click', () => {
const textarea = document.getElementById('compose');
const emailsDiv = document.getElementById('emails');

if (textarea.value.trim() === '') return;

// Display user's message
const userMsg = document.createElement('div');
userMsg.textContent = "You: " + textarea.value;
emailsDiv.appendChild(userMsg);

// AI reply (simple for now)
const aiReply = document.createElement('div');
aiReply.textContent = "AI: Thanks for your message!";
emailsDiv.appendChild(aiReply);

// Clear the textarea
textarea.value = '';
});
