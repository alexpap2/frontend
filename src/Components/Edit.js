import './../Styles/Form.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Edit() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  function editItem(formdata) {
    const data = Object.fromEntries(formdata.entries());
    fetch(`/api/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          alert('Failed to update Item!');
          throw new Error('Failed to update item');
        }
        navigate('/');
        return response.json();
      })
      .then(result => {
        console.log('Item updated successfully:', result);
      })
      .catch(error => {
        console.error('Error updating item:', error);
      });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!item) return <p>No item found.</p>;

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      editItem(new FormData(e.target));
    }}>
      <h1>Item Form</h1>

      <label htmlFor="code">Code</label>
      <input name="code" placeholder="enter a code..." defaultValue={item.code} required />

      <label htmlFor="type">Type</label>
      <input name="type" placeholder="enter a type..." defaultValue={item.type} required />

      <label htmlFor="specs">Specifications:</label>
      <input name="specs" placeholder="enter some specs..." defaultValue={item.specs} />

      <label htmlFor="category">Category</label>
      <input name="category" placeholder="enter a category..." defaultValue={item.category} required />

      <label htmlFor="quantity">Stock</label>
      <input name="quantity" type="number" id="quantity" defaultValue={item.quantity} required />

      <label htmlFor="location">Location</label>
      <input name="location" placeholder="where u got it??" defaultValue={item.location} />

      <div className="footer">
        <button className="submitButton" type="submit">Update Item</button>
        <a className="nav" href="/">Return to Inventory</a>
      </div>
    </form>
  );
}
