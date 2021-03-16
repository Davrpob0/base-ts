import Usuario from '../schemas/SchemaUsuario'
import MainService from './MainService'

class UsuarioService extends MainService {}

export default new UsuarioService(Usuario)
