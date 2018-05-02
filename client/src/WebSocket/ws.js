const socket = new WebSocket('ws://127.0.0.1:3001');

socket.onclose = () => {
  alert('Server is closed!');
};

socket.onerror = () => {
  alert('Error on server!');
};

export default socket;