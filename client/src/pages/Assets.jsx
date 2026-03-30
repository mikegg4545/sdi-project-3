import { useEffect, useState } from "react";

function Assets() {
  const [assets, setAssets] = useState([]);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/assets")
      .then((res) => res.json())
      .then((data) => setAssets(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/assets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, symbol, category }),
    })
      .then((res) => res.json())
      .then((newAsset) => {
        setAssets((prev) => [...prev, newAsset]);
        setName("");
        setSymbol("");
        setCategory("");
      })
      .catch((err) => console.error(err));
  };
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/assets/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setAssets((prev) => prev.filter((asset) => asset.id !== id));
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <h2>Assets</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">Add Asset</button>
      </form>

      {assets.map((asset) => (
        <div key={asset.id}>
          <p>
            {asset.name} ({asset.symbol})
          </p>
          <p>{asset.category}</p>
          <button onClick={() => handleDelete(asset.id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Assets;
