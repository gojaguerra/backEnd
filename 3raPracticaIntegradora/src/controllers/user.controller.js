import { getUser as getUserService, addUser as addUserService } from '../services/user.services.js';
import { generateToken, generateTokenResetPass, createHash, isValidPassword } from '../utils.js';
import { PRIVATE_COOKIE } from '../helpers/proyect.constants.js';
import UsersDto from '../dao/DTOs/users.dto.js';
import { postCart } from '../services/carts.services.js';
import { resetPassNotification } from '../utils/custom-html.js';
import { sendEmail } from '../services/mail.js';
import { responseMessages } from '../helpers/proyect.helpers.js';

const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;

        if(!first_name || !last_name || !email || !age || !password){
            req.logger.error(`Error registerUser: Faltan completar campos!`);
            return res.status(401).send({ status: 'error', error: 'Faltan completar campos!' })
        };

        const exists = await getUserService({ email });
        
        if (exists) {
            req.logger.error(`Error registerUser: User already exist!`);
            return res.status(400).send({ status: 'error', error: 'User already exists' });
        };

        const cartId = await postCart();

        const user = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password), 
            cart: cartId
        }

        await addUserService(user);

        const accessToken = generateToken(user);
        
        req.logger.info(`registerUser = User registered`);
        res.send({ status: 'success', message: 'User registered', access_token: accessToken })

    } catch (error) {
        req.logger.error(`registerUser = ` + error.message);
        res.status(500).send({ status: 'error', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getUserService({ email });
        
        if (!user) {
            req.logger.error(`loginUser = Incorrect credentials`);
            return res.status(400).send({ status: 'error', error: 'Incorrect credentials' });
        };

        if (!isValidPassword(user, password)) {
            req.logger.error(`loginUser = Incorrect password`);
            return res.status(401).send({ status: 'error', error: 'Incorrect password' })
        };

        req.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age, 
            role: "user",
            cartId: user.cart._id
        }
        
        // role ADMIN
        /* if(email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            console.log(req.user.role);
        } */
        if(req.user.email === 'adminCoder@coder.com' ) {
            req.user.role = "admin";
        }

        const accessToken = generateToken(user);

        res.cookie(
            PRIVATE_COOKIE, accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }
        ).send({ status: 'success', message: 'Login success!' });
    } catch (error) {
        req.logger.error(`registerUser = ` + error.message);
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
    const user = new UsersDto(req.user);
    res.send({ status: 'success', payload: user });
};

const passLink = async (req, res) => {
    try {
        const { email } = req.body;
        req.logger.warning(`email = ` + email); 
        const user = await getUserService({ email });

        if (!user) {
            req.logger.warning(`loginUser = ` + responseMessages.incorrect_user); 
            return res.status(400).send({ status: 'error', error: responseMessages.incorrect_user });
        }

        const accessToken = generateTokenResetPass(user);

        const link = `http://localhost:8080/api/sessions/linkPassword?token=${accessToken}`
        const mail = {
            to: user.email,
            subject: 'Reseteo de Contraseña',
            html: resetPassNotification(link)
        }
        console.log(mail);
        await sendEmail(mail);

        res.send({ status: 'success', message: 'link OK', access_token: accessToken });
    } catch (error) {
        req.logger.error(`loginUser = ` + error.message);
        res.status(500).send({ status: 'error', error });
    }

};

const linkPass =(req, res) => {
    /* console.log("email:", req.user.email);
    console.log("password:",req.user.password); */
    res.render('linkPassword.handlebars');
};

const changePassword = async (req, res) =>{
    try {
        const { password } = req.body;

        let email = String(req.params.email);
        console.log("email", email);
        const user = await getUserService({ email });

        if (isValidPassword(user, password)) {
            req.logger.warning(`loginUser = ` + responseMessages.invalid_password); 
            return res.status(401).send({ status: 'error', error: responseMessages.invalid_password })
        } else {
            return res.status(200).send({ status: 'OK', payload: 'OK PASS' })
        }

    } catch(error) {

    }
};

export { 
    registerUser, 
    loginUser, 
    logoutUser, 
    gitUser, 
    gitCallbackUser, 
    currentUser,
    passLink,
    linkPass,
    changePassword
}