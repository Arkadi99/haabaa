import HttpError from "http-errors";
import {Users,} from "../models";
import jwt from "jsonwebtoken";
import md5 from "md5"

const {PASSWORD_SECRET} = process.env


class UserController {
    static register = async (req, res, next) => {
        try {
            const {firstName, lastName, email, password} = req.body
            const user = await new Users({
                firstName,
                lastName,
                email,
                passwordHash: md5(md5(password) + PASSWORD_SECRET)
            });
            const token = jwt.sign({id: user.id}, process.env.SECRET_KEY)
            res.json({
                user,
                token,
            })
        } catch (e) {
            next(e);
        }
    }
    static login = async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await Users.findOne({
                email,
                passwordHash: md5(md5(password) + PASSWORD_SECRET)
            })
            if (!user) {
                throw HttpError(403, 'Invalid email or password');
            }

            if (user.status === 'pending') {
                throw HttpError(401, 'Your email is not confirmed')
            }

            const token = jwt.sign({
                id: user.id,
            }, process.env.SECRET_KEY)

            res.json({
                user,
                token
            })

        } catch (e) {
            next(e)
        }
    }
}

export default UserController
