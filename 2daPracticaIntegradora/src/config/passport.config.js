import passport from 'passport';
import jwt from 'passport-jwt';
import userModel from '../dao/models/users.Model.js';
import GitHubStrategy from 'passport-github2';
import { PRIVATE_KEY } from '../helpers/proyect.constants.js';
// import local from 'passport-local';
// import { createHash, isValidPassword } from '../utils.js';

// const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload.user);
        } catch (error) {
            return done(error);
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
                }
                const result = await userModel.create(newUser);
                // console.log("result:", result);
                done(null, result);
                
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }));
};

const cookieExtractor = req => {
let token = null;
if (req && req.cookies) {
    token = req.cookies['coderCookieToken'];
}
    return token;
}

export default initializePassport;