import express from "express";
import type { Request, Response } from "express"
import * as CategoryService from "./category.service"

// export const categoryRouter = express.Router()
export const categoryRouter = express.Router();

// List users
categoryRouter.get("/" ,async (request: Request,response: Response) =>{
	try {
		const category = await CategoryService.findAll();
		return response.status(200).json(category);
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Get single Category
categoryRouter.get("/:id", async (request: Request,response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const category = await CategoryService.findById(id);
		if(category){
			return response.status(200).json(category);
		}
		return response.status(404).json({error:true,msg: "A categoria não foi encontrada!"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Create Category
categoryRouter.post("/", async (request: Request,response: Response)=>{
	try {
		const category = await CategoryService.create(request.body);
		if(category)
			return response.status(200).json({error:false, msg:"Nova categoria foi criada com sucesso"});
		
			return response.status(500).json({error:true, msg:"Operação falhou"})
		
	} catch (error: any) {
		return response.status(500).json({error:true, msg:error.message})
	}
})

// Delete Category
categoryRouter.delete("/:id", async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const category = await CategoryService.destroy(id);
		return response.status(200).json({error: "false", msg: "Categoria eliminada com sucesso"})
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Updade Category
categoryRouter.put("/:id", async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id);
	try {
		const category = await CategoryService.updateCategory(id, request.body);
		
		return response.json({error: false, msg: "Alterações feitas com sucesso"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})