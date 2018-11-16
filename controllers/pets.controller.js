const PetService  = require('../services/pets.service');
let petService;

module.exports = class PetsController {
    constructor(){
        petService = new PetService();
    }

    async getPets(req, res) {
        const allPets = await petService.getPets();
        res.status(200).json(allPets);
    }

    async getSinglePet(req, res) {
        const { petId } = req.params;
        const singlePet = await petService.getSinglePet(petId);

        if(singlePet) {
            res.status(200).json(singlePet);
        } else {
            res.status(204);
        }
    }

    async deleteSinglePet(req, res) {
        const { petId } = req.params;
        const deletedPet = await petService.deleteSinglePet(petId);

        if(deletedPet) {
            res.status(200).json(deletedPet);
        } else {
            res.status(400).json({error: 'Pet does not exist'})
        }
    }

    async addSinglePet(req, res) {
        const newPet = req.body;
        const serviceResponse = await petService.addSinglePet(newPet);

        res.status(201).json(serviceResponse);
    }
}