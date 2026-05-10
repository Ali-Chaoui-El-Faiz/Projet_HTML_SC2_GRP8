const chatToggle = document.getElementById("chat-toggle");
const chatPopup = document.getElementById("chatPopup");
const chatClose = document.getElementById("chatClose");
const input = document.getElementById("chatInput");
const button = document.getElementById("chatSend");
const chatWindow = document.querySelector(".chat-window");

const messagesContainer = document.createElement("div");
messagesContainer.classList.add("messages");
chatWindow.prepend(messagesContainer);

let intents = [];
fetch("../json/intents.json")
    .then(res => res.json())
    .then(data => intents = data);

// Afficher / masquer le chatbot
if (chatToggle) {
    chatToggle.addEventListener("click", () => {
        chatPopup.classList.add("show");
    });
}

if (chatClose) {
    chatClose.addEventListener("click", () => {
        chatPopup.classList.remove("show");
    });
}

button.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const text = input.value.trim();
    if (text === "") return;

    addMessage(text, "user");
    input.value = "";

    const response = getResponse(text.toLowerCase());
    setTimeout(() => addMessage(response, "bot"), 500);
}

function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.classList.add("message", type);
    msg.textContent = text;
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getResponse(text) {
    for (let intent of intents) {
        for (let pattern of intent.patterns) {
            if (text.includes(pattern)) {
                return random(intent.responses);
            }
        }
    }
    return "Je ne comprends pas, peux-tu reformuler ?";
}

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}