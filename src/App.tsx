import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/molecules/Navbar";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-6">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
