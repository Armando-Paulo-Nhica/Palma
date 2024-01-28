import {db} from '../utiles/db.server'

type Sale = {
    totalAmount: number,
    customerId: number, 
    employerId: number,
    invoice: number, 
    items: [
      { productId: number, quantity: number, subTotal: number }
      
    ],
  };

// Invoice
function generateInvoice() {
  const currentTime = new Date().getTime();
  const reference = currentTime.toString().slice(-10);
  return parseInt(reference, 10);
}

//   Get all sale
export async function findAll(){
	const sale = await db.sale.findMany(
            {
              orderBy: {id: 'desc'},
                select: {id: true, customer:true, invoice: true, employer: true, totalAmount: true, createdAt: true, items: {select: {quantity: true, subTotal: true, product: true}}}
            }
        )
	return sale;
}
 
// Get single sale
export async function findById(id: number){
	const sale = await db.sale.findUnique({where: {id: id},  select: {id: true, invoice: true, customerId:true, employerId:true, totalAmount: true, createdAt: true, items: {select: {quantity: true, subTotal: true, product: true}}}})
	return sale;
}

// Create sale
export async function create(newSaleData: Sale){
	const Sale = await db.sale.create({
        data: {
            totalAmount: newSaleData.totalAmount,
            customerId: newSaleData.customerId,
            employerId: newSaleData.employerId,
            invoice: generateInvoice(),
            items:{create: newSaleData.items}
            }})
	return Sale;	
}
// Delete Sale
export async function destroy(id: number){
	const sale = await db.sale.delete({where: {id: id}})
	return sale;
}

// Update sale
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
