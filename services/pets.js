const data = require('../data.json');
const uuid = require('uuid');
const pets = data.pets;


class PetService {
    constructor(){}


    getPets (req, res){
        res.status(200).json(pets);
    };

    getPet(req, res){
        const { petId } = req.params;
        const pet = pets.find((el) => el.id === petId);

        res.status(200).json(pet);
    }

    deletePet(req, res){
        const { petId } = req.params;
        const index = pets.findIndex((el) => el.id === petId);
        if(index > -1){
            pets.splice(index, 1);
        }

        res.status(200).json(pets);
    }

    postPet(req, res){
        const newPet = req.body;
        newPet.id = uuid();
        pets.push(newPet);
        res.status(200).json(pets);
    }
}

module.exports = PetService;