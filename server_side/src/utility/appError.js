import { errorHandler } from "../middleware/errorHandler.js";


export class appError extends Error{

constructor(message , statusCode){

    super(message);

    this.statusCode=statusCode;
    this.customError= true ;

}

}