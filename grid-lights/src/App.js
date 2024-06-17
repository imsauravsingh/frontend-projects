import { useState } from "react";
import "./App.css";

const Cell = ({ filled, onClick, isDisabled }) => {
  return (
    <button
      type="button"
      className={filled ? "cell cell-activated" : "cell"}
      onClick={onClick}
      disabled={isDisabled}
    />
  );
};
function App() {
  const [order, setOrder] = useState([]);
  const [isRunning, setRunning] = useState(false);
  const config = [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ];

  const handleDeactivate = () => {
    setRunning(true);
    let timer = setInterval(() => {
      setOrder((origOrder) => {
        const newOrder = origOrder.slice();

        newOrder.pop();

        if (newOrder.length === 0) {
          clearInterval(timer);
          setRunning(false);
        }

        return newOrder;
      });
    }, 1000);
  };

  const handleActivate = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);
    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      handleDeactivate();
    }
  };

  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${config[0].length}, 1fr)` }}
      >
        {config.flat(1).map((val, index) => {
          return val ? (
            <Cell
              key={index}
              filled={order.includes(index)}
              onClick={() => handleActivate(index)}
              isDisabled={order.includes(index) || isRunning}
            />
          ) : (
            <span />
          );
        })}
      </div>
    </div>
  );
}

export default App;
