import {db} from '../utiles/db.server'


type Supplier= {
	id: number,
    name: string,
    email: string,
    contact: string
}

//   Get all suppliers
export async function findAll(){
	const supplier = await db.supplier.findMany({select: {id: true, name: true, email: true, contact: true}})
	return supplier;
}

// Get single supplier
export async function findById(id: number){
	const supplier = await db.supplier.findUnique({where: {id: id}, select: {id: true, name: true, email: true, contact: true}})
	return supplier;
}

// Create supplier
export async function create(formData: Supplier){
	 // Check if the supplierName already exists
     const existingSupplier = await db.supplier.findUnique({
        where: {
          name: formData.name,
        },
      });
    
      if (existingSupplier) {
        // Supplier with the same name already exists
        throw new Error('O fornecedor já existe');
      }

	const supplier = await db.supplier.create({
        data: {
            name: formData.name,
            email: formData.email,
            contact: formData.contact
            }})
	return supplier;	
}

// Delete supplier
export async function destroy(id: number){
	const supplier = await db.supplier.delete({where: {id: id}})
	return supplier;
}

// update supplier
export async function updateSupplier(id: number, formData: Supplier){
	const supplier = await db.supplier.update({
		where: {id: id}, 
		data: {name: formData.name, email: formData.email, contact: formData.contact}
	})
	return supplier;
}

  
  
  