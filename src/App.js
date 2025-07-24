import { useState } from "react";

function MyButton() {
  
  function handleClick() {
    setCount(count + 1);
  }
  return(
    <button onClick = {handleClick}>
      clicked {count} times
    </button>
  )
}

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>welcome to my test! <br/>
        <MyButton />
      </h1>
    </div>
  )
}