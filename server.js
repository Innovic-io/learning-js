const app = require('express')();
const bodyParser = require('body-parser');
const ExaminationsController = require('./controllers/examinations.controller');
const PetsController = require('./controllers/pets.controller');

const petsController = new PetsController();
const examinationsController = new ExaminationsController();



app.use(bodyParser.json());

app.get('/pets', petsController.getPets);
app.get('/pet/:petId', petsController.getSinglePet);
app.delete('/pet/:petId', petsController.deleteSinglePet);
app.post('/pet', petsController.addSinglePet);

app.get('/examinations', examinationsController.getExaminations);
app.get('/examination/:examId', examinationsController.getSingleExamination);
app.get('/examinations/pet/:petId', examinationsController.getExaminationsByPet);
app.delete('/examination/:examId', examinationsController.deleteSingleExamination);
app.post('/examination', examinationsController.addSingleExamination);

app.listen(3000, () => console.log('server started on 3000'));

