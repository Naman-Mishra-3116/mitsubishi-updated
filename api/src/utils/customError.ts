export enum ErrorType {
  LOGIN = "LOGIN",
  BAD_REQUEST = "BAD REQUEST",
  INVALID_TOKEN = "INVALID TOKEN",
  EXPIRED_TOKEN = "EXPIRED TOKEN",
  INTERNAL_ERROR = "INTERNAL SERVER ERROR",
  NOT_FOUND = "NOT FOUND",
}

export class ErrorResponse extends Error {
  errorType: ErrorType;
  title: string;
  constructor(errorType: ErrorType, title: string, message: string) {
    super(message);
    this.title = title;
    this.errorType = errorType;
  }
}
