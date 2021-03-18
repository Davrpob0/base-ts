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

  /**
   * Create Many
   * @param {array} data
   */
  async createMany (data: any = []) {
    const session = await mongoose.startSession()
    session.startTransaction()
    
    const elements = data.map((el:any) => {
      return new this.schema({
        ...el,
        id: this.getUniqueId(),
        commons: {
          created_at: moment()
        }
      })
    })

    await this.schema.create(elements, { session })

    await session.commitTransaction()
    session.endSession()

    return {
      ok: `Created ${elements.length} elements`
    }
  }

  /**
   * Create One
   * @param {array} data
   */
  async create (data: any = {}) {
    const element = new this.schema({
      ...data,
      id: this.getUniqueId(),
      commons: {
        created_at: moment()
      }
    })
    
    return element.save()
  }

  /**
   * GetAll
   * @param {object} query
   * @param {object} cursor
   * @param {object} select
   */
  async getAll (query = {}, select = {}, cursor = {}) {
    
    const mongoQuery = {...query, 'commons._deleted': false }
    const result = await this.schema.find(mongoQuery, select, cursor)
    const count = await this.schema.count(mongoQuery)

    return {
      result,
      count
    }
  }

  /**
   * Detail
   * @param {object} key
   * @param {object} select
   */
  async detail (key = {}, select = {}) {
    const mongoQuery = {
      ...key,
      'commons._deleted': false
    }

    return this.schema.findOne(mongoQuery, select)
  }

  /**
   * Update
   * @param {object} key
   * @param {object} data
   */
  async update (key = {}, data = {}) {
    const mongoQuery = {
      ...key,
      'commons._deleted': false
    }
    return await this.schema.updateOne(mongoQuery, { $set: {
      ...data,
      'commons.updated_at': moment()
    }})
  }

  /**
   * Inactivate
   * @param {object} key
   */
  async inactivate (key = {}) {
    const mongoQuery = {
      ...key,
      'commons._deleted': false
    }

    return await this.schema.updateOne(mongoQuery, { $set: { 
      'commons._deleted': true,
      'commons.deleted_at': moment()
    } })
  }

  /**
   * Delete
   * @param {object} key
   */
  async delete (key = {}) {
    const mongoQuery = {
      ...key
    }

    return await this.schema.deleteOne(mongoQuery)
  }
}
