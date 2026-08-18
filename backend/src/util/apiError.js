/* Extending javascript built in error class 
It inherits from JavaScript's built-in Error class.


This means an ApiError gets the normal properties/behavior of an Error, such as:

message
stack
name

But you're adding your own properties like:

statusCode
data
status
errors

This is useful for APIs because you can create errors like

throw new ApiError(404,"User not found")
 */

class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        errors=[],
        stack=""
    ){
        super(message)
        this.statusCode = statusCode,
        this.data=null,
        this.message=message,
        this.status=false,
        this.errors=errors

        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }

        /*
        The purpose is to make sure the error has a stack trace.

         A stack trace tells you where the error occurred.
         */

    }



}

export {ApiError}
/*
Why super(message)?

Because you're extending:

Error

and the parent Error class needs to be initialized.

Think of:

super(message)

as:

"Hey JavaScript, initialize the Error part of this object using this message."
 */