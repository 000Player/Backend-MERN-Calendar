/*
    Event Routes
    /api/events
*/ 
const { Router } = require('express');
const { check } = require('express-validator');
const { 
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento 
    } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();

// Validación del JWT en todas las rutas de abajo
router.use( validarJWT );

// Obtener eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post(
    '/new',
    [ // Middlewares
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
 );

// Actualizar evento
router.put('/update/:id', actualizarEvento);

// Borrar evento
router.delete('/delete/:id', eliminarEvento);

module.exports = router;