import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/token.js";

export const signup = async (req, res) => {
    // console.log('signup');
    // res.send('login page')
    try {
        const { fullName, username, password, confirmPassword, gender, isAdmin } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'password & confirmPassword do not match' });
        }
        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: 'this username already exists, please choose another one' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            isAdmin,
            profilePic: gender === 'male' ? boyProfile : girlProfile
        });


        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
                isAdmin: newUser.isAdmin
            })
        }
        else {
            res.status(400).json({ error: 'Invalid data' });
        }


    } catch (error) {
        console.log('signup error', error.message);
        res.status(500).json({ error: 'signup error' });
    }
}

export const login = async (req, res) => {
    console.log('login');
    // res.send('login page')
    try {
        const { username, password } = req.body;
        console.log(req.body);
        const user = await User.findOne({ username });
        const passwordMatches = await bcrypt.compare(password, user?.password || "");
        console.log(passwordMatches);
        if (!user || !passwordMatches) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        generateTokenAndSetCookie(user._id, res);
        console.log(generateTokenAndSetCookie(user._id, res))
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            gender: user.gender,
            profilePic: user.profilePic
        })
    }
    catch (error) {
        console.log('login error', error.message);
        res.status(500).json({ error: 'login error' });
    }
};

export const logout =  (req, res) => {
    // console.log('logout');
    // res.send('get lost');
    try{
        // res.clearCookie('jwt')
        res.cookie('jwt', "", {maxAge:0}) //either of 2 methods can be used
        res.status(200).json({message:'Logged out successfully'})
    } catch (error) {
        console.log('logout error', error.message);
        res.status(500).json({ error: 'logout error' });
    }
};
