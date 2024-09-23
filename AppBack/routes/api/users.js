import Router from "express";
import bcrypt from "bcryptjs";
import { userModel } from "../../models/users.model.js";
import jwt from "jsonwebtoken";

export const usersRouter = Router();

usersRouter.post('/register', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 12);
        const user = await userModel.create(req.body);
        res.json(user);
    } catch (error) {
        res.json({ error: error.message });
    }
    
});

usersRouter.post('/login', async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if(!user){
            return res.json({error: "Error en usuario/contraseña"})
        }

        const eq = bcrypt.compareSync(req.body.password, user.password);
        if(!eq){
            return res.json({error: "Error en usuario/contraseña"})
        }
        res.json({ success: 'Login Correcto', accessToken: createAccessToken(user), refreshToken: createRefreshToken(user) });
    } catch (error) {
        res.json({error: error.message});
    }
});

usersRouter.post('/refresh', async (req, res) => {
    const refreshToken = req.body.refreshToken;
    console.log(refreshToken)
    const payload = jwt.verify(refreshToken, 'Mira como me han quedado las patacas.')
    res.json({accessToken: createAccessToken(payload.user_id)})

})

function createAccessToken(user) {
    const payload = {
        user_id: user._id,
        user_role: user.role
    }
    return jwt.sign(payload, 'Me gustan las patatas.',{expiresIn: '5s'})
}

function createRefreshToken(user) {
    const payload = {
        user_id: user._id
    }
    return jwt.sign(payload, 'Mira como me han quedado las patacas.')
}