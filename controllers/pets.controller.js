const PetService  = require('../services/pets.service');
const { PET_EXIST_ERROR }= require("../helpers/constants");

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
        const singlePet = await petService.getSinglePet(req.params.petId);

        if(singlePet) {
            res.status(200).json(singlePet);
        } else {
            res.status(204).json(singlePet);
        }
    }

    async deleteSinglePet(req, res) {
        const deletedPet = await petService.deleteSinglePet(req.params.petId);

        if(deletedPet) {
            res.status(200).json(deletedPet);
        } else {
            res.status(400).json(PET_EXIST_ERROR)
        }
    }

    async addSinglePet(req, res) {
        const serviceResponse = await petService.addSinglePet(req.body);
        if(serviceResponse) {
            res.status(201).json(serviceResponse);
        }
    }

    async updateSinglePet(req, res) {
        const serviceResponse = await petService.updateSinglePet(req.params.petId, req.body);

        res.status(201).json(serviceResponse);
    }
};