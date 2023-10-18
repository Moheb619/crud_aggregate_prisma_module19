import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newCart = await prisma.cart.create({
      data: body, // Make sure req.body contains the required fields
    });
    return new NextResponse(
      JSON.stringify({
        status: "Cart Created Successfully",
        message: body,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error,
      }),
      { status: 500 }
    );
  }
}
export async function GET(req: Request) {
  try {
    const cart = prisma.cart.findMany();
    return new NextResponse(
      JSON.stringify({
        status: "All Carts",
        message: cart,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error,
      }),
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const cartId = searchParams.get("id");
    const updatedCart = await prisma.cart.update({
      where: { id: Number(cartId) },
      data: body, // Make sure req.body contains the fields to update
    });
    return new NextResponse(
      JSON.stringify({
        status: "Cart Updated Successfully",
        message: body,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error,
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const cartId = searchParams.get("id");
    const deletedCart = await prisma.cart.delete({
      where: { id: Number(cartId) },
    });
    return new NextResponse(
      JSON.stringify({
        status: "Cart Deleted Successfully",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error,
      }),
      { status: 500 }
    );
  }
}
