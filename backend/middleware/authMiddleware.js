import jwt from "jsonwebtoken";
import "dotenv/config";

export default function authenticateToken(request, response, next){
    const token = request.headers.authorization;
    if(!token) return response.status(401).send({
        error: "Access Denied, No Token Provided or Invalid Format."
    });
    try{
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWTKEY);
        request.user = decoded;
        next();
    }catch(err){
        return response.status(403).send({
            error: "Invalid or Expired Token"
        });
    }
};