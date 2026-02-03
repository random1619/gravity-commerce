import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/data';
import { sanitizeNumber, isValidCategory } from '@/lib/security';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const categoryParam = searchParams.get('category');
        const maxPriceParam = searchParams.get('maxPrice');

        // Validate and sanitize inputs
        const category = categoryParam && isValidCategory(categoryParam)
            ? categoryParam
            : undefined;

        const maxPrice = sanitizeNumber(maxPriceParam, 0, 100000) || undefined;

        const filteredProducts = getProducts(category, maxPrice);

        return NextResponse.json(filteredProducts);
    } catch (error) {
        console.error('Products API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}
