import { useEffect, useState } from "react";

function Assets() {
  const [assets, setAssets] = useState([]);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);

  // fetch assets
  useEffect(() => {
    fetch("http://localhost:3001/assets")
      .then((res) => res.json())
      .then((data) => setAssets(data))
      .catch((err) => console.error(err));
  }, []);

  // create/update dependent on editing state
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !symbol || !category) return;

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:3001/assets/${editingId}`
      : "http://localhost:3001/assets";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, symbol, category }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editingId) {
          // update existing
          setAssets((prev) =>
            prev.map((asset) =>
              asset.id === Number(editingId) ? data : asset,
            ),
          );
        } else {
          // add new
          setAssets((prev) => [...prev, data]);
        }
        setName("");
        setSymbol("");
        setCategory("");
        setEditingId(null);
      })
      .catch((err) => console.error(err));
  };

  // delete asset from db/update UI
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
      <h2>
        {editingId
          ? `Editing: ${assets.find((a) => a.id === editingId)?.name || "Loading..."}`
          : "Assets"}
      </h2>

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

        <button type="submit">
          {editingId ? "Update Asset" : "Add Asset"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setName("");
              setSymbol("");
              setCategory("");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* sort assets alphabetically before render  */}
      {assets
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((asset) => (
          <div key={asset.id}>
            <p>
              {asset.name} ({asset.symbol})
            </p>
            <p>{asset.category}</p>
            <button onClick={() => handleDelete(asset.id)}>Delete</button>
            <button
              onClick={() => {
                setEditingId(asset.id);
                setName(asset.name);
                setSymbol(asset.symbol);
                setCategory(asset.category);
              }}
            >
              Edit
            </button>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default Assets;
