
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { generateSlug } from "@/lib/utils";
import { apiResponse } from "@/lib/apiResponse";



export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

const categories = await prisma.Category.findMany({

  include: {
    images: {
      where: {  isActive: true },
      orderBy: { createdAt: "desc" },
      take: 1, 
    }
  },
  skip,
  take: limit,
  orderBy: { createdAt: "desc" },
});


    return apiResponse({
      data: categories,
      message: "Categories fetched successfully",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return apiResponse({
      success: false,
      statusCode: 500,
      message: "Failed to fetch categories",
      data: null,
    });
  }
}

export const POST = requireAdmin(async (req) => {
  try {
    
    const data =  await req.json();
    const {name} = data;
    


    if (!name) {
     return apiResponse({
        success: false,
        statusCode: 400,
        message: "Name is required",
        data: null,
    })
}



    //check if category already exists
    const existingCategory = await prisma.category.findFirst({
      where: { name },
    });
    if (existingCategory) {
     return apiResponse({
        success: false,
        statusCode: 400,
        message: "Category with this name already exists",
        data: null,
      });
    }


    const slug = generateSlug(name);
    const category = await prisma.category.create({
      data: { name, slug },
    });

    return apiResponse({
      data: category,
      message: "Category created successfully",
      statusCode: 201,
      success: true,
    });

  } catch (error) {
    console.error("Error creating category:", error);
    return apiResponse({
      success: false,
      statusCode: 500,
      message: "Failed to create category",
      data: null,
    });
  }
});
