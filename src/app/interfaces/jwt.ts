export type TJwtPayload = {
  email: string;
  role: "ADMIN" | "SUPER_ADMIN" | "DOCTOR" | "PATIENT";
  iat?: number;
  exp?: number;
};
