const app = require('express')();
const bodyParser = require('body-parser');
const LoginController = require('./src/controllers/login.controller');
const ExaminationsController = require('./src/controllers/examinations.controller');
const PetsController = require('./src/controllers/pets.controller');
const DTO = require('./src/middlewares/DTO.middleware');
const TypeTransformer = require('./src/middlewares/TypeTransformer');

const petsController = new PetsController();
const examinationsController = new ExaminationsController();
const loginController = new LoginController();


app.use(bodyParser.json());

app.post('/login', loginController.getToken);

app.get('/pets', loginController.decodeToken, petsController.getPets);
app.get('/pet/:petId', loginController.decodeToken, petsController.getSinglePet);
app.delete('/pet/:petId', loginController.decodeToken, petsController.deleteSinglePet);
app.put('/pet/:petId', loginController.decodeToken, DTO, TypeTransformer, petsController.updateSinglePet);
app.post('/pet', loginController.decodeToken, DTO, TypeTransformer, petsController.addSinglePet);

app.get('/examinations', loginController.decodeToken, examinationsController.getExaminations);
app.get('/examination/:examId', loginController.decodeToken, examinationsController.getSingleExamination);
app.put('/examination/:examId', loginController.decodeToken, DTO, TypeTransformer, examinationsController.updateSingleExamination);
app.delete('/examination/:examId', loginController.decodeToken, examinationsController.deleteSingleExamination);
app.get('/examinations/pet/:petId', loginController.decodeToken, examinationsController.getExaminationsByPet);
app.post('/examination', loginController.decodeToken, DTO, TypeTransformer, examinationsController.addSingleExamination);

if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, () => console.log('server started on 3000'));
}
module.exports = app
