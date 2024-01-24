import express from "express";
import type { Request, Response } from "express"
import * as Sale from './sale.service'
import json from "../helper/json";

// export const SaleRouter = express.Router()
export const SaleRouter = express.Router();

// List users
SaleRouter.get("/" ,async (request: Request,response: Response) =>{
	try {
		const sale = await Sale.findAll();
        return response.status(200).type("json").send(json(sale));
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Get single Sale
SaleRouter.get("/:id", async (request: Request,response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const sale = await Sale.findById(id);
		if(Sale){
			return response.status(200).type("json").send(json(sale));
		}
		return response.status(404).json({error:true,msg: "A venda não foi encontrada!"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Create Sale
SaleRouter.post("/", async (request: Request,response: Response)=>{
	try {
		const sale = await Sale.create(request.body);
		if(Sale){return response.status(200).json({error:false, msg:"Nova venda registada com sucesso"});}
			
		return response.status(500).json({error:true, msg:"Operação falhou"})
		
	} catch (error: any) {
		return response.status(500).json({error:true, msg:error.message})
	}
})

// Delete Sale
SaleRouter.delete("/:id", async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const sale = await Sale.destroy(id);
		return response.status(200).json({error: "false", msg: "Venda eliminada com sucesso"})
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Updade Sale
SaleRouter.put("/:id", async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id);
	try {
		const sale = await Sale.updateSale(id, request.body);
		
		return response.json({error: false, msg: "Alterações salvas com sucesso"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})