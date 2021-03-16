import { Document } from 'mongoose'

export interface ISchemaCommons extends Document {
  isActive: boolean
  isAdmin: boolean
  created_at: Date
  updated_at: Date
  deleted_at: Date
  _deleted: boolean
}

export default {
  isActive: {
    type: Boolean,
    default: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: null
  },
  updated_at: {
    type: Date,
    default: null
  },
  deleted_at: {
    type: Date,
    default: null
  },
  _deleted: {
    type: Boolean,
    default: false
  }
}