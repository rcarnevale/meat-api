import * as restify from 'restify';

export const errorHandler = (req: restify.Request, res: restify.Response, err, done) => {
    err.toJSON = () => {
        return {
            message : err.message
        }
    }

    switch(err.name){
        case 'MongoError':
            if(err.code === 11000) err.statusCode = 400;
            break
        case 'ValidationError':
            err.statusCode = 400;
            const messages = [];
            for(let name of err.errors){
                messages.push({message: err.errors[name].message})
            }
            err.toJSON = ()=>({
                errors: messages
              })
            break
    }
    
    done()
}