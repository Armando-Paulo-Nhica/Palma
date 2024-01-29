import express from "express";
import type { Request, Response } from "express"
import * as EmployerService from "./employer.service"
import {db} from '../utiles/db.server'
import jwt from 'jsonwebtoken';
var CryptoJS = require("crypto-js");

export const employerRouter = express.Router();


// Auth
employerRouter.post("/auth" ,async (req: Request,res: Response) =>{
	try {
		const users = await EmployerService.authenticateUser(req.body.username, req.body.password);
		return res.status(200).json(users);
	} catch (error: any) {
		return res.status(500).json(error.message)
	}
})


// List employer
employerRouter.get("/" ,async (request: Request,response: Response) =>{
	try {
		const employer = await EmployerService.findAll();
		return response.status(200).json(employer);
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Get single employer
employerRouter.get("/:id", async (request: Request,response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const employer = await EmployerService.findById(id);
		if(employer){
			return response.status(200).json(employer);
		}
		return response.status(404).json({error:true,msg: "A conta não foi encontrada!"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Create employer
employerRouter.post("/", async (request: Request,response: Response)=>{
	try {
		const employer = await EmployerService.create(request.body);
		if(employer)
			return response.status(200).json({error:false, msg:"Sua conta foi criada com sucesso"});
		
			return response.status(500).json({error:true, msg:"Operação falhou"})
		
	} catch (error: any) {
		return response.status(500).json({error:true, msg:error.message})
	}
})

// Delete employer
employerRouter.delete("/:id", async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const employer = await EmployerService.destroy(id);
		return response.status(200).json({error: "false", msg: "Conta eliminada com sucesso"})
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Updade employer
employerRouter.put("/:id", async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id);
	try {
		const employer = await EmployerService.updateEmployer(id, request.body);
		
		return response.json({error: false, msg: "Alterações feitas com sucesso"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})