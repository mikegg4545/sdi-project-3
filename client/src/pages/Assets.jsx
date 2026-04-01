import { useEffect, useState } from "react";

function Assets() {
  const [assets, setAssets] = useState([]);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [editingId, setEditingId] = useState(null);

  // fetch assets
  useEffect(() => {
    fetchAssets();

    fetch("http://localhost:3001/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  const fetchAssets = () => {
    fetch("http://localhost:3001/assets")
      .then((res) => res.json())
      .then((data) => setAssets(data))
      .catch((err) => console.error(err));
  };

  // create/update dependent on editing state
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !symbol || !categoryId) return;

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:3001/assets/${editingId}`
      : "http://localhost:3001/assets";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, symbol, category_id: Number(categoryId) }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.error || "Request failed");
          });
        }
        return res.json();
      })

      .then(() => {
        fetchAssets();
        setName("");
        setSymbol("");
        setCategoryId("");
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
        fetchAssets();
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

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

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
              setCategoryId("");
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
                setCategoryId(String(asset.category_id));
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
