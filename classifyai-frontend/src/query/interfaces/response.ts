export interface Request {
    response: string
    status: number
}

export interface Error {
    message: string;
    status: number;
    request: Request
}

