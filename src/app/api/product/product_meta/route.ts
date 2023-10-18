import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newProductMeta = await prisma.productMeta.create({
      data: body, // Make sure req.body contains the required fields
    });
    return new NextResponse(
      JSON.stringify({
        status: "ProductMeta Created Successfully",
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
    const productMeta = prisma.productMeta.findMany();
    return new NextResponse(
      JSON.stringify({
        status: "All ProductMetas",
        message: productMeta,
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
    const productMetaId = searchParams.get("id");
    const updatedProductMeta = await prisma.productMeta.update({
      where: { id: Number(productMetaId) },
      data: body, // Make sure req.body contains the fields to update
    });
    return new NextResponse(
      JSON.stringify({
        status: "ProductMeta Updated Successfully",
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
    const productMetaId = searchParams.get("id");
    const deletedProductMeta = await prisma.productMeta.delete({
      where: { id: Number(productMetaId) },
    });
    return new NextResponse(
      JSON.stringify({
        status: "ProductMeta Deleted Successfully",
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
