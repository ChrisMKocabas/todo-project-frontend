import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./pages/Footer";
import Navigation from "./pages/Navigation";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Todos from "./Todos";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";

const App = () => {
  return (
    <div className="app-container">
      <AuthContextProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route element={<ProtectedRoute />}>
            <Route path="todos" element={<Todos />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="Register" element={<Register />} />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </div>
  );
};

export default App;
