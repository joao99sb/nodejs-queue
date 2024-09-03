
let currentSocket = null;

function main() {
  const number = document.getElementById('number')

  if (currentSocket) {
    currentSocket.close();
  }
  currentSocket = io("localhost:3001");

  currentSocket.on("stream_data", (data) => {
    number.innerText = new TextDecoder().decode(data);

  });
  socketConnect()
}


main()