import { NextRequest, NextResponse } from 'next/server';

import data from '../../../../public/product/celanadalam.json';

// API route handler
export const GET = (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const brand = searchParams.get('brand');
  const price = searchParams.get('price');
  const stock = searchParams.get('stock');

  // Get all data
  if (!brand && !price && !stock) {
    return NextResponse.json(data);
  }

  // Get data by specific brand
  if (brand) {
    const filteredData = data.filter(item =>
      item.brand.toLowerCase() === brand.toString().toLowerCase()
    );
    return NextResponse.json(filteredData);
  }

  // Get data by stock (e.g., stock >= 40)
  if (stock && !isNaN(Number(stock))) {
    const filteredStock = data.filter(item => Number(item.stock) >= Number(stock));
    return NextResponse.json(filteredStock);
  }

  // Get data by price (e.g., price <= 30000)
  if (price && !isNaN(Number(price))) {
    const filteredPrice = data.filter(item => Number(item.price) <= Number(price));
    return NextResponse.json(filteredPrice);
  }

  // Default response for invalid query
  return NextResponse.json({ message: 'Invalid query parameters' }, { status: 400 });
};
