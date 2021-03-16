import { Router } from 'express'
import { ICrudFactory } from './crud'

const querymen = require('querymen')

export default class EntityRouterFactory {
  public endpoints: ICrudFactory
  public path: string
  public router: any
  public queryJson: any

  constructor (path: string = '', endpoints: ICrudFactory, queryJson: any) {
    this.endpoints = endpoints
    this.path = path
    this.queryJson = queryJson
    
    this.router = Router()
  }

  // @TODO Dymanic querySchema
  getCrudRoutes () {
    this.router.get('/', [
      querymen.middleware(this.queryJson)
    ], this.endpoints.getAll)

    this.router.post('/', [
    ], this.endpoints.create)

    this.router.post(`/_bulk`, [
    ], this.endpoints.createMany)

    this.router.get('/:key', [
      querymen.middleware({})
    ], this.endpoints.detail)

    this.router.post('/:key', [
    ], this.endpoints.update)

    this.router.put('/:key', [
    ], this.endpoints.update)

    this.router.delete('/:key', [
    ], this.endpoints.inactivate)

    this.router.delete('/delete/:key', [
    ], this.endpoints.delete)

    return this.router
  }
}
