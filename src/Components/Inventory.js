import './../Styles/App.css';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Table from './Table.js';
import Sidebar from './Sidebar.js';
import AddNewItem from './AddNewItem';
import Form from './Form';


export default function Inventory() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
    const [items, setItems] = useState(null);
    const [query, setQuery] = useState('');

  async function fetchItems() {
    try {
      const res = await fetch(`/api?search=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

   useEffect(() => {
  const controller = new AbortController();

  const delay = setTimeout(() => {
    fetchItems();
  }, 300);

  return () => {
    clearTimeout(delay);
    controller.abort();
  };
  }, [query]);


  function handleUpdateItem(updatedItem) {
  setItems(prevItems =>
    prevItems.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    )
  );
}
function handleDeleteItem(deletedItem) {
    setItems(prevItems => {
      const newItems = prevItems.filter((item) => item.id !== deletedItem.id)
      setItems(newItems)
    });
  }
  
  return (
  <div className = "layout">
    <Sidebar />
    <div className='inventory-container'>
      <div className='inventory-header'>
        <div>
          <h2>Inventory</h2>
          <p className='subtitle'>Manage your Items</p>
        </div>
        <div className = "inventory-controls">
          <AddNewItem setMenuOpen={setMenuOpen} setMenuPos={setMenuPos}/>
          {menuOpen && createPortal(
          <div style={{ position: 'fixed', top: menuPos.y, left: menuPos.x }}>
      <Form setMenuOpen={setMenuOpen} fetchItems={fetchItems}/>
    </div>, document.body
        )}
          <input 
            type = "text" 
            placeholder = "search..." 
            className = "search-input" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
    <Table 
      items = {items} 
      setItems={setItems} 
      handleUpdateItem={handleUpdateItem} 
      handleDeleteItem={handleDeleteItem} 
    />
  </div>
  </div>
  )
  
}