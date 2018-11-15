const data = require('../data.json');
const examinations = data.examinations;
const pets = data.pets;

class ExaminationService{
    constructor(){}

    getExaminations(req, res) {
        res.status(200).json(examinations);
    };

    getExamination(req, res){
       const { examId } = req.params;
       const exam = examinations.find((el) => el.id === examId);
       const pet = pets.find((el) => el.id === exam.petId);
       const examPet = {
           id: exam.id,
           petName: pet.name,
           description: exam.description,
           scheduleTime: exam.scheduleTime
       }

       res.status(200).json(examPet);
    }
}

module.exports = ExaminationService;