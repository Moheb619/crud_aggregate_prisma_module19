import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newOrder = await prisma.order.create({
      data: body, // Make sure req.body contains the required fields
    });

    const aggregations = await prisma.order.aggregate({
      _avg: {
        grandTotal: true,
      },
      _count: {
        grandTotal: true,
      },
      _max: {
        grandTotal: true,
      },
      _sum: {
        grandTotal: true,
      },
      orderBy: {
        grandTotal: "asc",
      },
      take: 10,
    });

    console.log("Average grand total:" + aggregations._avg.grandTotal);
    console.log("Total count of grand total:" + aggregations._count.grandTotal);
    console.log("Maximum value of grand total:" + aggregations._max.grandTotal);
    console.log("Minimum value of grand total:" + aggregations._sum.grandTotal);

    return new NextResponse(
      JSON.stringify({
        status: "Order Created Successfully",
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
    const order = prisma.order.findMany();
    return new NextResponse(
      JSON.stringify({
        status: "All Orders",
        message: order,
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
    const orderId = searchParams.get("id");
    const updatedOrder = await prisma.order.update({
      where: { id: Number(orderId) },
      data: body, // Make sure req.body contains the fields to update
    });
    return new NextResponse(
      JSON.stringify({
        status: "Order Updated Successfully",
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
    const orderId = searchParams.get("id");
    const deletedOrder = await prisma.order.delete({
      where: { id: Number(orderId) },
    });
    return new NextResponse(
      JSON.stringify({
        status: "Order Deleted Successfully",
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
