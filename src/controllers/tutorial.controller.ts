import express, { Request, Response } from 'express'
import { Tutorial } from '../models/TutorialModel'
import Sequelize from 'sequelize'

export const getTutorials = async (req: Request, res: Response) => {
  try {
    const AllTutorials: Tutorial[] = await Tutorial.findAll()
    return res.status(200).json({
      message: 'Success request data',
      result: AllTutorials
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export const saveTutorial = async (req: Request, res: Response) => {
  try {
    const tutorial: Tutorial = await Tutorial.create({
      ...req.body
    })

    return res.status(201).json({
      msg: 'Tutorial created successfully',
      result: tutorial
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error!'
    })
  }
}

export const getTutorialById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const tutorial: Tutorial | null = await Tutorial.findByPk(id)
    return res.status(200).json(tutorial)
  } catch (error) {
    res.json({
      message: 'Error to get id'
    })
  }
}

export const updateTutorial = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await Tutorial.update({ ...req.body }, { where: { id } })
    const updateTutorial: Tutorial | null = await Tutorial.findByPk(id)
    return res.status(200).json(updateTutorial)
  } catch (error) {
    res.json({
      message: 'Error update tutorial'
    })
  }
}

export const deleteTutorial = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleteTutorial: Tutorial | null = await Tutorial.findByPk(id);
        await Tutorial.destroy({ where: { id } });

        return res.status(200).json({
            message: 'Tutorial successful deleted!',
            result: deleteTutorial
        })
    } catch (error) {
        res.json({
            message: 'Error delete tutorial!'
        })
    }
}