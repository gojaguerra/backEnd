import { Router } from 'express';
import { passportCall } from '../utils.js';

const router = Router();

router.route('/register')
    .get( (req, res) => {
        res.render('register.handlebars');
    });

router.route('/login')
    .get( (req, res) => {
        res.render('login.handlebars');
    });
    
router.route('/')
    .get(passportCall('jwt'), (req, res) => {
        res.render('home.handlebars', {
            user: req.user
        });
    });

router.route('/profile')
    .get(passportCall('jwt'), (req, res) => {
        res.render('profile.handlebars', {
            user: req.user,
        });
    });

export default router;