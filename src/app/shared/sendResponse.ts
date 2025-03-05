import { Response } from "express";

export const sendResponse = <T>(
  res: Response,
  data: {
    statusCode: number;
    message: string;
    data: T | null | undefined;
    success: boolean;
    meta?: {
      total: number;
      page: number;
      limit: number;
    };
  }
) => {
  res.status(data.statusCode).json({
    message: data.message,
    data: data.data || null || undefined,
    success: data.success,
    meta: data.meta || null || undefined,
  });
};
