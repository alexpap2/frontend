export default function AddNewItem({setMenuOpen, setMenuPos}) {    

    function handleClick(e) {
        const rect = e.target.getBoundingClientRect();
        console.log(rect);
        setMenuPos({ x: rect.left - 370, y: rect.top - 30})
        setMenuOpen(true);
    }

    return (
        <>
          <button onClick={handleClick}>Add New Item</button>
        </>
    )
}