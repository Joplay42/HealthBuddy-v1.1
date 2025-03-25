import { recipeProps } from "@/types";
import { NextResponse } from "next/server";
import macro from "styled-jsx/macro";

export const POST = async (request: Request) => {
  // Error handling
  try {
    // Get the body request
    const body = await request.json();
    const { Name, NbServing, foods, macronutrients }: recipeProps = body;

    // Error handling
    if (!body || Object.keys(body).length === 0) {
      return new NextResponse(JSON.stringify({ message: "Invalid data" }), {
        status: 400,
      });
    }

    // Check if some attributes are missing
    if (
      !Name ||
      !NbServing ||
      !foods ||
      !macronutrients ||
      foods.length === 0 ||
      Object.keys(macronutrients).length === 0
    ) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing object attribute",
        }),
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Item has beens added to the database" },
      { status: 200 }
    );
  } catch (error: any) {
    // Error message
    return new NextResponse(
      JSON.stringify({
        message: "Ërror posting the item",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
