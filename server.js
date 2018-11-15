const app = require('express')();
const bodyParser = require('body-parser');
const PetService  = require('./services/pets');
const ExaminationService = require('./services/examinations');

const petService = new PetService();
const examinationService = new ExaminationService();



app.use(bodyParser.json());

app.get('/pets', petService.getPets);
app.get('/pet/:petId', petService.getPet);
app.delete('/pet/:petId', petService.deletePet);
app.post('/pet', petService.postPet);

app.get('/examinations', examinationService.getExaminations);
app.get('/examination/:examId', examinationService.getExamination);
app.get('/examinations/:petId', examinationService.getPetExaminations);
app.delete('/examination/:examId', examinationService.deleteExamination);
app.post('/examination', examinationService.postExamination);



app.listen(3000, () => console.log('server started on 3000'));
