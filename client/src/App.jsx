import { Routes, Route, Link } from "react-router-dom";
import Assets from "./pages/Assets";

function App() {
  return (
    <div>
      <h1>SignalStack</h1>

      <nav>
        <Link to="/">Home</Link> | <Link to="/assets">Assets</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h2>Welcome to SignalStack</h2>} />
        <Route path="/assets" element={<Assets />} />
      </Routes>
    </div>
  );
}

export default App;
