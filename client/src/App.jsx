import { useEffect, useState } from "react";

function App() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/assets")
      .then((res) => res.json())
      .then((data) => setAssets(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>SignalStack</h1>
      <h2>Assets</h2>

      {assets.map((asset) => (
        <div key={asset.id}>
          <p>
            {asset.name} ({asset.symbol})
          </p>
          <p>{asset.category}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
