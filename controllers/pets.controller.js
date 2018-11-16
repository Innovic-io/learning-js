const PetService  = require('../services/pets.service');
let petService;

module.exports = class PetsControllers{
    constructor(){
        petService = new PetService();
    }

    getPets(req, res) {
        const allPets = petService.getPets();
        res.status(200).json(allPets);
    }

    getSinglePet(req, res) {
        const { petId } = req.params;
        const singlePet = petService.getSinglePet(petId);

        if(singlePet) {
            res.status(200).json(singlePet);
        } else {
            res.status(204);
        }
    }

    deleteSinglePet(req, res) {
        const { petId } = req.params;
        const deletedPet = petService.deleteSinglePet(petId);

        if(deletedPet) {
            res.status(200).json(deletedPet);
        } else {
            res.status(400).json({error: 'Pet does not exist'})
        }
    }

    addSinglePet(req, res) {
        const newPet = req.body;
        const serviceResponse = petService.addSinglePet(newPet);

        res.status(201).json(serviceResponse);
    }
}