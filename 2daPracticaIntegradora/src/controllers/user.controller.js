import { getUser as getUserService, addUser as addUserService } from '../services/user.services.js';
import { generateToken, createHash, isValidPassword } from '../utils.js';
import { PRIVATE_COOKIE } from '../helpers/proyect.constants.js';

const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const exists = await getUserService({ email });
        
        if (exists) return res.status(400).send({ status: 'error', error: 'User already exists' });

        const user = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password)
        }

        await addUserService(user);

        const accessToken = generateToken(user);

        res.send({ status: 'success', message: 'User registered', access_token: accessToken })

    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(email);
        // const user = await userModel.findOne({ email });
        const user = await getUserService({ email });

        // console.log("user:", user);
        if (!user) return res.status(400).send({ status: 'error', error: 'Incorrect credentials' });

        if (!isValidPassword(user, password)) return res.status(401).send({ status: 'error', error: 'Incorrect password' })

        req.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age, 
            role: "user"
        }

        // role ADMIN
        if(email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            req.user.role = "admin";
        }

        const accessToken = generateToken(user);

        res.cookie(
            PRIVATE_COOKIE, accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }
        ).send({ status: 'success', message: 'Login success!' });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie(PRIVATE_COOKIE);
    res.redirect('/login')
};

const gitUser = async (req, res) => {
    res.redirect('/');
    //res.send({ status: "success", mesage: responseMessages.user_register_ok})
};

const gitCallbackUser = async (req, res) => {
    req.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email, 
        role: "user", 
    };

    if(req.user.email === 'adminCoder@coder.com' ) {
        req.user.role = "admin";
    }
    const accessToken = generateToken(req.user);

    res.cookie(
        PRIVATE_COOKIE, accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }
    )
    
    res.redirect('/');
};

const currentUser = (req, res) => {
    res.send({ status: 'success', payload: req.user });
};

export { 
    registerUser, 
    loginUser, 
    logoutUser, 
    gitUser, 
    gitCallbackUser, 
    currentUser 
}