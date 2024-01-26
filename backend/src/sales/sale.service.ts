import {db} from '../utiles/db.server'

type Sale = {
    totalAmount: number,
    customerId: number, 
    employerId: number, 
    items: [
      { productId: number, quantity: number, subTotal: number }
      
    ],
  };

//   Get all sale
export async function findAll(){
	const sale = await db.sale.findMany(
            {
                select: {id: true, totalAmount: true, createdAt: true, items: {select: {quantity: true, subTotal: true, prodduct: true}}}
            }
        )
	return sale;
}

// Get single sale
export async function findById(id: number){
	const sale = await db.sale.findUnique({where: {id: id}, select: {id: true, totalAmount: true, createdAt: true, items: {select: {quantity: true, subTotal: true, prodduct: true}}}})
	return sale;
}

// Create sale
export async function create(newSaleData: Sale){
	const Sale = await db.sale.create({
        data: {
            totalAmount: newSaleData.totalAmount,
            customerId: newSaleData.customerId,
            employerId: newSaleData.employerId,
            items:{create: newSaleData.items}
            }})
	return Sale;	
}
// Delete Sale
export async function destroy(id: number){
	const sale = await db.sale.delete({where: {id: id}})
	return sale;
}


// update Sale
// export async function updateSale(id: number, newSaleData: Sale){
// 	const sale = await db.sale.update({
// 		where: {id: id}, 
// 		data: {
//             totalAmount: newSaleData.totalAmount,
//             customerId: newSaleData.customerId,
//             employerId: newSaleData.employerId,
//             items:{create: newSaleData.items}
//             }
// 	})
// 	return sale;
// }


export async function updateSale(id: number, newSaleData: Sale) {
  try {
    const sale = await db.sale.update({
      where: { id: id },
      data: {
        totalAmount: newSaleData.totalAmount,
        customerId: newSaleData.customerId,
        employerId: newSaleData.employerId,
        items: {
          // Assuming SaleOrder data is directly provided in newSaleData.items
          upsert: newSaleData.items.map(item => ({
            where: { saleId_productId: { saleId: id, productId: item.productId } },
            update: {
              quantity: item.quantity,
              subTotal: item.subTotal,
            },
            create: {
              quantity: item.quantity,
              subTotal: item.subTotal,
              productId: item.productId,
            },
          })),
        },
      },
    });

    return sale;
  } catch (error) {
    throw error;
  }
}
