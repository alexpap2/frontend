import { useState } from "react";

export default function TableItem({ item , onUpdateItem }) {
  const { code, type, specs, category, quantity, location, id } = item;
  const [isEditing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    code,
    type,
    specs,
    category,
    quantity,
    location,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    console.log(e.target);
    setFormData(prev => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) : value,
    }));
  }

  function handleSave() {
    fetch(`/api/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to update");
        return res.json(); // assume backend returns updated item
    })
      .then(updatedItem => {
        onUpdateItem(updatedItem);  // notify parent of the change
        setEditing(false);
    })
      .catch(err => {
        console.error("Error saving:", err);
        alert("Failed to save changes.");
      });
  }

  function handleDelete(e) {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    fetch(`/api/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to delete");
        window.location.reload(); // replace later
      })
      .catch(err => {
        console.error("Error deleting item:", err);
        alert("Failed to delete item.");
      });
  }

  const editingTemplate = (
    <tr>
      <td><input name="code" value={formData.code} onChange={handleChange} required /></td>
      <td><input name="type" value={formData.type} onChange={handleChange} required /></td>
      <td><input name="specs" value={formData.specs} onChange={handleChange} /></td>
      <td><input name="category" value={formData.category} onChange={handleChange} required /></td>
      <td><input name="quantity" type="number" value={formData.quantity} onChange={handleChange} required /></td>
      <td><input name="location" value={formData.location} onChange={handleChange} /></td>
      <td>
        <div className="settingsButtons">
          <button onClick={() => setEditing(false)}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </td>
    </tr>
  );

  const viewTemplate = (
    <tr>
      <td>{code}</td>
      <td>{type}</td>
      <td>{specs}</td>
      <td>{category}</td>
      <td>{quantity}</td>
      <td>{location}</td>
      <td>
        <div className="settingsButtons">
          <button onClick={() => setEditing(true)}>Edit</button>
          <button href="/" onClick={handleDelete}>Delete</button>
        </div>
      </td>
    </tr>
  );

  return isEditing ? editingTemplate : viewTemplate;
}
