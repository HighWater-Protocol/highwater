import { Asset } from "./asset";

export interface Portfolio {
  id: string;
  clientId: string;
  name: string;
  assets: PortfolioAsset[];
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioAsset {
  asset: Asset;
  quantity: number;
  costBasis: number;
}
