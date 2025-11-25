// --- Infinite Sarah Welch Chat System ---

// Load saved messages or initialize
let messages = JSON.parse(localStorage.getItem("messages") || "[]");
const MAX_MEMORY = 50;

// Photo placeholders
const attachments = {
sarah: "https://via.placeholder.com/80?text=Sarah",
chris: "https://via.placeholder.com/80?text=Chris",
dog: "https://via.placeholder.com/80?text=Luna"
};

// Lore/context triggers
const triggers = [
{ keyword: "chris", reply: "Chris has been acting weird again. I don’t know what to do…", photo: attachments.chris },
{ keyword: "dog", reply: "Luna was barking at the hallway again! I swear she saw something.", photo: attachments.dog },
{ keyword: "photo", reply: "Here’s a picture of me with Luna and Chris!", photo: attachments.sarah },
{ keyword: "noise", reply: "The noises in the walls came back tonight… it was terrifying.", photo: null }
];

// Base responses (professional-but-sweet + playful)
const baseReplies = [
"I don’t know how to say this… I feel uneasy tonight.",
"Sorry if I’m rambling. I just need someone to talk to.",
"Things feel… off. Do you ever feel like that?",
"I can’t stop thinking about last night. It was… strange.",
"I’m trying to stay calm, but it’s hard.",
"Sometimes Chris knows something I don’t…",
"Luna won’t stop barking at nothing, it’s creepy."
];

// --- Generate Sarah reply ---
function generateReply(userMsg) {
// Save user message
messages.push({ sender: "You", text: userMsg, photo: null });
if (messages.length > MAX_MEMORY) messages.shift();

// Check triggers
for (let t of triggers) {
if (userMsg.toLowerCase().includes(t.keyword)) {
return { text: t.reply, photo: t.photo };
}
}

// Chaotic/playful mode (~10% chance)
if (Math.random() < 0.1) {
return { text: "LOL I literally just tripped over nothing 😂 anyway, what were you saying?", photo: null };
}

// Horror/lore escalation if memory is long
if (messages.length > 10 && Math.random() < 0.3) {
return { text: "The shadows in my room… I think I saw something move just now. I’m scared.", photo: null };
}

// Random base reply
return { text: baseReplies[Math.floor(Math.random() * baseReplies.length)], photo: null };
}

// --- Display message in panel ---
function displayMessage(sender, text, photo) {
const emailsDiv = document.getElementById("emails");
const div = document.createElement("div");
div.classList.add("email");
let photoHTML = photo ? `<img src="${photo}" style="width:80px;height:80px;float:right;margin-left:10px;">` : "";
div.innerHTML = `<strong>${sender}:</strong> <p>${text}</p>${photoHTML}`;
emailsDiv.appendChild(div);
emailsDiv.scrollTop = emailsDiv.scrollHeight;
}

// --- Load all messages ---
function loadMessages() {
const emailsDiv = document.getElementById("emails");
const listDiv = document.getElementById("message-list");
emailsDiv.innerHTML = "";
listDiv.innerHTML = "";

messages.forEach((msg, index) => {
// Sidebar list
const li = document.createElement("div");
li.textContent = msg.sender + ": " + (msg.text.substring(0, 30) + "...");
li.onclick = () => {
emailsDiv.innerHTML = "";
displayMessage(msg.sender, msg.text, msg.photo);
};
listDiv.appendChild(li);

// Show in panel by default
displayMessage(msg.sender, msg.text, msg.photo);
});
}

// --- Compose/send functionality ---
document.getElementById("sendBtn")?.addEventListener("click", () => {
const compose = document.getElementById("compose");
const userMsg = compose.value.trim();
if (!userMsg) return;
compose.value = "";

// Show user message
displayMessage("You", userMsg, null);
messages.push({ sender: "You", text: userMsg, photo: null });

if (messages.length > MAX_MEMORY) messages.shift();
localStorage.setItem("messages", JSON.stringify(messages));

// Sarah replies after 1.2s
setTimeout(() => {
const reply = generateReply(userMsg);
displayMessage("Sarah Welch", reply.text, reply.photo);
messages.push({ sender: "Sarah Welch", text: reply.text, photo: reply.photo });
if (messages.length > MAX_MEMORY) messages.shift();
localStorage.setItem("messages", JSON.stringify(messages));
}, 1200);
});

// --- Auto-reply loop (infinite) ---
setInterval(() => {
// Random chance for Sarah to send a new message if user is idle
if (Math.random() < 0.02) {
const autoReply = generateReply("...");
displayMessage("Sarah Welch", autoReply.text, autoReply.photo);
messages.push({ sender: "Sarah Welch", text: autoReply.text, photo: autoReply.photo });
if (messages.length > MAX_MEMORY) messages.shift();
localStorage.setItem("messages", JSON.stringify(messages));
}
}, 15000);

loadMessages();
