import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>hello world</h1>
      <button onClick={() => setCount(count + 1)}>count + 1</button>
    </>
  );
}

export default App;
