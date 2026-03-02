import type { Request, Response } from "express"
import Currency from "../models/Currency"

export class CurrencyController {

    static createCurrency = async (req: Request ,res: Response ) => {
            const {name, symbol} = req.body
    
            //prevenir duplicados
            const currencyExists = await Currency.findOne({where: {name}})
            if (currencyExists) {
                const error = new Error('Moneda ya Registrada')
                return res.status(409).json({error: error.message})
            }
            try {
                const currency = new Currency(req.body)
                await currency.save()
                res.json('Moneda creada Correctamente')

            } catch (error) {
                //console.log(error)
                res.status(500).json({error: 'Hubo un Error'})
            }
    }

    static getAllCurrency = async (req: Request ,res: Response ) => {
        try {
            const currencies = await Currency.findAll()
            res.json(currencies)
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
    }

    static updateCurrencyById = async (req: Request ,res: Response ) => {
        const {id} = req.params
        const {name, symbol} = req.body
        try {
            const currency = await Currency.findByPk(id)
            if (!currency) {
                const error = new Error('Moneda no encontrada')
                return res.status(404).json({error: error.message})
            }
            await currency.update(req.body)
            res.json('Moneda actualizada correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
    }

    static getCurrencyById = async (req: Request ,res: Response ) => {
        const {id} = req.params
        try {
            const currency = await Currency.findByPk(id)
            if (!currency) {
                const error = new Error('Moneda no encontrada')
                return res.status(404).json({error: error.message})
            }
            res.json(currency)
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
    }

    static deleteCurrencyById = async (req: Request ,res: Response ) => {
        const {id} = req.params
        try {
            const currency = await Currency.findByPk(id)
            if (!currency) {
                const error = new Error('Moneda no encontrada')
                return res.status(404).json({error: error.message})
            }
            await currency.destroy()
            res.json('Moneda eliminada correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
    }
}