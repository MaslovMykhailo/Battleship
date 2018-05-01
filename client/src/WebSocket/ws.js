const socket = new WebSocket('ws://127.0.0.1:3001');

socket.onopen = () => {
  console.log('connected');
};

socket.onclose = () => {
  console.log('closed');
};

export default socket;