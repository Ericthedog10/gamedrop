import { NextResponse } from 'next/server';

const CHEAPSHARK_API = 'https://www.cheapshark.com/api/1.0';

export async function GET(request, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Game ID required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${CHEAPSHARK_API}/games?id=${id}`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      throw new Error('CheapShark game info failed');
    }

    const data = await response.json();

    return NextResponse.json({
      id: data.info?.gameID,
      title: data.info?.title,
      thumb: data.info?.thumb,
      currentPrice: data.cheapestPrice,
      deals: data.deals?.map((deal) => ({
        store: deal.storeID,
        price: deal.price,
        retailPrice: deal.retailPrice,
        savings: parseFloat(deal.savings),
      })) || [],
    });
  } catch (error) {
    console.error('Game info API error:', error);
    return NextResponse.json({ error: 'Failed to fetch game info' }, { status: 500 });
  }
}
