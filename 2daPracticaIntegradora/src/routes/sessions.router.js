import { Router } from 'express';
import passport from 'passport';
import userModel from "../dao/models/users.model.js";

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: 'fail-register', failureMessage: true }), async (req, res) => {
    res.send({ status: 'success', message: 'User registered' })
});

router.get('/fail-register', async (req, res) => {
    /* res.send({ status: 'error', message: 'Register failed' }); */
    /* res.status(500).send({ status: 'error', error: 'Register failed' }); */
    if (req.session.messages == 'User exists') {
        req.session.messages = null;
        res.status(400).send({ status: 'error', error: 'User exists'});
    } else {
        req.session.messages = null;
        res.status(500).send({ status: 'error', error: 'Invalid credentials' });
    };
});

/* router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const exists = await userModel.findOne({ email });

        if (exists) return res.status(400).send({ status: 'error', error: 'User already exists' });

        const user = {
            first_name,
            last_name,
            email,
            age,
            password
        }

        await userModel.create(user);
        res.send({ status: 'success', message: 'User registered' })
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
}) */

router.post('/login',  passport.authenticate('login', { failureRedirect: 'fail-login', failureMessage: true }), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: 'error', error: 'Invalid credentials' });

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email, 
        role: "user", 
        name: `${req.user.first_name} ${req.user.last_name}`
    };

    if(req.session.user.email === 'adminCoder@coder.com' ) {
        req.session.user.role = "admin";
    };

    res.send({ status: 'success', message: 'Login success' })
});

router.get('/fail-login', async (req, res) => {
    /* res.send({ status: 'error', message: 'Login failed' }) */;
    /* res.status(400).send({ status: 'error', error: 'Invalid credentials' }); */
    if (req.session.messages == 'Incorrect username') {
        req.session.messages = null;
        res.status(400).send({ status: 'error', error: 'Incorrect username'});
    }else if (req.session.messages == 'Incorrect password') {
        req.session.messages = null;
        res.status(401).send({ status: 'error', error: 'Incorrect password' });
    }else{
        req.session.messages = null;
        res.status(500).send({ status: 'error', error: 'Invalid credentials' });
    };
});

/* router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email, password });

        if (!user) return res.status(400).send({ status: 'error', error: 'Incorrect credentials' });
        
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age, 
            role: "user"
        }

        if(email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            req.session.user.role = "admin";
        }

        res.send({ status: 'success', message: 'Login success' });

    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
}); */

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).send({ status: 'error', error: 'Logout fail' });
        res.redirect('/');
    })
});


router.get('/github', passport.authenticate('github', { scope: ['user:email']}), async (req, res) => {
    res.send({ status: "success", mesage: "User registered"})
});

router.get('/github-callback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    //req.session.user = req.user;
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email, 
        role: "user", 
        name: `${req.user.first_name} ${req.user.last_name}`
    };

    if(req.session.user.email === 'adminCoder@coder.com' ) {
        req.session.user.role = "admin";
    }
    res.redirect('/');
});


export default router;