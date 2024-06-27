import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token =  jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: "5d"
    });

    res.cookie("jwt", token,{
        maxAge: 5 * 24 * 60 * 60 * 1000,
        httpOnly: true, //so that js can't access it
        sameSite: "strict"
    });
};

export default generateTokenAndSetCookie;

