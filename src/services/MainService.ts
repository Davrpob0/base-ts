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
    
  }

  /**
   * Create One
   * @param {array} data
   */
  async create (data: any = {}) {
    
  }

  /**
   * GetAll
   * @param {object} query
   * @param {object} cursor
   * @param {object} select
   */
  async getAll (query = {}, select = {}, cursor = {}) {
    
  }

  /**
   * Detail
   * @param {object} key
   * @param {object} select
   */
  async detail (key = {}, select = {}) {
    
  }

  /**
   * Update
   * @param {object} key
   * @param {object} data
   */
  async update (key = {}, data = {}) {
    
  }

  /**
   * Inactivate
   * @param {object} key
   */
  async inactivate (key = {}) {
    
  }

  /**
   * Delete
   * @param {object} key
   */
  async delete (key = {}) {
    
  }
}
