import express from "express";
import type { Request, Response } from "express"
import * as SupplierService from "./supplier.service"

// export const supplierRouter = express.Router()
export const supplierRouter = express.Router();

// List users
supplierRouter.get("/" ,async (request: Request,response: Response) =>{
	try {
		const supplier = await SupplierService.findAll();
		return response.status(200).json(supplier);
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Get single supplier
supplierRouter.get("/:id", async (request: Request,response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const supplier = await SupplierService.findById(id);
		if(supplier){
			return response.status(200).json(supplier);
		}
		return response.status(404).json({error:true,msg: "Fornecedor não foi encontrado!"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Create supplier
supplierRouter.post("/", async (request: Request,response: Response)=>{
	try {
		const supplier = await SupplierService.create(request.body);
		if(supplier)
			return response.status(200).json({error:false, msg:"Novo fornecedor foi adicionado com sucesso"});
		
			return response.status(500).json({error:true, msg:"Operação falhou"})
		
	} catch (error: any) {
		return response.status(500).json({error:true, msg:error.message})
	}
})

// Delete supplier
supplierRouter.delete("/:id", async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const supplier = await SupplierService.destroy(id);
		return response.status(200).json({error: "false", msg: "Fornecedor eliminada com sucesso"})
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Updade supplier
supplierRouter.put("/:id", async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id);
	try {
		const supplier = await SupplierService.updateSupplier(id, request.body);
		return response.json({error: false, msg: "Alterações feitas com sucesso"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})