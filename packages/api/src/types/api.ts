import { Asset } from "@highwater/types";
import { Client } from "@highwater/types";
import { Portfolio } from "@highwater/types";
import { RiskReport } from "@highwater/types";
import { ComplianceReport } from "@highwater/types";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  error?: Record<string, unknown>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export type AssetResponse = ApiResponse<Asset[]> & {
  total: number;
  page: number;
  totalPages: number;
};

export type ClientResponse = ApiResponse<Client[]> & {
  total: number;
  page: number;
  totalPages: number;
};

export type PortfolioResponse = ApiResponse<Portfolio[]> & {
  total: number;
  page: number;
  totalPages: number;
};

export type RiskResponse = ApiResponse<RiskReport[]> & {
  total: number;
  page: number;
  totalPages: number;
};

export type ComplianceResponse = ApiResponse<ComplianceReport[]> & {
  total: number;
  page: number;
  totalPages: number;
};

export interface AssetFilters {
  symbol?: string;
  name?: string;
  type?: "cryptocurrency" | "token" | "nft";
  minPrice?: number;
  maxPrice?: number;
}

export interface ClientFilters {
  name?: string;
  email?: string;
  status?: "active" | "inactive";
}

export interface PortfolioFilters {
  clientId?: string;
  name?: string;
  status?: "active" | "inactive";
}

export interface RiskFilters {
  clientId?: string;
  portfolioId?: string;
  score?: number;
}

export interface ComplianceFilters {
  clientId?: string;
  portfolioId?: string;
  status?: "pending" | "approved" | "rejected";
}
