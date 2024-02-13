import express from "express";
import type { Request, Response } from "express"
import * as CompanyService from "./company.service"

// export const companyRouter = express.Router()
export const companyRouter = express.Router();

// List users
companyRouter.get("/" ,async (request: Request,response: Response) =>{
	try {
		const company = await CompanyService.findAll();
		return response.status(200).json(company);
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Get single company
companyRouter.get("/:id", async (request: Request,response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const company = await CompanyService.findById(id);
		if(company){
			return response.status(200).json(company);
		}
		return response.status(404).json({error:true,msg: "A empresa não foi encontrada!"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Create company
companyRouter.post("/", async (request: Request,response: Response)=>{
	try {
		const company = await CompanyService.create(request.body);
		if(company)
			return response.status(200).json({error:false, msg:"Empresa foi criada com sucesso"});
		
			return response.status(500).json({error:true, msg:"Operação falhou"})
		
	} catch (error: any) {
		return response.status(500).json({error:true, msg:error.message})
	}
})

// Delete company
companyRouter.delete("/:id", async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const company = await CompanyService.destroy(id);
		return response.status(200).json({error: "false", msg: "Empresa eliminada com sucesso"})
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Updade company
companyRouter.put("/:id", async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id);
	try {
		const company = await CompanyService.updateCompany(id, request.body);
		
		return response.json({error: false, msg: "Alterações feitas com sucesso"});
	} catch (error: any) {
		return response.status(500).json({error:true, msg:error.message})
	}
})