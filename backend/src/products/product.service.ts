import {db} from '../utiles/db.server'


type Product= {
	id: number,
    name: string,
	barcode: number,
	sell: number,
	shop: number,
    quantity: number,
    expiresIn: string,
    categoryName: string,
    categoryId: number
    
}


// create product
export async function createProduct(formData: Product){
	const product = await db.product.create({
        data: {
            name: formData.name,
            barcode: formData.barcode,
            sell: formData.sell,
            shop: formData.shop,
            quantity: formData.quantity,
            expiresIn: formData.expiresIn,
            category: {
                        connectOrCreate:{
                            where: {name: formData.categoryName},
                            create: {name: formData.categoryName}
                        }
                      }
                     
            }
	})
	return product;
}



//   Get all products
export async function findAll(){
	const products = await db.product.findMany({
        orderBy: {id: 'desc'},
        select: {
                    id: true, 
                    name: true, 
                    barcode: true, 
                    sell: true, 
                    shop: true,
                    quantity: true,
                    expiresIn: true,
                    createdAt: true,
                    category: true
               }
            });
	return products;
}

// Get single product by id
export async function findById(id: number){
	const user = await db.product.findUnique({where: {id: id},   select: {
        id: true, 
        name: true, 
        barcode: true, 
        sell: true, 
        shop: true,
        quantity: true,
        category: {
                    select:{
                                name:true
                            }
        }
    }})
	return user;
}

// Get single product by barcode
export async function findByBarcode(barcode: number){
	const product = await db.product.findUnique({where: {barcode: barcode},   select: {
        id: true, 
        name: true, 
        barcode: true, 
        sell: true, 
        quantity: true
    }})
	return product;
}

// Get single product by name
export async function findByName(name: string){
	const product = await db.product.findUnique({where: {name: name},   select: {
        id: true, 
        name: true, 
        barcode: true, 
        sell: true, 
        quantity: true
    }})
	return product;
}

// Delete product
export async function destroy(id: number){
	const product = await db.product.delete({where: {id: id}})
	return product;
}


// update product
export async function updateProduct(id: number, formData: Product){
	const product = await db.product.update({
		where: {id: id}, 
        data: {
            name: formData.name,
            barcode: formData.barcode,
            sell: formData.sell,
            shop: formData.shop,
            quantity: formData.quantity,
            expiresIn: formData.expiresIn,
            categoryId: formData.categoryId
                     
            }
	})
	return product;
}


// Reduce product quantity
export async function updateProductQty(items: { productId: number; quantity: number }[]): Promise<boolean> {
    try {
      for (const item of items) {
        const existingProduct = await db.product.findUnique({
          where: { id: item.productId },
          select: { quantity: true },
        });
  
  
        // Check if newQuantity is less than the existing quantity
        if(existingProduct != null){
            if (item.quantity <= existingProduct.quantity) {
                await db.product.update({
                  where: { id: item.productId },
                  data: {
                    quantity: {
                      decrement: item.quantity,
                    },
                  },
                });
              } else {
                  return false;
              }
        }
        else {return false;}
      }
  
      return true;
    } catch (error) {
      return false;
    }
  }

  
  
  