import type { Request, Response } from "express"
import Service from "../models/Service"

export class ServiceController {

        static createService = async (req: Request ,res: Response ) => {
                const {name} = req.body, serviceExists = await Service.findOne({where: {name}})
                if (serviceExists) {
                    const error = new Error('Servicio ya Registrado')
                    return res.status(409).json({error: error.message})
                } 
                try { 
                    const newService = new Service(req.body)
                    await newService.save()
                    res.json({message: 'Servicio Creado Correctamente'})
                } catch (error) {
                    console.log(error)
                    res.status(500).json({error: 'Error al crear el Servicio'})
                }
        }

        static getAllServices = async (req: Request ,res: Response ) => {
            try {
                const services = await Service.findAll()
                res.json(services)
            } catch (error) {
                res.status(500).json({error: 'Hubo un Error'})
            }
        }

        static updateServiceById = async (req: Request ,res: Response ) => {
            const {id} = req.params
            try {
                const service = await Service.findByPk(id)
                if (!service) {
                    const error = new Error('Servicio no Encontrado')
                    return res.status(404).json({error: error.message})
                }
                await service.update(req.body)
                res.json({message: 'Servicio Actualizado Correctamente'})
            } catch (error) {
                res.status(500).json({error: 'Error al actualizar el Servicio'})
        
            }
    }
        static getServiceById = async (req: Request ,res: Response ) => {
            const {id} = req.params
            try {
                const service = await Service.findByPk(id)
                if (!service) {
                    const error = new Error('Servicio no Encontrado')
                    return res.status(404).json({error: error.message})
                }
                res.json(service)
            } catch (error) {
                res.status(500).json({error: 'Error al obtener el Servicio'})
            }
        
        }
    
         static deleteServiceById = async (req: Request ,res: Response ) => {
            const {id} = req.params
            try {
                const service = await Service.findByPk(id)
                if (!service) {
                    const error = new Error('Servicio no encontrado')
                    return res.status(404).json({error: error.message})
                }
                await service.destroy()
                res.json('Servicio eliminado correctamente')
            } catch (error) {
                res.status(500).json({error: 'Hubo un Error'})
            }
        }    
}