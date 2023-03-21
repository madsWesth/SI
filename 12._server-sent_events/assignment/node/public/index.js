const eventSource = new EventSource("/subscribeChat");

const chatbox = document.getElementById("chatbox");
const chatInput = document.getElementById("chat-msg-input");

const sendBtn = document.getElementById("chat-send-btn");
sendBtn.onclick = (e) => {
  const data = { chatMsg: chatInput.value };

  fetch("/msg", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

eventSource.onopen = (event) => {
  console.log("connected");
};

eventSource.onmessage = (event) => {
  const chatMsgItem = document.createElement("p");
  chatMsgItem.innerText = event.data;
  chatbox.appendChild(chatMsgItem);

  if (eventSource.readyState === EventSource.CLOSED) {
    console.log("closed");
  } else if (eventSource.readyState === EventSource.CONNECTING) {
    console.log("connecting");
  }
};
