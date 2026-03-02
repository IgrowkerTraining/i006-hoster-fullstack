import type { Request, Response } from "express"
import Unit from "../models/Unit"

export class UnitController {

        static createUnit = async (req: Request ,res: Response ) => {
                const {type, amount, capacity, state, price} = req.body, unitExists = await Unit.findOne({where: {type}})
                if (unitExists) {
                    const error = new Error('Unidad ya Registrada')
                    return res.status(409).json({error: error.message})
                } 
                try { 
                    const newUnit = new Unit(req.body)
                    await newUnit.save()
                    res.json({message: 'Unidad Creada Correctamente'})
                } catch (error) {
                    console.log(error)
                    res.status(500).json({error: 'Error al crear la Unidad'})
                }
        }
}

