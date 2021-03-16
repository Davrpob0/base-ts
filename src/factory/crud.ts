import { Request, Response, NextFunction } from 'express'
import handleError from '../middlewares/ErrorHandler.middleware'
import { IService } from '../services/MainService'

export interface ICrudFactory {
  getAll (req: Request, res: Response, next: NextFunction): any
  create (req: Request, res: Response, next: NextFunction): any
  createMany (req: Request, res: Response, next: NextFunction): any
  createMany (req: Request, res: Response, next: NextFunction): any
  detail (req: Request, res: Response, next: NextFunction): any
  update (req: Request, res: Response, next: NextFunction): any
  inactivate (req: Request, res: Response, next: NextFunction): any
  delete (req: Request, res: Response, next: NextFunction): any
}

export default class CrudFactory {
  public path: string
  public service: IService

  constructor (path: string, service: IService) {
    this.path = path
    this.service = service
  }

  getEndpoints (): ICrudFactory {
    const service = this.service
    const path = this.path

    return {
      /**
       * GetAll
       * @param {*} req
       * @param {*} res
       * @param {*} next
       */
      async getAll(req: any, res: any, next: NextFunction) {
        try {
          const { query, cursor, select } = req.querymen
          
          const data = await service.getAll(query, select, cursor)

          res.status(200).json({
            payload: data.result,
            total: data.count
          })
        } catch (error) {
          handleError(error, next)
        }
      },

      /**
       * Create
       * @param {*} req
       * @param {*} res
       * @param {*} next
       * 
       * @method GET
       */
      async create (req: Request, res: any, next: NextFunction) {
        try {
          const { body } = req
          const saved = await service.create(body)
          res.status(201).json({
            payload: saved
          })
        } catch (error) {
          handleError(error, next)
        }
      },

      /**
       * Create Many
       * @param {*} req
       * @param {*} res
       * @param {*} next
       */
      async createMany (req: Request, res: any, next: NextFunction) {
        try {
          const { body } = req
          const result = await service.createMany(body[path])
          res.status(201).json({
            message: result.ok
          })
        } catch (error) {
          handleError(error, next)
        }
      },

      /**
       * Detail
       * @param {*} req
       * @param {*} res
       * @param {*} next
       */
      async detail (req: any, res: any, next: NextFunction) {
        try {
          const { params, querymen } = req
          const routine = await service.detail({
            id: params.key
          }, querymen.select)
          if (routine) {
            res.status(200).json({
              payload: routine
            })
          } else {
            handleError({
              code: 404
            }, next)
          }
        } catch (error) {
          handleError(error, next)
        }
      },

      /**
       * Update
       * @param {*} req
       * @param {*} res
       * @param {*} next
       */
      async update (req: Request, res: any, next: NextFunction) {
        try {
          const { body, params } = req
          let routine = await service.update({
            id: params.key
          }, body)
          if (routine.n > 0) {
            res.status(201).json({
              payload: 'Registro actualizado con éxito'
            })
          } else {
            handleError({
              code: 404
            }, next)
          }
        } catch (error) {
          handleError(error, next)
        }
      },

      /**
       * Inactivate
       * @param {*} req
       * @param {*} res
       * @param {*} next
       */
      async inactivate (req: Request, res: any, next: NextFunction) {
        try {
          const { params } = req
          let routine = await service.inactivate({ id: params.key })
          if (routine.n > 0) {
            res.status(201).json({
              payload: 'Element is inactive'
            })
          } else {
            handleError({
              code: 404
            }, next)
          }
        } catch (error) {
          handleError(error, next)
        }
      },

      /**
       * Delete
       * @param {*} req
       * @param {*} res
       * @param {*} next
       */
      async delete (req: Request, res: any, next: NextFunction) {
        try {
          const { params } = req
          let routine = await service.delete({ id: params.key })
          if (routine.n > 0) {
            res.status(201).json({
              payload: 'Registro eliminado con éxito'
            })
          } else {
            handleError({
              code: 404
            }, next)
          }
        } catch (error) {
          handleError(error, next)
        }
      }
    }
  }

  getUserEndpoints (): ICrudFactory {
    const service = this.service
    const path = this.path

    return {
      /**
       * GetAll
       * @param {*} req
       * @param {*} res
       * @param {*} next
       */
      async getAll(req: any, res: any, next: NextFunction) {
        try {
          const { session, querymen } = req
          const { query, cursor, select } = querymen
          const data = await service.getAll(
            { ...query, user: session.account._id },
            cursor,
            select
          )

          res.status(200).json({
            payload: data.result,
            total: data.count
          })
        } catch (error) {
          handleError(error, next)
        }
      },

      /**
       * Create
       * @param {*} req
       * @param {*} res
       * @param {*} next
       * 
       * @method GET
       */
      async create (req: any, res: any, next: NextFunction) {
        try {
          const { body, session } = req
          const saved = await service.create({
            ...body,
            user: session.account._id
          })
          res.status(201).json({
            payload: saved
          })
        } catch (error) {
          handleError(error, next)
        }
      },

      /**
       * Create Many
       * @param {*} req
       * @param {*} res
       * @param {*} next
       */
      async createMany (req: any, res: any, next: NextFunction) {
        try {
          const { body, session } = req
          const payload = body[path].map((el: any) => {
            return {
              ...el,
              user: session.account._id
            }
          })
          const result = await service.createMany(payload)
          res.status(201).json({
            message: result.ok
          })
        } catch (error) {
          handleError(error, next)
        }
      },

      /**
       * Detail
       * @param {*} req
       * @param {*} res
       * @param {*} next
       */
      async detail (req: any, res: any, next: NextFunction) {
        try {
          const { params, querymen, session } = req
          const routine = await service.detail({
            id: params.key,
            user: session.account._id
          }, querymen.select)
          if (routine) {
            res.status(200).json({
              payload: routine
            })
          } else {
            handleError({
              code: 404
            }, next)
          }
        } catch (error) {
          handleError(error, next)
        }
      },

      /**
       * Update
       * @param {*} req
       * @param {*} res
       * @param {*} next
       */
      async update (req: any, res: any, next: NextFunction) {
        try {
          const { body, params, session } = req
          let routine = await service.update({
            id: params.key,
            user: session.account._id
          }, body)
          if (routine) {
            res.status(201).json({
              payload: routine
            })
          } else {
            handleError({
              code: 404
            }, next)
          }
        } catch (error) {
          handleError(error, next)
        }
      },

      /**
       * Inactivate
       * @param {*} req
       * @param {*} res
       * @param {*} next
       */
      async inactivate (req: Request, res: any, next: NextFunction) {
        try {
          const { params } = req
          let routine = await service.inactivate({ id: params.key })
          if (routine.n > 0) {
            res.status(201).json({
              payload: 'Element is deleted'
            })
          } else {
            handleError({
              code: 404
            }, next)
          }
        } catch (error) {
          handleError(error, next)
        }
      },

      /**
       * Delete
       * @param {*} req
       * @param {*} res
       * @param {*} next
       */
      async delete (req, res, next) {
        try {
          // TODO
          // @ts-ignore
          const { params, session } = req
          let routine = await service.delete({
            id: params.key,
            user: session.account._id
          })
          if (routine) {
            res.status(200).json({
              payload: routine.ok
            })
          } else {
            handleError({
              code: 404
            }, next)
          }
        } catch (error) {
          handleError(error, next)
        }
      }
    }
  }
}
