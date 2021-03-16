import mongoose, { Schema, Document } from 'mongoose'
import SchemaCommons from './SchemaCommons'

const email_regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

export interface IUsuario extends Document {
  id: string
  nombre: string
  apellido: string
  correo: string
  contacto: {
    telefonoFijo: string
    celular: string
    paginaWeb: string
  },
  ubicacion: {
    ciudad: string,
    direccion: string
  }
}

const UsuarioSchema: Schema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  correo: { 
    type: String, 
    required: true, 
    unique: true,
    match: [email_regex, 'Invalid email.']
  },
  contacto: {
    telefonoFijo: { type: String },
    celular: { type: String, required: true },
    paginaWeb: { type: String },
  },
  ubicacion: {
    ciudad: { type: String, required: true },
    direccion: { type: String, required: true }
  },
  commons: {
    ...SchemaCommons
  }
}, {
  collection: 'usuario',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  versionKey: false
})

export default mongoose.model<IUsuario>('Usuario', UsuarioSchema)
