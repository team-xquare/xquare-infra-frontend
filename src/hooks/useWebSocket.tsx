import { useEffect, useState, useRef } from 'react';

interface UseWebSocketProps {
  url: string;
}

export const useWebSocket = ({ url }: UseWebSocketProps) => {
  const [messages, setMessages] = useState<string[]>([]);
  const webSocket = useRef<WebSocket | null>(null);

  useEffect(() => {
    webSocket.current = new WebSocket(url);

    webSocket.current.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    return () => {
      webSocket.current?.close();
    };
  }, [url]);

  const sendMessage = (message: string) => {
    webSocket.current?.send(message);
  };

  return { messages, sendMessage };
};
