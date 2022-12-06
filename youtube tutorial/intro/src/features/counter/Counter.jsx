import { increment, decrement, reset, addAmount } from "./counterSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();

  const resetAll = () => {
    dispatch(reset());
    setAmount(0);
  };
  return (
    <section>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />{" "}
      <div>
        <button onClick={() => dispatch(addAmount(amount))}>Add Amount</button>
        <button onClick={resetAll}>reset All</button>
      </div>
    </section>
  );
};

export default Counter;
