import mongoose from 'mongoose'
import moment from 'moment'

const uuid = require('uuid-base62')

export interface IService {
  schema: any
  getUniqueId (): string
  createMany (body: Array<any>): any
  create (data: object): Promise<any>
  getAll (query: object, select: object, cursor: object): Promise<any>
  detail (key: object, select: object): Promise<any>
  update (key: object, data: object): Promise<any>
  inactivate (key: object): Promise<any>
  delete (key: object): Promise<any>
}

export default class MainService implements IService {
  public schema: any

  constructor (schema: any) {
    this.schema = schema
  }

  getUniqueId () {
    return uuid.v4()
  }

 
}
