import express from "express";
import type { Request, Response } from "express"
import * as Sale from './sale.service'
import json from "../helper/json";
import {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization} from '../verifyToken'
// export const SaleRouter = express.Router()
export const SaleRouter = express.Router();

// List sales
SaleRouter.get("/" ,verifyTokenAndAdmin ,async (request: Request,response: Response) =>{
	try {
		const sale = await Sale.findAll();
        return response.status(200).type("json").send(json({status: 200, sale: sale}));
	} catch (error: any) {
		return response.status(500).json({status: 500, error: error.message})
	}
})

// Get single Sale
SaleRouter.get("/:id", verifyTokenAndAdmin, async (request: Request,response: Response) =>{
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
SaleRouter.post("/", verifyToken, async (request: Request,response: Response)=>{
	try {
		const sale = await Sale.create(request.body);
		if(Sale){return response.status(200).json({error:false, msg:"Nova venda registada com sucesso"});}
			
		return response.status(500).json({error:true, msg:"Operação falhou"})
		
	} catch (error: any) {
		return response.status(500).json({error:true, msg:error.message})
	}
})

// Get my Sales
SaleRouter.get("/count/:id", verifyToken, async (request: Request,response: Response)=>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const sale = await Sale.findMine(id);
		return response.status(200).type("json").send(json({error: false, count: sale}));
		
	} catch (error: any) {
		return response.status(500).json({error:true, msg:error.message})
	}
})

// Retrieve al my sales
SaleRouter.get("/today/:id", verifyToken, async (request: Request,response: Response)=>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const sale = await Sale.findTodaySales(id);
		return response.status(200).type("json").send(json({error: false, count: sale}));
		
	} catch (error: any) {
		return response.status(500).json({error:true, msg:error.message})
	}
})
// Today sales
SaleRouter.get("/all/sales", verifyTokenAndAdmin, async (request: Request,response: Response)=>{
	
	try {
		const totalAmount = await Sale.sumTodaySales();
		return response.status(200).type("json").send(json({error: false, sum: totalAmount}));
		
	} catch (error: any) {
		return response.status(500).json({error:true, msg:error.message})
	}
})

// Get cost
SaleRouter.get("/cost/get", verifyTokenAndAdmin, async (request: Request,response: Response)=>{
	
	try {
		const cost = await Sale.getCost();
		const sale = await Sale.sumTodaySales();

		return response.status(200).type("json").send(json({error: false, cost: cost, sale: sale}));
		
	} catch (error: any) {
		return response.status(500).json({error:true, msg:error.message})
	}
})

// Get sales of last 5 months
SaleRouter.get("/fivemonths/get", verifyTokenAndAdmin, async (request: Request,response: Response)=>{
	
	try {
		const sales = await Sale.getSalesOf5months();

		return response.status(200).type("json").send(json({error: false, sales: sales}));
		
	} catch (error: any) {
		return response.status(500).json({error:true, msg:error.message})
	}
})


// Delete Sale
SaleRouter.delete("/:id", verifyTokenAndAdmin, async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const sale = await Sale.destroy(id);
		return response.status(200).json({error: "false", msg: "Venda eliminada com sucesso"})
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Updade Sale
SaleRouter.put("/:id", verifyTokenAndAdmin, async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id);
	try {
		const sale = await Sale.updateSale(id, request.body);
		
		return response.json({error: false, msg: "Alterações salvas com sucesso"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})