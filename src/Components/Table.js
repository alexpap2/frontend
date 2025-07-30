import './../Styles/Table.css'
import TableItem from './TableItem.js';

export function Table({ items, handleUpdateItem, handleDeleteItem }) {
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
            items.map(item => <TableItem key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem} />)
          ) : (
            <tr>
              <td colSpan="7">No items found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}



export default Table;