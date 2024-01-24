import express from "express";
import type { Request, Response } from "express"
import * as Service from "./service.service"

// export const serviceRouter = express.Router()
export const serviceRouter = express.Router();

// List users
serviceRouter.get("/" ,async (request: Request,response: Response) =>{
	try {
		const service = await Service.findAll();
		return response.status(200).json(service);
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Get single service
serviceRouter.get("/:id", async (request: Request,response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const service = await Service.findById(id);
		if(service){
			return response.status(200).json(service);
		}
		return response.status(404).json({error:true,msg: "O serviço não foi encontrado!"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Create service
serviceRouter.post("/", async (request: Request,response: Response)=>{
	try {
		const service = await Service.create(request.body);
		if(service)
			return response.status(200).json({error:false, msg:"Novo serviço foi criado com sucesso"});
		
			return response.status(500).json({error:true, msg:"Operação falhou"})
		
	} catch (error: any) {
		return response.status(500).json({error:true, msg:error.message})
	}
})

// Delete service
serviceRouter.delete("/:id", async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const service = await Service.destroy(id);
		return response.status(200).json({error: "false", msg: "Serviço eliminado com sucesso"})
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Updade service
serviceRouter.put("/:id", async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id);
	try {
		const service = await Service.updateservice(id, request.body);
		
		return response.json({error: false, msg: "Alterações feitas com sucesso"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})