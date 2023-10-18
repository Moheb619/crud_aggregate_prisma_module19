import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newProduct = await prisma.product.create({
      data: body, // Make sure req.body contains the required fields
    });

    const groupBySlug = await prisma.product.groupBy({
      by: ["slug"],
    });

    console.log("Product is grouped by Slug: ", groupBySlug);

    return new NextResponse(
      JSON.stringify({
        status: "Product Created Successfully",
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
    const product = prisma.product.findMany();
    return new NextResponse(
      JSON.stringify({
        status: "All Products",
        message: product,
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
    const productId = searchParams.get("id");
    const updatedProduct = await prisma.product.update({
      where: { id: Number(productId) },
      data: body, // Make sure req.body contains the fields to update
    });
    return new NextResponse(
      JSON.stringify({
        status: "Product Updated Successfully",
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
    const productId = searchParams.get("id");
    const deletedProduct = await prisma.product.delete({
      where: { id: Number(productId) },
    });
    return new NextResponse(
      JSON.stringify({
        status: "Product Deleted Successfully",
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
