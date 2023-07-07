import { Router } from 'express'

import { getTutorials, getTutorialById, saveTutorial, updateTutorial, deleteTutorial } from '../controllers/tutorial.controller'
class TutorialRoutes {
    router = Router();
    // controller = new TutorialRoutes

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Retrieve all Tutorials
        this.router.get('/', getTutorials);
        this.router.get('/:id', getTutorialById);
        this.router.post('/', saveTutorial);
        this.router.put('/:id', updateTutorial)
        this.router.delete('/:id', deleteTutorial)
    }
}

export default new TutorialRoutes().router;