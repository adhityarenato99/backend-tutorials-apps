import express, { Request, Response } from 'express'
import { Tutorial } from '../models/TutorialModel'
import Sequelize from 'sequelize'
import { Op } from 'sequelize'

// interface Query {
//   page: string;
//   limit: string;
//   search: string;
//   offset: string;
//   totalRows: string;
//   totalPage: string
// }

export const getTutorials = async (req: Request, res: Response) => {
  const { query } = req

  const page: any = parseInt(req.query.page as any) || 0
  // console.log(`page : ` + page)
  const limit: any = parseInt(req.query.limit as any) || 0
  // console.log(`limits : ` + limit)
  const search =
    typeof query.search_query === 'string' ? query.search_query : ''
  // console.log(`search : ` + search)
  const offset: number = limit * page
  // console.log(`offset : ` + offset)

  const totalRows: number = await Tutorial.count({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: '%' + search + '%'
          },
          description: {
            [Op.like]: '%' + search + '%'
          }
        }
      ]
    }
  })

  // console.log(`total rows : ` + totalRows)

  const totalPage: number = Math.ceil(totalRows / limit)

  // console.log(`total page : ` + totalPage)

  try {
    const AllTutorials: Tutorial[] = await Tutorial.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: '%' + search + '%'
            },
            description: {
              [Op.like]: '%' + search + '%'
            }
          }
        ]
      },
      offset: offset,
      limit: limit,
      order: [['id', 'DESC']]
    })
    // console.log(AllTutorials);

    res.status(200).json({
      message: 'success',
      result: AllTutorials,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage
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
  const { id } = req.params
  try {
    const deleteTutorial: Tutorial | null = await Tutorial.findByPk(id)
    await Tutorial.destroy({ where: { id } })

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
