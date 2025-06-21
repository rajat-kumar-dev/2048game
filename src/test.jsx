import React, { useEffect, useState } from 'react';
function App() {
  const [cardNums, setCardNums] = useState([1, 1, 2, 2, 3, 3]);
  const [isClickedValue, setIsClickedValue] = useState([]);
  const [matchedPair, setMatchedPair] = useState([]);
  const [isShowValue, setIsShowValue] = useState(false);

  // useEffect(() => {
  //   const arr = [];
  //   let num = [1, 1, 2, 2, 3, 3];
  //   for (let i = 0; i < 2; i++) {
  //     const row = [];
  //     for (let j = 0; j < 3; j++) {
  //       let randomPos = Math.floor(Math.random() * num.length); // Random position
  //       row.push(num[randomPos]); // Add the number to the row
  //       num.splice(randomPos, 1); // Remove the used number
  //     }
  //     arr.push(row);
  //     setCardNums(arr);
  //   }
  //   setTimeout(() => {
  //     setIsShowValue(false);
  //   }, 3000);
  // }, []);

  function cardClickHandler(value) {
    setIsClickedValue((pre) => [...pre, value]);
  }
  console.log(isClickedValue);
  return (
    <>
      <div className="text-center mb-2">
        <h1 className="text-2xl text-red-300">Memory Game</h1>
      </div>
      <div className="border border-black p-4 w-1/3 mx-auto  flex justify-between">
        {cardNums.map((num, index) => (
          <div className="border p-5" onClick={() => cardClickHandler(num)}></div>
        ))}
      </div>
    </>
  );
}

export default App;
