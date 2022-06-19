import React from 'react';
import { fetchCoingecko } from 'services/fetches';
/**
 * Hook that retrieves the currency value for a given token.
 *
 * @param coinGeckoID The coinGeckoID of the coin
 * @param currrency The currency to check for (eg. USD)
 */
const useCurrencyValue = (coinGeckoID: string, currency: string) => {
  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState(-1);

  const fetchValue = async () => {
    const response = await fetchCoingecko(
      `/simple/price?ids=${coinGeckoID}&vs_currencies=${currency}`
    );

    setLoading(false);

    setValue(response[coinGeckoID][currency.toLowerCase()]);
  };

  React.useEffect(() => {
    fetchValue();
  }, []);

  return {
    loading,
    value,
  };
};

export default useCurrencyValue;
