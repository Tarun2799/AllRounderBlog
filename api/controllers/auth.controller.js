import User from "../models/user.model.js";
// use bcryptjs full name because bcrypt is going to give error during the deployment.
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utlis/error.js";

// we are making this async because singup a user takes time in creating the user in our database. and then we send the response to the user.
// we added next to use the middleware.

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    // we are adding extra layer of security, but this is checked by mongoDb as well
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        // tested with postman ✔️
        // return res.status(400).json({ message: "All fields are required." });
        next(errorHandler(400, "All fields are required."));
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

