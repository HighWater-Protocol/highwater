import axios from "axios";

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
const BASE_URL = "https://pro-api.coinmarketcap.com/v1";

export interface FetchAssetsParams {
  start?: number; // pagination start
  limit?: number; // number of assets to fetch
  convert?: string; // currency, e.g. USD
}

export async function fetchAssets({ start = 1, limit = 10, convert = "USD" }: FetchAssetsParams = {}) {
  if (!COINMARKETCAP_API_KEY) {
    throw new Error("CoinMarketCap API key is not set in environment variables.");
  }
  const url = `${BASE_URL}/cryptocurrency/listings/latest`;
  const response = await axios.get(url, {
    params: { start, limit, convert },
    headers: {
      "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
      "Accept": "application/json",
    },
  });
  return response.data.data; // returns array of asset objects
}
