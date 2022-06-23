import React from 'react';
import { fetchCoingecko } from 'services/fetches';
import { useRecoilValue } from 'recoil';
import { currencyState } from '@recoil/settings';
/**
 * Hook that retrieves the currency value for a given token.
 *
 * @param coinGeckoID The coinGeckoID of the coin
 * @param currencyOverride Optional currency code to override default which gets the currency value
 * from recoil
 */
const useCurrencyValue = (coinGeckoID: string, currencyOverride?: string) => {
  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState(undefined);
  const currency = useRecoilValue(currencyState);

  const fetchValue = async () => {
    const response = await fetchCoingecko(
      `/simple/price?ids=${coinGeckoID}&vs_currencies=${currencyOverride || currency}`
    );

    setLoading(false);

    setValue(
      response[coinGeckoID][
        currencyOverride ? currencyOverride.toLowerCase() : currency.toLowerCase()
      ]
    );
  };

  React.useEffect(() => {
    fetchValue();
  }, []);

  return {
    loading,
    value,
    currency: currencyOverride || currency,
  };
};

export default useCurrencyValue;
