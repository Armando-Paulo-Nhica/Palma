import {db} from '../utiles/db.server'
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { hash, compare } = bcrypt;
const SECRET: number = parseInt(process.env.JWT_SECRET as string, 10);

type Employer= {
	id: number,
    email: string,
    fullname: string,
    username: string,
    password: string,
    isAdmin: boolean,
    status: string
}


// Authentication

export const authenticateUser = async (username: string, password: string) => {
	// Check if the user exists in the database
	const user = await db.employer.findUnique({ where: { email:username } });
  
	if (!user) {
	  throw new Error('Credenciais inválidas');
	}
  
	// Verify the password
	const passwordMatch = await bcrypt.compare(password, user.password);
  
	if (!passwordMatch) {
	  throw new Error('Credenciais inválidas');
	}
  
	// Create a JWT
	const token = jwt.sign({ userId: user.id, fullName: user.fullname, isAdmin: user.isAdmin }, SECRET.toString(),{expiresIn: "1h"});
  
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
      const hashedPassword = await bcrypt.hash(formData.password, 4);
	const employer = await db.employer.create({
        data: {
            fullname: formData.fullname, 
            email: formData.email,
            password: hashedPassword,
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

  
  
  