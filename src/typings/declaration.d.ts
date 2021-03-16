
export interface IMemSession {
  id: string | null
}

declare namespace Express {
  interface Request {
    session: IMemSession | object | string
  }
}
