import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        );
        const result = await response.json();
        setData(result[currency] || {});
      } catch (error) {
        console.error("Currency API Error:", error);
      }
    }

    fetchData();
  }, [currency]);

  return data;
}

export default useCurrencyInfo;