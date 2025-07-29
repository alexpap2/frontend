import './../Styles/Sidebar.css';
import { useNavigate } from 'react-router-dom';
import logo from './edp_logo.png';

function Sidebar() {
  return (
    <aside className="sidebar">
        <div className="sidebar-header">
          <div className="app-name">
            <img src={logo} className='logo'/>
            <p className = 'sidebar-subtitle'>Inventory System</p>
          </div>
        </div>
        <div className='addButtonPos'>
          <NewButton className = 'addButton'/>
        </div>
    
        <nav className="nav-links">
          <a href="/search" className="nav-link active">Detailed Search</a>
          <a href="/">Inventory</a>
        </nav>
    </aside>
    )

    function NewButton() {
        const navigate = useNavigate();

        const buttonHandler = () => {
        navigate("/add");
        }    
        return <button onClick = {buttonHandler}>Add New Item</button>
    }
}
export default Sidebar;