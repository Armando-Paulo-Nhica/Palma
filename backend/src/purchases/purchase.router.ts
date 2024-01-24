import express from "express";
import type { Request, Response } from "express"
import * as PurchaseService from "./purchase.service"
import json from "../helper/json";

export const purchaseRouter = express.Router();

// Create purchase
purchaseRouter.post("/", async (request: Request,response: Response)=>{
	try {
		const purchase = await PurchaseService.create(request.body);
		if(purchase){
			return response.status(200).json({error:false, msg:"Novo produto foi adicionado com sucesso"});
		}
		else
		{
			return response.status(500).json({error:true, msg:"Operação falhou"});
		}
		
	} catch (error: any) {
		return response.status(500).json({error:true, msg:error.message})
	}
})

// List purchase
purchaseRouter.get("/" ,async (request: Request,response: Response) =>{
	try {
		const purchase = await PurchaseService.findAll();
		// return response.status(200).json(purchase);
		return response.status(200).type("json").send(json(purchase));
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Get single purchase
purchaseRouter.get("/:id", async (request: Request,response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const purchase = await PurchaseService.findById(id);
		if(purchase){
			// return response.status(200).json(purchase);
			return response.status(200).type("json").send(json(purchase));
			purchase
		}
		return response.status(404).json({error:true,msg: "A compra não foi encontrada!"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})



// Delete purchase
purchaseRouter.delete("/:id", async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const purchase = await PurchaseService.destroy(id);
		return response.status(200).json({error: "false", msg: "Compra eliminada com sucesso"})
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Updade purchase
purchaseRouter.put("/:id", async(request: Request, response: Response) =>{
	
	const id: number = parseInt(request.params.id);
	
	try {
		const purch = await PurchaseService.updatePurchase(request.body, id);
		return response.status(200).json({error: false, msg: "Alterações feitas com sucesso"});
		
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})