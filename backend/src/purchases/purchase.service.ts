import { Product } from 'electron'
import {db} from '../utiles/db.server'
import { generateBarcodeImage } from '../utiles/barcode';
import * as fs from 'fs';
import * as zlib from 'zlib';

type Purchase = {
  id: number;
  name: string;
  barcode: number;
  sell: number;
  shop: number;
  totalShop: number,
  quantity: number;
  expiresIn: string;
  supplierName: string,
  categoryName: string,
  email: string;
  contact: string;
  invoice :number;
  categoryId: number;
  supplierId: number;
};

type Shop = {
  id: number;
  invoice: number;
  totalShop: number;
  supplierId: number;
  products: [
    {
      name: string;
      sell: number;
      shop: number;
      quantity: number;
      expiresIn: string;
      categoryId: number; 
      productId: number;
    }
  ]
};

const barcodepaths: string[] = [];



// Create
export async function create(formData: Purchase | Purchase[]) {
  const purchasesArray = Array.isArray(formData) ? formData : [formData];
  //Insert purchase just once
  const purchaseData = await db.purchase.create({
    data: {
      invoice: purchasesArray[0].invoice,
      totalShop: purchasesArray[0].totalShop,
      supplier:{
        connectOrCreate:{
          where:{name: purchasesArray[0].supplierName},
          create:{name: purchasesArray[0].supplierName, email: purchasesArray[0].email, contact: purchasesArray[0].contact}
        }
      }
    }
  });

// ======= New code

const createdPurchases = [];
for (const purchase of purchasesArray) {
  // Check if the product already exists based on the barcode
  const existingProduct = await db.product.findUnique({
    where: { name: purchase.name },
  });

  if (existingProduct) {
    // If the product exists, update the quantity, sell, and shop
    const updatedProduct = await db.product.update({
      where: { id: existingProduct.id },
      data: {
        quantity: existingProduct.quantity + purchase.quantity,
        sell: purchase.sell,
        shop: purchase.shop,
      },
    });

    // Create barcode
    // generateBarcodeImage(existingProduct.barcode.toString(), './public/barcodes');

    generateBarcodeImage(existingProduct.barcode.toString())
    .then((filePath) => {
      const pathValues = {barcode: filePath};
        // barcodepaths.push(pathValues);   
        
    })
    .catch((error) => {
        console.error(`Error generating barcode image: ${error.message}`);
    });

    // Create a new entry in the purchaseproduct table
    try {
      await db.purchaseProduct.create({
        data: {
          name: purchase.name,
          sell: purchase.sell,
          shop: purchase.shop,
          quantity: purchase.quantity,
          expiresIn: purchase.expiresIn,
          productId: updatedProduct.id,
          purchaseId: purchaseData.id,
        },
      });

      createdPurchases.push(true);
    } catch (error) {
      // Handle the error
      createdPurchases.push(false);
    }
  } else {
    // Check if the category already exists
    const existingCategory = await db.category.findUnique({
      where: { name: purchase.categoryName },
    });

    // Create or connect to the category
    const category = existingCategory
      ? { connect: { id: existingCategory.id } }
      : { create: { name: purchase.categoryName } };

    try {
      // If the product doesn't exist, create a new product and purchase entry
      await db.product.create({
        data: {
          name: purchase.name,
          barcode: purchase.barcode,
          sell: purchase.sell,
          shop: purchase.shop,
          quantity: purchase.quantity,
          expiresIn: purchase.expiresIn,
          category: category,
          purchases: {
            create: [
              {
                name: purchase.name,
                sell: purchase.sell,
                shop: purchase.shop,
                quantity: purchase.quantity,
                expiresIn: purchase.expiresIn,
                purchaseId: purchaseData.id,
              },
            ],
          },
        },
      });
      // generateBarcodeImage(purchase.barcode.toString(), './public/barcodes');
      
      generateBarcodeImage(purchase.barcode.toString())
    .then((filePath) => {
      var pathValues = {barcode: filePath};
      // barcodepaths.push(pathValues);
    })
    .catch((error) => {
        console.error(`Error generating barcode image: ${error.message}`);
    });
      createdPurchases.push(true);
    } catch (error) {
      // Handle the error
      createdPurchases.push(false);
    }
  }
}


// ======== end new code
  // return Array.isArray(formData) ? createdPurchases : createdPurchases[0];
  return {ok: true, paths: barcodepaths};
}


//   Get all purchases
export async function findAll(){
	const purchase = await db.purchase.findMany({
    orderBy:{id: 'desc'},
    select:{
      id: true,
      invoice: true,
      totalShop: true,
      supplier: true,
      purchases: true,
      createdAt: true,
      updatedAt: true
    }
  });
	return purchase;
}

// Get single purchase
export async function findById(id: number){
	const purchase = await db.purchase.findUnique({
        where: {id: id},
         
        select: {
          id:true,
          totalShop:true,
          invoice: true,
          supplier: true,
          purchases:{
            select:{
              name:true,
              sell:true,
              shop:true,
              quantity: true,
              productId: true,
              product:true,
            }
          },
          createdAt: true,
          updatedAt: true
        }})
	return purchase;
}

// Delete purchase
export async function destroy(id: number){
	const purchase = await db.purchase.delete({where: {id: id}})
	return purchase;
}

export async function updatePurchase(data: Shop, id: number) {
  try {
    const purchase = await db.purchase.update({
      where: { id: id },
      data: {
        invoice: data.invoice,
        totalShop: data.totalShop,
        supplierId: data.supplierId,
        purchases: {
          update: data.products.map(item => ({
            where: { purchaseId_productId: { purchaseId: id, productId: item.productId } },
            data: {
              name: item.name,
              sell: item.sell,
              shop: item.shop,
              quantity: item.quantity,
              expiresIn: item.expiresIn,
              product: {
                update: {
                  where: { id: item.productId },
                  data: {
                    name: item.name,
                    sell: item.sell,
                    shop: item.shop,
                    quantity: item.quantity,
                    expiresIn: item.expiresIn,
                    categoryId: item.categoryId,
                  },
                },
              },
            },
          }))
        
        },
      },
      include: {
        purchases: {
          include: {
            product: true,
          },
        },
      },
    });

    return purchase;
  } catch (error) {
    
    throw error; 
  }
}


// Compress image
function compressAndEncodeImage(filePath: string) {
  const imageData = fs.readFileSync(filePath);

  // Compress the image data using gzip
  const compressedData = zlib.gzipSync(imageData);

  // Encode the compressed data as base64
  const base64Encoded = compressedData.toString('base64');

  return base64Encoded;
}




  
  
  