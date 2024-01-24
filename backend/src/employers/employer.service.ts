import {db} from '../utiles/db.server'


type Employer= {
	id: number,
    email: string,
    fullname: string,
    username: string,
    password: string,
    isAdmin: boolean,
    status: string
}

//   Get all employer
export async function findAll(){
	const employer = await db.employer.findMany({
        select: {
            id: true, 
            fullname: true, 
            email: true,
            username: true,
            isAdmin: true,
            status: true
        }})
	return employer;
}

// Get single employer
export async function findById(id: number){
	const employer = await db.employer.findUnique({where: {id: id}, select: {
        id: true, 
        fullname: true, 
        email: true,
        username: true,
        isAdmin: true,
        status: true
    }})
	return employer;
}

// Create employer
export async function create(formData: Employer){
	  // Check if the supplierName already exists
      const existingemployer = await db.employer.findUnique({
        where: {
          fullname: formData.fullname,
        },
      });
    
      if (existingemployer) {
        // Supplier with the same name already exists
        throw new Error('A conta já existe');
      }

	const employer = await db.employer.create({
        data: {
            fullname: formData.fullname, 
            email: formData.email,
            password: formData.password,
            username: formData.username,
            isAdmin: formData.isAdmin,
            status: formData.status
            }})
	return employer;	
}



// Delete employer
export async function destroy(id: number){
	const employer = await db.employer.delete({where: {id: id}})
	return employer;
}


// update user
export async function updateEmployer(id: number, formData: Employer){
	const employer = await db.employer.update({
		where: {id: id}, 
		data: {
            fullname: formData.fullname, 
            email: formData.email,
            username: formData.username,
            isAdmin: formData.isAdmin,
            status: formData.status
        }
	})
	return employer;
}

  
  
  