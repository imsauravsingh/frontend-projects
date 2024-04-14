import { useState } from "react";
import "./App.css";

const Cell = ({ filled, onClick, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={filled ? "cell cell-activated" : "cell"}
      disabled={disabled}
    />
  );
};

function App() {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  console.log({ order });
  const deactiavteCells = () => {
    setIsDeactivating(true);
    const timer = setInterval(() => {
      setOrder((origOrder) => {
        const newOrder = origOrder.slice();
        newOrder.pop();

        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }
        return newOrder;
      });
    }, 1000);
  };

  const activateCells = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);

    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      console.log("all the cell has been selected");
      deactiavteCells();
    }
  };

  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${config[0].length}, 1fr)`,
        }}
      >
        {config.flat(1).map((value, index) => {
          return value ? (
            <Cell
              key={index}
              filled={order.includes(index)}
              onClick={() => activateCells(index)}
              disabled={order.includes(index) || isDeactivating}
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
