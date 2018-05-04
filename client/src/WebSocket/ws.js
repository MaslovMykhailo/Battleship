const socket = new WebSocket('ws://127.0.0.1:8080');

socket.onclose = () => {
  setTimeout(() => { alert('Server is not available!\nPlease try later :(') }, 1000);
};

export default socket;