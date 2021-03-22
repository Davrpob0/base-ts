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
       * @method POST
       */
      async create (req: Request, res: any, next: NextFunction) {
        try {
         
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
          
        } catch (error) {
          handleError(error, next)
        }
      }
    }
  }

}
