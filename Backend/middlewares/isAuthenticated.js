import jwt from  "jsonwebtoken"
const isAuthenticated = async (req,res,next)=>{

    try{

        const  token = req.cookies.token;     // cookies se token milega na to uska phir dekhgenge
        if(!token){
            return res.status(401).json({
                message: "user not authenticated ",
                success: false,
            })
        }

        // agar token exist karta hain toh kya karenge
        //Decode karna hoga 

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid Token",
                success:false,
            })
        };
        req.userId  = decode.userId;             // major issue detected
        next();

    }catch(error){
        console.log(error)
    }
}

export default isAuthenticated;