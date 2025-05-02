export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: "cryptocurrency" | "token" | "nft";
  currentPrice: number;
  priceCurrency: string;
}
