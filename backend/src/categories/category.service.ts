import {db} from '../utiles/db.server'


type Category= {
	id: number,
    name: string,
}

//   Get all categories
export async function findAll(){
	const categories = await db.category.findMany({select: {id: true, name: true}})
	return categories;
}

// Get single category
export async function findById(id: number){
	const category = await db.category.findUnique({where: {id: id}, select: {id: true, name: true}})
	return category;
}

// Create category
export async function create(formData: Category){
	  // Check if the supplierName already exists
      const existingCategory = await db.category.findUnique({
        where: {
          name: formData.name
        },
      });
    
      if (existingCategory) {
        // Supplier with the same name already exists
        throw new Error('A categoria já existe');
      }

	const category = await db.category.create({
        data: {
            name: formData.name
            }})
	return category;	
}



// Delete category
export async function destroy(id: number){
	const category = await db.category.delete({where: {id: id}})
	return category;
}


// update user
export async function updateCategory(id: number, formData: Category){
	const category = await db.category.update({
		where: {id: id}, 
		data: {name: formData.name}
	})
	return category;
}

  
  
  