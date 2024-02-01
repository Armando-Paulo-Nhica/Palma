import express from "express";
import { Request, Response, NextFunction } from 'express';
import * as customerService from "./customer.service"

export const customerRouter = express.Router();


// List users
customerRouter.get("/", async (request: Request, response: Response) => {
	try {
	  const categories = await customerService.findAll();
	  return response.status(200).json(categories);
	} catch (error: any) {
	  return response.status(500).json({ error: true, message: error.message });
	}
  });


// Get single Category
customerRouter.get("/:id", async (request: Request,response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const category = await customerService.findById(id);
		if(category){
			return response.status(200).json(category);
		}
		return response.status(404).json({error:true,msg: "O cliente não foi encontrado!"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Create Category
customerRouter.post("/", async (request: Request,response: Response)=>{
	try {
		const category = await customerService.create(request.body);
		if(category)
			return response.status(200).json({error:false, msg:"Cliente criado com sucesso"});
		
			return response.status(500).json({error:true, msg:"Operação falhou"})
		
	} catch (error: any) {
		return response.status(500).json({error:true, msg:error.message})
	}
})

// Delete Category
customerRouter.delete("/:id", async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const category = await customerService.destroy(id);
		return response.status(200).json({error: "false", msg: "Cliente eliminado com sucesso"})
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Updade Category
customerRouter.put("/:id", async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id);
	try {
		const category = await customerService.updatecustomer(id, request.body);
		
		return response.json({error: false, msg: "Alterações feitas com sucesso"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})
