import {db} from '../utiles/db.server'


type customer= {
	id: number,
    fullname: string,
	contact: string
}

//   Get all customer
export async function findAll(){
	const customer = await db.customer.findMany({select: {id: true, fullname: true, contact: true}})
	return customer;
}

// Get single customer
export async function findById(id: number){
	const customer = await db.customer.findUnique({where: {id: id}, select: {id: true, fullname: true, contact: true}})
	return customer;
}

// Create customer
export async function create(formData: customer){
	  // Check if the supplierName already exists
      const existingcustomer = await db.customer.findUnique({
        where: {
          fullname: formData.fullname
        },
      });
    
      if (existingcustomer) {
        // Supplier with the same name already exists
        throw new Error('O cliente já existe');
      }

	const customer = await db.customer.create({
        data: {
            fullname: formData.fullname,
			contact: formData.contact
            }})
	return customer;	
}



// Delete customer
export async function destroy(id: number){
	const customer = await db.customer.delete({where: {id: id}})
	return customer;
}


// update user
export async function updatecustomer(id: number, formData: customer){
	const customer = await db.customer.update({
		where: {id: id}, 
		data: {fullname: formData.fullname, contact: formData.contact}
	})
	return customer;
}

  
  
  