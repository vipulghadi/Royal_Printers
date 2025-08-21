import {apiResponse} from '@/lib/apiResponse';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import {z} from 'zod';
import { generateSlug } from '@/lib/utils';
import { uploadImage } from '@/lib/cloudinary';


const categoryUpdateSchema = z.object({
  name: z.string().min(3, "Name is required"),
  isActive: z.boolean().optional(),
});

export const GET = requireAdmin(async (req, { params }) => {
  try {
    const { id } = params;
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id, 10), isDeleted: false },
    });

    if (!category) {
      return apiResponse({
        success: false,
        statusCode: 404,
        message: "Category not found",
        data: null,
      });
    }

    return apiResponse({
      data: category,
      message: "Category fetched successfully",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    return apiResponse({
      success: false,
      statusCode: 500,
      message: "Failed to fetch category",
      data: null,
    });
  }
})

export const DELETE=requireAdmin(async (req, { params }) => {
try{
    const {id}=params;
    const category=await prisma.category.findUnique({
        where: { id: parseInt(id, 10), isDeleted: false },
    })

      if (!category) {
        return apiResponse({
            success: false,
            statusCode: 404,
            message: "Category not found",
            data: null,
        });
        }

        await prisma.category.update({
        where: { id: parseInt(id, 10) },
        data: { isDeleted: true },
        });

        return apiResponse({
        success: true,
        statusCode: 200,
        message: "Category deleted successfully",
        data: null,
        });
    
}
catch(error){
  return apiResponse({
        success: false,
        statusCode: 500,
        message: "Failed to delete category",
        data: null,
        });
}
    }
)

export const PUT = requireAdmin(async (req, { params }) => {
  try {
    const { id } = params;
    const data = await req.formData();

    // Get fields from formData
    const rawData = {
      name: data.get("name")?.toString().trim(),
     
    };

    // Zod validation
    const parsed = categoryUpdateSchema.safeParse(rawData);
    if (!parsed.success) {
      return apiResponse({
        success: false,
        statusCode: 400,
        message: parsed.error.errors[0].message, 
        data: null,
      });
    }

    const { name,isActive} = parsed.data;
    const imageFile = data.get("imageFile");

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: parseInt(id, 10), isDeleted: false },
    });

    if (!existingCategory) {
      return apiResponse({
        success: false,
        statusCode: 404,
        message: "Category not found",
        data: null,
      });
    }

    // Update category
    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        slug:  generateSlug(name),
        imageUrl: imageFile ? await uploadImage(imageFile) : existingCategory.imageUrl,
        isActive: isActive ?? existingCategory.isActive,
      },
    });

    return apiResponse({
      data: updatedCategory,
      message: "Category updated successfully",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return apiResponse({
      success: false,
      statusCode: 500,
      message: "Failed to update category",
      data: null,
    });
  }
});