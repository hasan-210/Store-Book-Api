const notFound = (req,res,next)=> {
    const error = new Error('NOT FOUND - ' + req.originalUrl);
    res.status(400);
    next(error); 
}

const errorHandler = (err, req, res, next) => {
    const statusCodse = res.statusCodse === 200 ? 500 : res.statusCode;
    res.status(statusCodse).json({message:err.message});
}
module.exports = {notFound,errorHandler}