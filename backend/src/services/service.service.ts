import {db} from '../utiles/db.server'


type Service= {
	id: number,
    name: string,
    description: string,
    price: number
}

//   Get all service
export async function findAll(){
	const service = await db.service.findMany({select: {id: true, name: true, description: true, price: true}})
	return service;
}

// Get single service
export async function findById(id: number){
	const service = await db.service.findUnique({where: {id: id}, select: {id: true, name: true, description: true, price: true}})
	return service;
}

// Create service
export async function create(formData: Service){
	  // Check if the supplierName already exists
      const existingservice = await db.service.findUnique({
        where: {
          name: formData.name
        },
      });
    
      if (existingservice) {
        // Supplier with the same name already exists
        throw new Error('O serviço já existe');
      }

	const service = await db.service.create({
        data: {
            name: formData.name,
            description: formData.description,
            price: formData.price

            }})
	return service;	
}



// Delete service
export async function destroy(id: number){
	const service = await db.service.delete({where: {id: id}})
	return service;
}


// update service
export async function updateservice(id: number, formData: Service){
	const service = await db.service.update({
		where: {id: id}, 
		data: { name: formData.name, description: formData.description, price: formData.price}
	})
	return service;
}

  
  
  