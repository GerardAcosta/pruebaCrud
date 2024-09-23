import jwt from 'jsonwebtoken';

export const checkToken = (req, res, next) => {
    if(!req.headers['authorization']) {
        return res.status(403).json({error: '¿Que no tienes cabeza?'});
    }
    const token = req.headers['authorization'];
    if(!token){
        return res.status(403).json({ error: 'Formato del token inválido.' })
    }

    let payload
    try {
        payload = jwt.verify(token, 'Me gustan las patatas.')
    } catch (error) {
        return res.status(401).json({ error: "El token no es correcto." })
    }
    
    next();
}