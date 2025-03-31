import './App.css'
import Route from './routes'
import io from "socket.io-client";
import { ThemeProvider } from './components/Global/theme-provider';
import { api } from './config';

const socket = io(`${api.SOCKET_URL}`);

function App() {
  socket.on("connect", () => {
    console.log("Connected to server");
  });

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Route />
      </ThemeProvider>
  )
}

export default App
