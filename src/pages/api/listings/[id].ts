import { NextApiRequest, NextApiResponse } from 'next';
import { Property } from '@/types/property';
import { mockProperties } from '@/lib/api';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Property | { message: string }>
) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const property = mockProperties.find(p => p.id === id);

    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }

    // Simulate network delay
    setTimeout(() => {
      res.status(200).json(property);
    }, 500);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 