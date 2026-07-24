const jwt = require("jsonwebtoken");

const studentAuth = (req, res, next) => {

    try{

        const token = req.headers.authorization?.split(" ")[1];

        if(!token){

            return res.status(401).json({
                success:false,
                message:"Please Login"
            });

        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.student = decoded;

        next();

    }

    catch(error){

        res.status(401).json({
            success:false,
            message:"Invalid Token"
        });

    }

}

module.exports = studentAuth;