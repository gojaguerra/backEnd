import passport from 'passport';
import local from 'passport-local';
import userModel from '../dao/models/users.model.js';
import { createHash, isValidPassword } from '../utils.js';
import GitHubStrategy from 'passport-github2';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true, //permite acceder al objeto request como cualquier otro middleware,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
            const user = await userModel.findOne({ email: username });

            if (user) {
                return done(null, false, {message: 'User exists'})
            }

            const userToSave = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }
    
            const result = await userModel.create(userToSave);
            return done(null, result)

        } catch (error) {
            return done(`Error al obtener el usario: ${error}`)
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username});

            if (!user) {
                return done(null, false, { message: 'Incorrect username' })
            }

            if (!isValidPassword(user, password)) return done(null, false,  { message: 'Incorrect password' })

            return done(null, user)
            //req.user

        } catch (error) {
            return done(`Error al obtener el usario: ${error}`)
        }
    }));

    passport.use('github', new GitHubStrategy({
        clientID: "Iv1.d14cb5dbd2b3a524",
        clientSecret: "cc76cd2afdfdf8978bce73a5a9c2f06d25cc5c89",
        callbackURL: "http://localhost:8080/api/sessions/github-callback",
        scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            const user = await userModel.findOne({ email });
            if (!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: ' - GitHub',
                    email,
                    age: 18,
                    password: ''
                };
                
                const result = await userModel.create(newUser);
                
                done(null, result);
                
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    });
};

export default initializePassport;