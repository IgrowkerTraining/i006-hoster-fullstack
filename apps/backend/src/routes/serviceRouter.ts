import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { ServiceController } from "../controllers/ServiceController";
import { ReserveController } from "../controllers/ReserveController";

const router = Router()

router.post('/create-service',
     body('name')
        .notEmpty().withMessage('El nombre del servicio no puede estar vacio'),
     body('type')
        .notEmpty().withMessage('El tipo de servicio no puede estar vacio'),
     body('days')
        .notEmpty().withMessage('Los dias del servicio no pueden estar vacios'),
     body('price')
        .notEmpty().withMessage('El precio del servicio no puede estar vacio'),

    handleInputErrors,
    ServiceController.createService
)

router.get('/get-services',
        ServiceController.getAllServices

)

router.get('/get-service/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    ServiceController.getServiceById
)

router.put('/update-service/:id',
    param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    ServiceController.updateServiceById
)

router.delete('/delete-service/:id',
     param('id')
        .isInt().withMessage('ID debe ser un numero entero'),
    handleInputErrors,
    ServiceController.deleteServiceById
)

export default router