// when we don't have an error in the system, but we want to add an error. for eg: when username etc are empty there we created an error, At this place we are going to use this function.

export const errorHandler = (statusCode, message) =>{
    const error = new Error();
    error.statusCode = statusCode;
    error.message   = message;
    return error;
};