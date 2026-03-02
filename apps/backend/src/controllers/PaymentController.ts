import type { Request, Response } from "express"
import Payment from "../models/Payment"

export class PaymentController {

    static createPayment = async (req: Request ,res: Response ) => {
            const {date} = req.body, paymentExists = await Payment.findOne({where: {date}})
            if (paymentExists) {
                const error = new Error('Pago ya Registrado')
                return res.status(409).json({error: error.message})
            } 
            try { 
                const newPayment = new Payment(req.body)
                newPayment.totalAmount = 0 //modificar para que sea el monto parcial multiplicado por las noches reservadas
                await newPayment.save()
                res.json({message: 'Pago Creado Correctamente'})
            } catch (error) {
                console.log(error)
                res.status(500).json({error: 'Error al crear el Pago'})
            }
    }

        static getAllPayments = async (req: Request ,res: Response ) => {
            try {
                const payments = await Payment.findAll()
                res.json(payments)
            } catch (error) {
                res.status(500).json({error: 'Hubo un Error'})
            }
        }

        static updatePaymentById = async (req: Request ,res: Response ) => {
        const {id} = req.params
        const {name, symbol} = req.body
        try {
            const payment = await Payment.findByPk(id)
            if (!payment) {
                const error = new Error('Pago no encontrado')
                return res.status(404).json({error: error.message})
            }
            payment.date = req.body.date ? new Date(req.body.date) : payment.date
            await payment.update(req.body)
            res.json('Pago actualizado correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
    }

    static getPaymentById = async (req: Request ,res: Response ) => {
        const {id} = req.params
        try {
            const payment = await Payment.findByPk(id)
            if (!payment) {
                const error = new Error('Pago no encontrado')
                return res.status(404).json({error: error.message})
            }
            res.json(payment)
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
    }

    static deletePaymentById = async (req: Request ,res: Response ) => {
        const {id} = req.params
        try {
            const payment = await Payment.findByPk(id)
            if (!payment) {
                const error = new Error('Pago no encontrado')
                return res.status(404).json({error: error.message})
            }
            await payment.destroy()
            res.json('Pago eliminado correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un Error'})
        }
    }
    
}
