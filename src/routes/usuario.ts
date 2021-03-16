import CrudFactory from '../factory/crud'
import RouteFactory from '../factory/routes'
import UsuarioService from '../services/ServiceUsuario'

const Entity = new CrudFactory('Usuario', UsuarioService)

const queryJson = {
    q: {
      type: RegExp,
      paths: ['nombre', 'correo']
    }
}

const endpoints = Entity.getEndpoints()
const Router = new RouteFactory('/', endpoints, queryJson)

const Usuario = Router.getCrudRoutes()

export default Usuario
