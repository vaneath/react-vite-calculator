import React, { useState, useEffect } from "react";
import KeyButton from "./KeyButton";
import Display from "./Display";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  // Load history from localStorage when the component mounts
  useEffect(() => {
    const storedHistory = localStorage.getItem("calcHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Save history to localStorage whenever it updates
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("calcHistory", JSON.stringify(history));
    }
  }, [history]);

  const handleButtonClick = (label) => {
    if (label === "=") {
      try {
        const evalResult = eval(input.replace("÷", "/").replace("x", "*"));
        setResult(evalResult);
        const newHistoryEntry = `${input} = ${evalResult}`;
        setHistory([...history, newHistoryEntry]);
        setInput(evalResult.toString());
      } catch (error) {
        setResult("Error");
      }
    } else if (label === "C") {
      setInput("");
      setResult("");
    } else {
      setInput(input + label);
    }
  };

  return (
    <div className='p-4 rounded shadow-md w-full max-w-md'>
      <Display value={input || result || "0"} />
      <div className='grid grid-cols-4 gap-2 mt-4'>
        {[
          "C",
          "(",
          ")",
          "÷",
          "7",
          "8",
          "9",
          "x",
          "4",
          "5",
          "6",
          "-",
          "1",
          "2",
          "3",
          "+",
          "+/-",
          "0",
          ".",
          "=",
        ].map((label) => (
          <KeyButton
            key={label}
            label={label}
            onClick={() => handleButtonClick(label)}
          />
        ))}
      </div>
      <div className='mt-4 w-full max-w-md'>
        <h2 className='text-xl font-bold mb-2'>History</h2>
        <ul className='p-4 rounded shadow-md'>
          {history.map((entry, index) => (
            <li key={index} className='border-b last:border-none py-2'>
              {entry}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calculator;
