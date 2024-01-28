import express from "express";
import type { Request, Response } from "express"
import * as ProductService from "./product.service"
import json from "../helper/json";
export const productRouter = express.Router();


// Create product
productRouter.post("/" ,async (request: Request,response: Response) =>{
	try {
		const product = await ProductService.createProduct(request.body);
		return response.status(200).type("json").send(json(product));
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// List product
productRouter.get("/" ,async (request: Request,response: Response) =>{
	try {
		const product = await ProductService.findAll();
		return response.status(200).type("json").send(json(product));
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Get single product
productRouter.get("/:id", async (request: Request,response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const product = await ProductService.findById(id);
		if(product){
			return response.status(200).type("json").send(json(product));
		}
		return response.status(404).json({error:true,msg: "Produto não foi encontrado!"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Get single product by barcode
productRouter.get("/barcode/:barcode", async (request: Request,response: Response) =>{
	const barcode: number = parseInt(request.params.barcode, 10);
	try {
		const product = await ProductService.findByBarcode(barcode);
		if(product){
			// return response.status(200).json(product);
			return response.status(200).type("json").send(json(product));
		}
		return response.status(404).json({error:true,msg: "Produto não foi encontrado!"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Get single product by name
productRouter.get("/name/:name", async (request: Request,response: Response) =>{
	const name: string = request.params.name;
	try {
		const product = await ProductService.findByName(name);
		if(product){
			return response.status(200).type("json").send(json(product));
		}
		return response.status(404).json({error:true,msg: "Produto não foi encontrado!"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Delete product
productRouter.delete("/:id", async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const supplier = await ProductService.destroy(id);
		return response.status(200).json({error: "false", msg: "Produto eliminado com sucesso"})
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Updade product
productRouter.put("/:id", async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id);
	try {
		const user = await ProductService.updateProduct(id, request.body);
		return response.json({error: false, msg: "Alterações feitas com sucesso"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})