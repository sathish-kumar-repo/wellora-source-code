import { PrivateTabProvider } from "../context/PrivateTabContext";
import { ThemeProvider } from "../context/ThemeContext";
import AppRouter from "./AppRouter";

function App() {
  return (
    <ThemeProvider>
      <PrivateTabProvider>
        <AppRouter />
      </PrivateTabProvider>
    </ThemeProvider>
  );
}

export default App;