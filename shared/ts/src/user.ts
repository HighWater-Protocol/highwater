export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "advisor";
  createdAt: string;
  updatedAt: string;
}
