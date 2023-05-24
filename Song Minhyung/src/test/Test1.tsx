import { useState } from "react";

interface Test1Props {
  
}

const Test1 = ({
  
}: Test1Props) => {
  const [count, setCount] = useState(0);
  return (
    <>
      <button 
        data-testid="plusButton"
        onClick={() => setCount(prev => prev+1)}
      >
        click
      </button>
      {count}
    </>
  );
}

export default Test1;