import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api.js';

class ConflictRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
  }
}

export default ConflictRequestError;
