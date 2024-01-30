import {db} from '../utiles/db.server'
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
const SECRET: number = parseInt('hsI89nDq32nsk' as string, 10);

type Employer= {
	id: number,
    email: string,
    fullname: string,
    username: string,
    password: string,
    isAdmin: boolean,
    isActive: boolean 
}


export const authenticateUser = async (username: string, password: string) =>{
    // Check if the user exists in the database
    const user = await db.employer.findUnique({
      where: { username: username },
      select: { id: true, isAdmin: true, password: true }
    });
    
    
    if (!user) {
      throw new Error('Invalid username or password');
    }
    
    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      throw new Error('Invalid username or password');
    }
    
    // Create a JWT
    const token = jwt.sign({ userId: user.id }, SECRET.toString(),{expiresIn: "1h"});
    
    return token;
  };

//   Get all employer
export async function findAll(){
	const employer = await db.employer.findMany({
        select: {
            id: true, 
            fullname: true, 
            email: true,
            username: true,
            isAdmin: true,
            isActive: true
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
        isActive: true
    }})
	return employer;
}

// Create employer
export async function create(formData: Employer){
	  // Check if the supplierName already exists
      const user = await db.employer.findUnique({
        where: {
          fullname: formData.fullname,
        },
      });
    
      if (user) {
        throw new Error('A conta já existe');
      }
      const hashedPassword = await hash(formData.password, 4);
	const employer = await db.employer.create({
        data: {
            fullname: formData.fullname, 
            email: formData.email,
            password: hashedPassword,
            username: formData.username,
            isAdmin: formData.isAdmin,
            isActive: formData.isActive
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
            isActive: formData.isActive
        }
	})
	return employer;
}

  
  
  