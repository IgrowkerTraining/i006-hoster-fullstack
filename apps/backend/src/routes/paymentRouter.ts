import { Router } from "express";
import { body, param } from "express-validator";
import { CurrencyController } from "../controllers/CurrencyController";
import { MethodController } from "../controllers/MethodController";
import { PaymentController } from "../controllers/PaymentController";
import { handleInputErrors } from "../middleware/validation";

const router = Router()


// Rutas para Currency

router.get('/getAll-currency',
    CurrencyController.getAllCurrency
)

router.get('/get-currency/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    CurrencyController.getCurrencyById
)

router.post('/create-currency', 
    body('name')
        .notEmpty().withMessage('El Nombre no puede ir vacio'),
    body('symbol')
        .notEmpty().withMessage('El simbolo es obligatorio'),    
    handleInputErrors,
    CurrencyController.createCurrency
)

router.put('/update-currency/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    CurrencyController.updateCurrencyById
)

router.delete('/delete-currency/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    CurrencyController.deleteCurrencyById
)



// Rutas para Payment

router.post('/create-payment',
     body('date')
        .notEmpty().withMessage('La Fecha no puede estar vacia'),
    
    handleInputErrors,
    PaymentController.createPayment
)
router.get('/get-payment',
        PaymentController.getAllPayments

)

router.get('/get-payment/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    PaymentController.getPaymentById
)

router.put('/update-payment/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    PaymentController.updatePaymentById
)
router.delete('/delete-payment/:id',
     param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    PaymentController.deletePaymentById
)



// Rutas para Method
router.get('/getAll-method',
    MethodController.getAllMethods
)

router.get('/get-method/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    MethodController.getMethodById
)

router.post('/create-method', 
    body('name')
        .notEmpty().withMessage('El Nombre no puede ir vacio'),
    body('symbol')
        .notEmpty().withMessage('El simbolo es obligatorio'),    
    handleInputErrors,
    MethodController.createMethod
)

router.put('/update-method/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    MethodController.updateMethodById
)

router.delete('/delete-method/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    MethodController.deleteMethodById
)
export default router