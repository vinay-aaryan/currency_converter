import { useEffect, useState } from "react";

function useCurrencyInfo(baseCurrency) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(
      `https://api.currencyapi.com/v3/latest?apikey=cur_live_ASeBVC2MztJmlWQJ7Ev4gGCDMNilO7KA50ANA2nK&base_currency=${baseCurrency}`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch currency data:", err);
      });
  }, [baseCurrency]);

  return data;
}

export default useCurrencyInfo;
