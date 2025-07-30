import './../Styles/Form.css';
import { useNavigate } from 'react-router-dom';

export default function Form() {
    const navigate = useNavigate();

    function addItem(formdata) {
        //creates an object from the form data
        const data = Object.fromEntries(formdata.entries());
        //sends to backend through fetch request
        fetch('/api/addItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            alert('Failed to add Item!');
            throw new Error('Failed to add item');
        }    
        //return response.json();
    })
    .then(result => {
        console.log('Item added successfully:', result);
        navigate("/");

    })
    .catch(error => {
        console.error('Error adding item:', error);
    });
}

    return (
        <>
        <form action = {addItem} className='formStyle'>
            <h1>Item Form</h1>
            <label htmlFor = "code" className='name'>Code</label>
            <input name = "code" className='inputField'
            placeholder = "enter a code..." required />
            <label htmlFor = "type" className='name'>Type</label>
            <input name = "type" className='inputField'
            placeholder="enter a type..." required />
            <label name = "specs" className='name'>Specifications:</label>
            <input name = "specs" className='inputField'
            placeholder="enter some specs..." />
            <label htmlFor = "category" className='name'>Category</label>
            <input name = "category" className='inputField'
            placeholder="enter a category..." required />
            <label htmlFor = "quantity" className='name'>Stock</label>
            <input name = "quantity" type = "number" id = "quantity" className='inputField'
            required />
            <label htmlFor = "location" className='name'>Location</label>
            <input name = "location" className='inputField'
            placeholder="where u got it??" />


            <div className='footer' >
            <button className = 'submitButton' type = "submit">Create Item</button>
            <a className = 'nav' href='/'>Return to Inventory</a>
            </div>
        </form>
        </>
    )
}