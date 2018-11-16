const app = require('express')();
const bodyParser = require('body-parser');
const ExaminationService = require('./services/examinations.service');
const PetsControllers = require('./controllers/pets.controller');

const petsControllers = new PetsControllers();
const examinationService = new ExaminationService();



app.use(bodyParser.json());

app.get('/pets', petsControllers.getPets);
app.get('/pet/:petId', petsControllers.getSinglePet);
app.delete('/pet/:petId', petsControllers.deleteSinglePet);
app.post('/pet', petsControllers.addSinglePet);

app.get('/examinations', examinationService.getExaminations);
app.get('/examination/:examId', examinationService.getSingleExamination);
app.get('/examinations/:petId', examinationService.getExaminationsByPet);
app.delete('/examination/:examId', examinationService.deleteExamination);
app.post('/examination', examinationService.addExamination);

app.listen(3000, () => console.log('server started on 3000'));

