import { NextResponse } from 'next/server';

// CheapShark API base
const CHEAPSHARK_API = 'https://www.cheapshark.com/api/1.0';

// PSPrices API base (PlayStation)
const PSPRICES_API = 'https://psprices.com/region-us/api/v1';

// Fallback demo deals for when APIs are unavailable
const DEMO_DEALS = [
  {
    id: '1',
    title: 'Elden Ring',
    thumb: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
    salePrice: '29.99',
    normalPrice: '59.99',
    savings: 50,
    platform: 'steam',
  },
  {
    id: '2',
    title: 'Grand Theft Auto V',
    thumb: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg',
    salePrice: '14.99',
    normalPrice: '29.99',
    savings: 50,
    platform: 'steam',
  },
  {
    id: '3',
    title: 'Red Dead Redemption 2',
    thumb: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg',
    salePrice: '29.99',
    normalPrice: '59.99',
    savings: 50,
    platform: 'steam',
  },
  {
    id: '4',
    title: 'Cyberpunk 2077',
    thumb: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
    salePrice: '24.99',
    normalPrice: '59.99',
    savings: 58,
    platform: 'steam',
  },
  {
    id: '5',
    title: 'Hogwarts Legacy',
    thumb: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg',
    salePrice: '35.99',
    normalPrice: '59.99',
    savings: 40,
    platform: 'steam',
  },
  {
    id: '6',
    title: 'Baldur\'s Gate 3',
    thumb: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg',
    salePrice: '44.99',
    normalPrice: '59.99',
    savings: 25,
    platform: 'steam',
  },
  {
    id: '7',
    title: 'God of War',
    thumb: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg',
    salePrice: '24.99',
    normalPrice: '49.99',
    savings: 50,
    platform: 'steam',
  },
  {
    id: '8',
    title: 'Spider-Man Remastered',
    thumb: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/header.jpg',
    salePrice: '39.99',
    normalPrice: '59.99',
    savings: 33,
    platform: 'steam',
  },
];

export async function GET() {
  try {
    // Try CheapShark API for Steam deals
    const response = await fetch(
      `${CHEAPSHARK_API}/deals?storeID=1&upperPrice=50&pageSize=20`,
      { next: { revalidate: 300 } } // Cache for 5 minutes
    );

    if (!response.ok) {
      throw new Error('CheapShark API failed');
    }

    const data = await response.json();

    // Transform CheapShark data to our format
    const deals = data.map((deal) => ({
      id: deal.dealID,
      title: deal.title,
      thumb: deal.thumb,
      salePrice: deal.salePrice,
      normalPrice: deal.normalPrice,
      savings: parseFloat(deal.savings),
      platform: 'steam',
      dealID: deal.dealID,
      dealRating: deal.dealRating,
    }));

    return NextResponse.json(deals);
  } catch (error) {
    console.error('Deals API error:', error);
    // Return demo data if API fails
    return NextResponse.json(DEMO_DEALS);
  }
}
