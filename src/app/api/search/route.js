import { NextResponse } from 'next/server';

const CHEAPSHARK_API = 'https://www.cheapshark.com/api/1.0';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const response = await fetch(
      `${CHEAPSHARK_API}/games?title=${encodeURIComponent(query)}&limit=10`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      throw new Error('CheapShark search failed');
    }

    const data = await response.json();

    // Transform to our format
    const results = data.map((game) => ({
      id: game.gameID,
      title: game.external,
      thumb: game.thumb,
      cheapestPrice: game.cheapest,
      cheapestDealID: game.cheapestDealID,
      platform: 'steam',
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json([]);
  }
}
