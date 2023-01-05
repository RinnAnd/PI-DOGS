const { Router } = require('express');
const {dogsID, nameOrAll, dogTemp} = require('../controllers/getDogs')
const postDog = require('../controllers/postDogs')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/dogs', nameOrAll);

router.get('/dogs/:id', dogsID);

router.get('/tempers', dogTemp);

router.post('/dogs', postDog);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
