import User from "../models/user.model.js";
// use bcryptjs full name because bcrypt is going to give error during the deployment.
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utlis/error.js";
import jwt from "jsonwebtoken";

// we are making this async because singup a user takes time in creating the user in our database. and then we send the response to the user.
// we added next to use the middleware.

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    // we are adding extra layer of security, but this is checked by mongoDb as well
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        // tested with postman ✔️
        // return res.status(400).json({ message: "All fields are required." });
        return next(errorHandler(400, "All fields are required."));
    }

    // we don't have to use await here because hashSync already have the await by itself. tested ✔️
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // because of ES6, if key-value pair name is same we don't have to write them twice.
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    // Now we have to save it inside the database, but we are not going to save the password as it is, so we use bcryptjs for hasing our password.
    // we are going to use try/catch for proper error handling because without this if we get any error it will display internal not to the client as response. Tested ✔️

    try {
        await newUser.save();
        res.json("Signup successful");
    } catch (error) {
        // res.status(500).json({ message: error.message });
        next(error);
    }

}




export const signin = async (req, res, next)=>{
    const { email, password} = req.body;

    if(!email || ! password || email === '' || password === ''){
        return next(errorHandler(400, "All fields are required"));
    }

    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404, "User not found"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(400, "Wrong credentials"));
        }

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);

        const { password: pass, ...rest} = validUser._doc;

        res.status(200).cookie('access_token', token, { httpOnly: true, }).json(rest)
    } catch (error) {
        next(error);
    }
}

export const google = async (req, res, next)=>{
    const { email, name, googlePhotoUrl} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const { password: pass, ...rest} = user._doc;
            res.status(200).cookie('access_token', token, {httpOnly: true,}).json(rest);
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4), //tarunjhamb45113        
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const { password: pass, ...rest} = newUser._doc;
            res.status(200).cookie('access_token', token, {httpOnly: true,}).json(rest);
        }
    } catch (error) {
        next(error);
    }
}