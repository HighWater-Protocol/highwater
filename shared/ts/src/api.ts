import { Request } from 'express';
import { ParsedQs } from 'qs';
import { ComplianceLog, ComplianceReport } from "./compliance";

/**
 * Type guard to check if a value is a string
 */
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Extended request interface for paginated endpoints
 */
export interface PaginatedRequest extends Request {
  query: {
    page?: string;
    limit?: string;
    [key: string]: string | ParsedQs | string[] | ParsedQs[] | undefined;
  };
}

/**
 * Safely gets a string value from query parameters
 */
export function getStringParam(
  query: ParsedQs, 
  key: string, 
  defaultValue: string = ''
): string {
  const value = query[key];
  if (Array.isArray(value)) {
    return isString(value[0]) ? value[0] : defaultValue;
  }
  return isString(value) ? value : defaultValue;
}

/**
 * Standard response format for paginated data
 */
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

// Specific response types
export type ComplianceLogsResponse = PaginatedResponse<ComplianceLog>;
export type ComplianceReportsResponse = PaginatedResponse<ComplianceReport>;
