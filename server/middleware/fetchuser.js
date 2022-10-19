const jwt = require('jsonwebtoken');
const config = require('config');
const JWT__SECRET = config.get('jwtsecretkey')

const fetchuser = (req,res,next)=> {
    const token = req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error:"Please authenticate using a valid token"});
    }
    try {
        const data = jwt.verify(token,JWT__SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"});
    }
}

module.exports = fetchuser;