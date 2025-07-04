import { createRoot } from "react-dom/client";
import "./Backend/style/index.css";
import "./Backend/i18n"; // Load i18n before rendering app
import "bootstrap/dist/css/bootstrap-grid.min.css";
import App from "./Backend/App/App";

createRoot(document.getElementById("root")!).render(<App />);
