class ChatClient {
    observers = [];
    connected = false;
  
    constructor() {

      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  
      this.socket.onmessage = async (event) => {
        try {
          const text = await event.data.text();
          const chat = JSON.parse(text);
          this.notifyObservers('received', chat.name, chat.message);
        } catch (error) {
          console.error('Error processing message:', error);
        }
      };
  

      this.socket.onclose = (event) => {
        this.notifyObservers('system', 'System', 'Disconnected from chat');
        this.connected = false;
      };
      

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.notifyObservers('system', 'System', 'Connection error');
      };
    }
  

    sendMessage(name, message) {
      if (this.connected && name && message) {
        this.notifyObservers('sent', name, message);
        this.socket.send(JSON.stringify({ name, message }));
      }
    }
  
    addObserver(observer) {
      this.observers.push(observer);
    }
  
    notifyObservers(event, from, message) {
      this.observers.forEach((observer) => observer({ event, from, message }));
    }
  }
  
  export default ChatClient;