import HTTP_STATUS from "http-status-codes";

export interface IErrorResponse {
  message: string;
  status: string;
  statusCode: number;
  serialiseErrors(): IError;
}

interface IError {
  message: string;
  status: string;
  statusCode: number;
}

export abstract class CustomError extends Error {
  abstract status: string;
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
  }

  serialiseErrors(): IError {
    return {
      message: this.message,
      status: this.status,
      statusCode: this.statusCode,
    };
  }
}

export class BadRequestError extends CustomError {
  /* 
  Use this class like this: throw new BadRequestError('Custom error message') 
  */
  status = "error";
  statusCode = HTTP_STATUS.BAD_REQUEST;

  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends CustomError {
  status = "error";
  statusCode = HTTP_STATUS.NOT_FOUND;

  constructor(message: string) {
    super(message);
  }
}

export class NotAuthorizedError extends CustomError {
  status = "error";
  statusCode = HTTP_STATUS.UNAUTHORIZED;

  constructor(message: string) {
    super(message);
  }
}

export class ServerError extends CustomError {
  status = "error";
  statusCode = HTTP_STATUS.SERVICE_UNAVAILABLE;

  constructor(message: string) {
    super(message);
  }
}

export class JoiRequestValidationError extends CustomError {
  status = "error";
  statusCode = HTTP_STATUS.BAD_REQUEST;

  constructor(message: string) {
    super(message);
  }
}

export class FileTooLargeError extends CustomError {
  status = "error";
  statusCode = HTTP_STATUS.REQUEST_TOO_LONG;

  constructor(message: string) {
    super(message);
  }
}
