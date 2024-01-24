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
    
}

//   Get all products
export async function findAll(){
	const products = await db.product.findMany({
        select: {
                    id: true, 
                    name: true, 
                    barcode: true, 
                    sell: true, 
                    shop: true,
                    category: {
                                select:{
                                            name:true
                                        }
                            }
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
            sell: formData.shop,
            shop: formData.shop,
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

  
  
  