import { WebSocketServer } from "ws";

const wsServer = new WebSocketServer({ port: 8080 });

wsServer.on("connection", (ws) => {
  console.log("New connection", wsServer.clients.size);

  ws.on("message", (data) => {
    ws.on("error", console.error);

    const parsedData = JSON.parse(data);

    console.log(parsedData);

    if (parsedData.type === "msg-send" && parsedData.msg) {
      wsServer.clients.forEach((client) => {
        client.send(
          JSON.stringify({ type: "msg-recieve", msg: parsedData.msg })
        );
      });
    }
  });
});
