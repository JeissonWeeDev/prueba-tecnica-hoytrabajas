import { NextResponse } from 'next/server';
import { products } from '../../../lib/products.js';

// Variable global para simular el carrito en memoria del servidor
let cart = [];

export async function GET(request) {
  try {
    return NextResponse.json({
      success: true,
      data: cart
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

export async function POST(request) {
  try {
    const { productId } = await request.json();
    
    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          message: 'productId is required'
        },
        { status: 400 }
      );
    }

    // Buscar el producto en la base de datos
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: 'Product not found'
        },
        { status: 404 }
      );
    }

    if (product.stock === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Product out of stock'
        },
        { status: 400 }
      );
    }

    // Buscar si el producto ya existe en el carrito
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex !== -1) {
      // Si existe, incrementar cantidad
      cart[existingItemIndex].quantity += 1;
    } else {
      // Si no existe, agregarlo al carrito
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Product added to cart',
      data: cart
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

export async function DELETE(request) {
  try {
    const { productId } = await request.json();
    
    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          message: 'productId is required'
        },
        { status: 400 }
      );
    }

    // Filtrar el producto del carrito
    cart = cart.filter(item => item.id !== productId);

    return NextResponse.json({
      success: true,
      message: 'Product removed from cart',
      data: cart
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

export async function PUT(request) {
  try {
    const { productId, quantity } = await request.json();
    
    if (!productId || quantity === undefined) {
      return NextResponse.json(
        {
          success: false,
          message: 'productId and quantity are required'
        },
        { status: 400 }
      );
    }

    if (quantity === 0) {
      // Si la cantidad es 0, remover el producto
      cart = cart.filter(item => item.id !== productId);
    } else {
      // Actualizar la cantidad
      const itemIndex = cart.findIndex(item => item.id === productId);
      if (itemIndex !== -1) {
        cart[itemIndex].quantity = quantity;
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Cart updated',
      data: cart
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