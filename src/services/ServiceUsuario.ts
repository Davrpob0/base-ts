import Business from '../schemas/SchemaUsuario'
import MainService from './MainService'

class BusinessService extends MainService {}

export default new BusinessService(Business)
