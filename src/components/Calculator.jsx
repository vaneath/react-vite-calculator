import React, { useState } from "react";
import KeyButton from "./KeyButton";
import Display from "./Display";

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);

  const handleButtonClick = (value) => {
    if (value === "C") {
      setDisplay("");
      setOperator(null);
      setPreviousValue(null);
    } else if (value === "=") {
      if (operator && previousValue !== null) {
        // Perform the calculation
        const currentValue = parseFloat(display);
        const result = calculate(previousValue, currentValue, operator);
        setDisplay(String(result));
        setPreviousValue(result);
        setOperator(null);
      }
    } else if (["+", "-", "x", "÷", "%"].includes(value)) {
      setOperator(value);
      setPreviousValue(parseFloat(display));
      setDisplay("");
    } else if (value === "+/-") {
      setDisplay((prev) => String(parseFloat(prev) * -1));
    } else if (value === ".") {
      if (!display.includes(".")) {
        setDisplay((prev) => prev + ".");
      }
    } else if (value === "(" || value === ")") {
      setDisplay((prev) => prev + value);
    } else {
      setDisplay((prev) => prev + value);
    }
  };

  // Calculation logic
  const calculate = (prev, current, operator) => {
    switch (operator) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "x":
        return prev * current;
      case "÷":
        return prev / current;
      case "%":
        return prev % current;
      default:
        return current;
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <Display value={display || "0"} />
      <div className='grid grid-cols-4 gap-2'>
        {[
          "C",
          "(",
          ")",
          "%",
          "7",
          "8",
          "9",
          "÷",
          "4",
          "5",
          "6",
          "x",
          "1",
          "2",
          "3",
          "-",
          "+/-",
          "0",
          ".",
          "=",
        ].map((label) => (
          <KeyButton key={label} label={label} onClick={handleButtonClick} />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
