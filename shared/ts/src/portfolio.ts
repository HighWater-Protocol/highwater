import { Asset } from "./asset";

export interface PortfolioAllocation {
  label: string;
  value: number;
}

export interface Portfolio {
  id: string;
  clientId: string;
  name: string;
  allocations: PortfolioAllocation[];
  assets: PortfolioAsset[];
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioAsset {
  asset: Asset;
  quantity: number;
  costBasis: number;
}
