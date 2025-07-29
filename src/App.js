import './Styles/App.css';
import { useEffect, useState } from 'react';
import Table from './Components/Table.js';
import Sidebar from './Components/Sidebar.js';


export default function App() {

    const [items, setItems] = useState(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
    fetch('/api/')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setItems(data);
      });
  }, []);

   useEffect(() => {
    const controller = new AbortController();

    const fetchItems = async () => {
      try {
        const res = await fetch(`/api?search=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error('Fetch failed');

        const data = await res.json();
        setItems(data);
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err);
      }
    };

    const delay = setTimeout(() => {
      fetchItems();
    }, 300); // debounce

    return () => {
      clearTimeout(delay);
      controller.abort();
    };
  }, [query]);

  
  
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
          <input 
            type = "text" 
            placeholder = "search..." 
            className = "search-input" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* <button className='search-button'>search</button> */}
        </div>
      </div>
    <Table items = {items}></Table>
  </div>
  </div>
  )
  
}