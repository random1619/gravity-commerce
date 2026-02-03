import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/data';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;

    const filteredProducts = getProducts(category, maxPrice);

    return NextResponse.json(filteredProducts);
}
