import type { Request, Response } from "express"
import Method from "../models/Method"

export class MethodController {

    static createMethod = async (req: Request ,res: Response ) => {
            const {name} = req.body, methodExists = await Method.findOne({where: {name}})
            if (methodExists) {
                const error = new Error('Metodo de Pago ya Registrado')
                return res.status(409).json({error: error.message})
            } 
            try { 
                const newMethod = new Method(req.body)
                await newMethod.save()
                res.json({message: 'Metodo de Pago Creado Correctamente'})
            } catch (error) {
                res.status(500).json({error: 'Error al crear el Metodo de Pago'})
            }
    }

        static getAllMethods = async (req: Request ,res: Response ) => {
            try {
                const methods = await Method.findAll()
                res.json(methods)
            } catch (error) {
                res.status(500).json({error: 'Hubo un Error'})
            }
        }

        static updateMethodById = async (req: Request ,res: Response ) => {
        const {id} = req.params
        const {name, symbol} = req.body
        try {
            const method = await Method.findByPk(id)
            if (!method) {
                const error = new Error('Metodo de Pago no encontrado')
                return res.status(404).json({error: error.message})
            }
            await method.update(req.body)
            res.json('Metodo de Pago actualizado correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
    }

    static getMethodById = async (req: Request ,res: Response ) => {
        const {id} = req.params
        try {
            const method = await Method.findByPk(id)
            if (!method) {
                const error = new Error('Metodo de Pago no encontrado')
                return res.status(404).json({error: error.message})
            }
            res.json(method)
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
    }

    static deleteMethodById = async (req: Request ,res: Response ) => {
        const {id} = req.params
        try {
            const method = await Method.findByPk(id)
            if (!method) {
                const error = new Error('Metodo de Pago no encontrado')
                return res.status(404).json({error: error.message})
            }
            await method.destroy()
            res.json('Metodo de Pago eliminado correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
    }
    
}
