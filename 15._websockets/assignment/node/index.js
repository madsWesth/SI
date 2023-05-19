const socket = new WebSocket("ws://localhost:8080");

const chatList = document.getElementById("chat-list");
const msgInput = document.getElementById("msg-input");
const sendMsgBtn = document.getElementById("send-msg-btn");

sendMsgBtn.onclick = (e) => {
  console.log(msgInput.value);
  socket.send(JSON.stringify({ type: "msg-send", msg: msgInput.value }));
  msgInput.value = "";
};

socket.onopen = () => {
  console.log("Connected to server");

  socket.onmessage = (data) => {
    console.log(data.data);

    const parsedData = JSON.parse(data.data);

    if (parsedData.type === "msg-recieve") {
      const chatListItem = document.createElement("li");
      chatListItem.innerText = parsedData.msg;

      chatList.appendChild(chatListItem);
    }
  };
};
