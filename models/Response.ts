interface IError {}

class ResponseConfig {
  error: IError;
  message: string;
  response: any;

  constructor(error: IError, message: string, data: any) {
    this.error = error;
    this.message = message;
    this.response = data;
  }
}
