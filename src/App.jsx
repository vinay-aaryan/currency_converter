import { InputBox } from "./components"
import useCurrencyInfo from "./assets/hooks/useCurrencyInfo"
import { useState } from "react"

function App() {
  const [amount, setAmount] = useState(0)

  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('INR')
  const [convertedAmt, setConvertedAmt] = useState(0)

const currencyInfo = useCurrencyInfo(from)

  // Optional: Show a loading spinner or message while fetching
  if (!currencyInfo || Object.keys(currencyInfo).length === 0) {
    return <p>Loading currency data...</p>;
  }

  const options = Object.keys(currencyInfo);

const swap = () =>{
  setFrom(to)
  setTo(from)
  setConvertedAmt(amount)
  setAmount(convertedAmt)
}

const convert = () => {
  if (currencyInfo[to]) {
    setConvertedAmt(amount * currencyInfo[to].value);
  }
};


return (
  <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
          backgroundImage: `url('https://images.pexels.com/photos/259100/pexels-photo-259100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
  >
      <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
              <form
                  onSubmit={(e) => {
                      e.preventDefault();
                      convert()
                     
                  }}
              >
                  <div className="w-full mb-1">
                      <InputBox
                          label="From"
                          amount={amount}
                          currencyOptions={options}
                          onCurrencyChange={(currency) => setAmount(amount)}
                          selectCurrency={from}
                          onAmountChange={(amount) => setAmount(amount)}

                          
                      />
                  </div>
                  <div className="relative w-full h-0.5">
                      <button
                          type="button"
                          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                          onClick={swap} 
                      >
                          swap
                      </button>
                  </div>
                  <div className="w-full mt-1 mb-4">
                      <InputBox
                          label="To"
                          amount={convertedAmt}
                          currencyOptions={options}
                          onCurrencyChange={(currency) => setTo(currency)}
                          selectCurrency={from}
                          amountDisable
                      />
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                      Convert {from.toUpperCase()} to {to.toUpperCase()}
                  </button>
              </form>
          </div>
      </div>
  </div>
)
}

export default App
