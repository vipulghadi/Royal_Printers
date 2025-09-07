import { apiResponse } from "@/lib/apiResponse";
import prisma from "@/lib/prisma";
import paginator from "@/lib/paginator";
import { includes, z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { Prisma } from "@prisma/client";

// ✅ Schema with coercion (string → number)
const createProductAttributeSchema = z.object({
  productId: z.coerce.number().positive(),
  attributeId: z.coerce.number().positive(),
  attributeOptionId: z.coerce.number().positive(),
  priceAdjustment: z.coerce.number().min(0).optional().default(0),
});

// ✅ GET handler
export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const productId = searchParams.get("productId");

    if (!productId) {
      return apiResponse({
        success: false,
        statusCode: 400,
        message: "productId is required",
        data: null,
      });
    }

    const result = await paginator(
      prisma.productAttribute,
      {
        where: {
          isActive: true,
          productId: Number(productId),
        },
        orderBy: { createdAt: "desc" },
         include: { product: true, attribute: true, attributeOption: true }

        
      },
      page,
      limit
    );
    const formattedResponse = result.data.map((item) => ({
      id: item.id,
      productId: item.productId,
      attributeId: item.attributeId,
      attributeOptionId: item.attributeOptionId,
      priceAdjustment: item.priceAdjustment?.toString() ?? "0.00",
      isActive: item.isActive,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      productName: item.product?.name || null,
      attributeName: item.attribute?.name || null,
      optionValue: item.attributeOption?.value || null,
    }));

    return apiResponse({
      data: formattedResponse,
      message: "product attributes fetched successfully",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching attributes:", error);
    return apiResponse({
      success: false,
      statusCode: 500,
      message: "Failed to fetch attributes",
      data: null,
    });
  }
};

// ✅ POST handler
export const POST = requireAdmin(async (req) => {
  try {
    const data = await req.json();
    console.log("Incoming data:", data);

    // Parse & validate
    const parsedData = createProductAttributeSchema.parse(data);

    // Check uniqueness by productId, attributeId, and attributeOptionId
    const existingProduct = await prisma.productAttribute.findFirst({
      where: {
        productId: parsedData.productId,
        attributeId: parsedData.attributeId,
        attributeOptionId: parsedData.attributeOptionId,
        
      },
    });

    if (existingProduct) {
      return apiResponse({
        success: false,
        statusCode: 400,
        message: "Product with this attribute already exists",
        data: null,
      });
    }

    // Create new attribute with Prisma.Decimal
    const newProduct = await prisma.productAttribute.create({
      data: {
        productId: parsedData.productId,
        attributeId: parsedData.attributeId,
        attributeOptionId: parsedData.attributeOptionId,
        priceAdjustment: new Prisma.Decimal(parsedData.priceAdjustment)
      },
    });

    return apiResponse({
      success: true,
      statusCode: 201,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return apiResponse({
      success: false,
      statusCode: 500,
      message: error.message || "Failed to create product",
      data: null,
    });
  }
});
