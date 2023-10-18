import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newProductReview = await prisma.productReview.create({
      data: body, // Make sure req.body contains the required fields
    });
    return new NextResponse(
      JSON.stringify({
        status: "ProductReview Created Successfully",
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
    const productReview = prisma.productReview.findMany();
    return new NextResponse(
      JSON.stringify({
        status: "All ProductReviews",
        message: productReview,
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
    const productReviewId = searchParams.get("id");
    const updatedProductReview = await prisma.productReview.update({
      where: { id: Number(productReviewId) },
      data: body, // Make sure req.body contains the fields to update
    });
    return new NextResponse(
      JSON.stringify({
        status: "ProductReview Updated Successfully",
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
    const productReviewId = searchParams.get("id");
    const deletedProductReview = await prisma.productReview.delete({
      where: { id: Number(productReviewId) },
    });
    return new NextResponse(
      JSON.stringify({
        status: "ProductReview Deleted Successfully",
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
