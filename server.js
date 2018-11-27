const app = require('express')();
const bodyParser = require('body-parser');
const ExaminationsController = require('./controllers/examinations.controller');
const PetsController = require('./controllers/pets.controller');
const DTO = require('./middlewares/DTO.middleware');
const TypeTransformer = require('./middlewares/TypeTransformer')

const petsController = new PetsController();
const examinationsController = new ExaminationsController();

app.use(bodyParser.json());

app.get('/pets', petsController.getPets);
app.get('/pet/:petId', petsController.getSinglePet);
app.delete('/pet/:petId', petsController.deleteSinglePet);
app.put('/pet/:petId', DTO, TypeTransformer, petsController.updateSinglePet);
app.post('/pet', DTO, TypeTransformer, petsController.addSinglePet);


app.get('/examinations', examinationsController.getExaminations);
app.get('/examination/:examId', examinationsController.getSingleExamination);
app.put('/examination/:examId', DTO, TypeTransformer, examinationsController.updateSingleExamination);
app.delete('/examination/:examId', examinationsController.deleteSingleExamination);
app.get('/examinations/pet/:petId', examinationsController.getExaminationsByPet);
app.post('/examination', DTO, TypeTransformer, examinationsController.addSingleExamination);

if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, () => console.log('server started on 3000'));
}
module.exports = app
