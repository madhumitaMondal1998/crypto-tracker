import axios from 'axios';
import PriceData from '../models/priceData.mjs';

const fetchCryptoData = async (symbol: string): Promise<number> => {
  const response = await axios.get(`${process.env.COINGECKO_API_URL}/simple/price`, {
    params: {
      ids: symbol.toLowerCase(),
      vs_currencies: 'usd',
    },
  });
  return response.data[symbol.toLowerCase()].usd;
};

const fetchStockData = async (symbol: string): Promise<number> => {
  const response = await axios.get(process.env.ALPHA_VANTAGE_API_URL as string, {
    params: {
      function: 'GLOBAL_QUOTE',
      symbol,
      apikey: process.env.ALPHA_VANTAGE_API_KEY,
    },
  });
  return parseFloat(response.data['Global Quote']['05. price']);
};

const fetchData = async (): Promise<void> => {
  try {
    const symbols = ['BTC', 'ETH', 'GOOG', 'AAPL', 'TSLA'];

    for (const symbol of symbols) {
      let price: number;

      if (symbol === 'BTC' || symbol === 'ETH') {
        price = await fetchCryptoData(symbol);
      } else {
        price = await fetchStockData(symbol);
      }

      const priceData = new PriceData({ symbol, price });
      await priceData.save();
    }
  } catch (err) {
    console.error('Data fetching error:', err);
  }
};

export default fetchData;
