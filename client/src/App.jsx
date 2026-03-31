import { Routes, Route, Link } from "react-router-dom";
import Assets from "./pages/Assets";

function Home() {
  return (
    <div>
      <h2>Welcome to SignalStack</h2>
      <p>
        SignalStack is a full-stack asset management application for tracking,
        organizing, and updating categorized assets.
      </p>

      <h3>Key Features</h3>
      <ul>
        <li>Create new assets</li>
        <li>Update existing assets</li>
        <li>Delete assets</li>
        <li>Store data in PostgreSQL for persistence</li>
      </ul>

      <h3>Potential Military Applications</h3>
      <ul>
        <li>Equipment tracking</li>
        <li>Mission asset readiness</li>
        <li>Drone fleet inventory</li>
        <li>Digital system management</li>
      </ul>

      <p>
        This project demonstrates a React frontend connected to an Express API
        with a PostgreSQL database using Knex.
      </p>

      <Link to="/assets">
        <button>Go to Assets</button>
      </Link>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>SignalStack</h1>

      <nav>
        <Link to="/">Home</Link> | <Link to="/assets">Assets</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assets" element={<Assets />} />
      </Routes>
    </div>
  );
}

export default App;
