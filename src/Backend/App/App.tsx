import { PrivateTabProvider } from "../context/PrivateTabContext";
import AppRouter from "./AppRouter";

function App() {
  return (
    <PrivateTabProvider>
      <AppRouter />
    </PrivateTabProvider>
  );
}

export default App;
