import {db} from '../utiles/db.server'


type Company= {
	id: number,
    name: string,
    city: string,
    contact: string,
    email: string,
    zone: string
}

//   Get all company
export async function findAll(){
	const company = await db.company.findMany({select: {id: true, name: true, city: true, contact: true, email: true, zone: true}})
	return company;
}

// Get single company
export async function findById(id: number){
	const company = await db.company.findUnique({where: {id: id}, select: {id: true, name: true, city: true, contact: true, email: true, zone: true}})
	return company;
}

// Create company
export async function create(formData: Company){
	  //Check if the supplierName already exists
      const existingcompany = await db.company.findUnique({
        where: {
          name: formData.name
        },
      });
    
      if (existingcompany) {
        // Supplier with the same name already exists
        throw new Error('A empresa já existe');
      }

	const company = await db.company.create({
        data: {name: formData.name, city: formData.city, contact: formData.contact, email: formData.email, zone: formData.zone}})
	return company;	
}



// Delete company
export async function destroy(id: number){
	const company = await db.company.delete({where: {id: id}})
	return company;
}


// update company
export async function updateCompany(id: number, formData: Company){
	const company = await db.company.update({
		where: {id: id}, 
		data: {name: formData.name, city: formData.city, contact: formData.contact, email: formData.email, zone: formData.zone}
	})
	return company;
}

  
  
  