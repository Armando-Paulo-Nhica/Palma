import {db} from '../utiles/db.server'
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
const SECRET: number = parseInt('hsI89nDq32nsk' as string, 10);

type User= {
	id: number,
  email: string,
  fullname: string,
  username: string,
  password: string,
  isAdmin: boolean,
  isActive: boolean 
}

type Profile ={
  id: number,
  username: string,
  password: string
}


export const authenticateUser = async (username: string, password: string) =>{
    // Check if the user exists in the database
    const user = await db.user.findUnique({
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
    const token = jwt.sign({ user: user }, SECRET.toString(),{expiresIn: "8h"});
    
    return token;
  };

//   Get all user
export async function findAll(){
	const user = await db.user.findMany({
        select: {
            id: true, 
            fullname: true, 
            email: true,
            username: true,
            isAdmin: true,
            isActive: true
        }})
	return user;
}

// Get single user
export async function findById(id: number){
	const user = await db.user.findUnique({where: {id: id}, select: {
        id: true, 
        fullname: true, 
        email: true,
        username: true,
        isAdmin: true,
        isActive: true
    }})
	return user;
}

// Create user
export async function create(formData: User){
	  // Check if the supplierName already exists
      const userData = await db.user.findUnique({
        where: {
          fullname: formData.fullname,
        },
      });
    
      if (userData) {
        throw new Error('A conta já existe');
      }
      const hashedPassword = await hash(formData.password, 4);
	const user = await db.user.create({
        data: {
            fullname: formData.fullname, 
            email: formData.email,
            password: hashedPassword,
            username: formData.username,
            isAdmin: formData.isAdmin,
            isActive: formData.isActive
            }})
	return user;	
}



// Delete user
export async function destroy(id: number){
	const user = await db.user.delete({where: {id: id}})
	return user;
}


// update user
export async function updateUser(id: number, formData: User){
  
	const user = await db.user.update({
		where: {id: id}, 
		data: {
            fullname: formData.fullname, 
            email: formData.email,
            username: formData.username
        }
	})
	return user;
}

export async function updateUserRole(id: number, isAdmin: boolean, isActive: boolean ){
  
	const user = await db.user.update({
		where: {id: id}, 
		data: {
            isAdmin: isAdmin,
            isActive: isActive
        }
	})
	return user;
}

export async function updateUserPassword(data: Profile) {
  try {
    // Hash the new password with 10 salt rounds
    const hashedPassword = await hash(data.password, 10);

    // Update the user's password in the database
    const updatedUser = await db.user.update({
      where: { id: data.id, username: data.username },
      data: {
        password: hashedPassword
      }
    });

    return true;
  } catch (error) {
    return false;
  }
}


  
  
  