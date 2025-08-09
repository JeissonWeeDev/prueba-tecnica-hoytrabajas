import { NextResponse } from 'next/server';
import { products } from '../../../lib/products.js';

export async function GET(request) {
  try {
    return NextResponse.json({
      success: true,
      data: products
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}