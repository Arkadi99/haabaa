import jwt from 'jsonwebtoken';
import HttpError from "http-errors";

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (token){
        try{
            const data = jwt.verify(token, process.env.SECRET_KEY);
            req.userId = data.id;
            next()
        } catch (e) {
            next(HttpError(403, 'Not Allowed', e))
        }
    } else {
        next(HttpError(401, 'Not Authorization'))
    }
}
