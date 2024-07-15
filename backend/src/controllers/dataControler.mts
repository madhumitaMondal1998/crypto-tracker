import { Request, Response } from 'express';
import PriceData from '../models/priceData.mjs';

export const getData = async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params;
    const data = await PriceData.find({ symbol }).sort({ timestamp: -1 }).limit(20);
    res.json(data);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
