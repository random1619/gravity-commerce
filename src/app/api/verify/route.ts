import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const data = await request.json();

    // Simulated verification logic
    console.log('Verifying student:', data);

    // In a real app, we would process the document here
    return NextResponse.json({
        success: true,
        message: 'Student status verified!',
        promoCode: 'STUDENT20'
    });
}
