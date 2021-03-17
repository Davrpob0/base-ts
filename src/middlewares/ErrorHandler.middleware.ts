import { errors } from '../constants/index';

const handleError = async (error: any, next: (Function)) => {
  console.log(error);
  
  if (errors[error.name  as keyof object]) {    
    const standard_error = errors[error.name as keyof object] as any;
    error.status_code = standard_error.code;
    error.message = error.message;
    error.status = 400;
    return next(error);
  }

  switch (error.code) {
    case 11000:
      error.message = 'El registro ya existe';
      error.status = 400;
      break;
    case 400:
        error.message = error.message || 'Falló la validación de los datos';
        error.status = 400;
        break;
    case 404:
        error.message = error.message || 'Recurso no encontrado';
        error.status = 404;
        break;
    default:
      if (!error.status) {
        error.status = 400;
        error.message = 'Falló la validación de los datos';
      }
      break;
  }

  return next(error);
}

export default handleError
