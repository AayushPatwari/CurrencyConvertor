import { useState } from "react";
import InputBox from "./Components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0); // STRING ✅
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (!currencyInfo[to] || !amount) return;
    setConvertedAmount(
      (Number(amount) * currencyInfo[to]).toFixed(2)
    );
  };

  const Background =
    "https://images.pexels.com/photos/2519830/pexels-photo-2519830.jpeg";

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          {/* FROM */}
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onAmountChange={setAmount}
            onCurrencyChange={setFrom}
            selectCurrency={from}
          />

          {/* SWAP */}
          <div className="relative w-full h-0.5 my-4">
            <button
              type="button"
              onClick={swap}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
            >
              Swap
            </button>
          </div>

          {/* TO */}
          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            onCurrencyChange={setTo}
            selectCurrency={to}
            amountDisable
          />

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white px-4 py-3 rounded-lg"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;