import './../Styles/Table.css'

export function Table({ items }) {
  return (
    <div className="table-div">
      <table className="item-table">
        <thead>
          <tr>
            {["Code", "Type", "Specs", "Category", "Quantity", "Location", "Settings"].map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(items && items.length > 0) ? (
            items.map(item => <TableRow key={item.id} item={item} />)
          ) : (
            <tr>
              <td colSpan="...">No items found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function TableRow({ item }) {
  const { code, type, specs, category, quantity, location, id } = item;

  function handleDelete(e) {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    fetch(`/api/${id}`, {
      method: 'DELETE',
    })
    .then(res => {
      if (!res.ok) throw new Error("Failed to delete");
      window.location.reload();
    })
    .catch(err => {
      console.error("Error deleting item:", err);
      alert("Failed to delete item.");
    });
  }

  return (
    <tr>
      <td>{code}</td>
      <td>{type}</td>
      <td>{specs}</td>
      <td>{category}</td>
      <td>{quantity}</td>
      <td>{location}</td>
      <td>
        <div className='settingsButtons'>
          <a href={`/edit/${id}`}>Edit</a>
          <a href="/" onClick={handleDelete}>Delete</a>
        </div>
      </td>
    </tr>
  );
}
export default Table;