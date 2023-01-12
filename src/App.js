import './App.css';
import { useState } from "react";
import { toppings } from "./utils/toppings";
import  React from "react";

const getFormattedPrice = (price) => `($${price.toFixed(2)})`;

function App() {

  const [checkedState, setCheckedState] = useState(
    new Array(toppings.length).fill(false),
  );

  const [total, setTotal] = useState(0);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const totalToppingPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + toppings[index].price;
        }
        return sum;
      },
      0
    );
    setTotal(totalToppingPrice);
  };

  const [size, setSize] = useState(0)

  const onSizeChange = e => {
    setSize(e.target.value)
  };

  return (
    <div className="App">

      <h3>Size</h3>
      <div>
        <input
          type="radio"
          value="4.99"
          name="size"
          checked={size === 4.99}
          onChange={onSizeChange}
        /> Normal ($4.99)
      </div>
      <div>
        <input
          type="radio"
          value="7.99"
          name="size"
          checked={size === 7.99}
          onChange={onSizeChange}
        /> Family ($7.99)
      </div>
    
      <h3>Select Toppings</h3>
      <ul className="toppings-list">
        {toppings.map(({ name, price }, index) => {
          return (
            
            <li key={index}>
              <div className="toppings-list-item">
                <div className="left-section">

                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name} {getFormattedPrice(price)}</label>
                </div>
              </div>
            </li>
          );
          
        })}
        <nav>
        <li>
          <div className="toppings-list-item">
            
          <div className="left-section">Summary: </div>
              <p>
                {size == 4.99? <p>Normal pizza , toppings:</p>: <p>Family pizza, toppings:</p>} <p>

                {toppings.map(({ name }, index) => {
          return (
            
            <li key={index}>
              <div className="toppings-list-item">
                <div className="left-section">

                  <input
                    type="hidden"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <p> {checkedState[index] === true? <p>{name}</p>: null}</p>
                </div>
              </div>
            </li>
          );
          
        })}
                </p>
              </p>
            <div className="left-section">Total cost: {getFormattedPrice(Number(total) + Number(size))}</div>
          </div>
        </li>
        </nav>
      </ul>

    </div>

  );
}

export default App;
