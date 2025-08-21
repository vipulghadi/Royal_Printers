
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { generateSlug } from "@/lib/utils";
import { apiResponse } from "@/lib/apiResponse";

const updateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  slug: z.string().min(1).max(200).optional(),
  imageUrl: z.string().max(2048).url().nullable().optional(),
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const categories = await prisma.category.findMany({
      where: { isDeleted: false, isActive: true },
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
    console.log("Content-Type:", req.headers.get("content-type"));
    const data =  await req.formData();
    const name = data.get("name")?.toString().trim();
    const slug = data.get("slug")?.toString().trim() || generateSlug(name);
    const imageFile = data.get("imageFile");

    if (!name) {
     return apiResponse({
        success: false,
        statusCode: 400,
        message: "Name is required",
        data: null,
    })
}

    if (!imageFile) {
     return apiResponse({
        success: false,
        statusCode: 400,
        message: "Invalid image file",
        data: null,
      });
    }

    //check if category already exists
    const existingCategory = await prisma.category.findFirst({
      where: { name, isDeleted: false, isActive: true },
    });
    if (existingCategory) {
     return apiResponse({
        success: false,
        statusCode: 400,
        message: "Category with this name already exists",
        data: null,
      });
    }


    //upload image url
    let imageUrl = null;
    const fileBuffer = await imageFile.arrayBuffer();
    const mimetype = imageFile.type;
    const folder = "categories";
    imageUrl = await uploadImage(Buffer.from(fileBuffer), mimetype, folder);

    const category = await prisma.category.create({
      data: { name, imageUrl, slug },
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
