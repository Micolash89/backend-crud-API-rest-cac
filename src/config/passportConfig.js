import passport from "passport";
import GitHubStrategy from "passport-github2";
import db from "../db/db.js"
import config from "./config.js";
import GoogleStrategy from "passport-google-oauth20"

const initializePassport = () => {

    passport.use("github", new GitHubStrategy({
        clientID: config.clientId,
        clientSecret: config.clientSecret,
        callbackURL: config.gitHubCallBack,
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log("profile ---------");
            console.log(profile)
            // let user = await userDB.findEmail(profile._json.email);

            const user = {
                id: "dsad",
                email: profile._json.email,
                nombre: profile._json.name
            }

            if (!user) {

                // let newUser = {
                //     first_name: profile._json.name,
                //     last_name: "",
                //     age: 0,
                //     email: profile._json.email,
                //     password: ""
                // }
                //   let result = await userDB.createOne(newUser);
                const result = "ok"
                done(null, result);
            }
            else {
                //done(null, user);
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }));


    passport.use('google', new GoogleStrategy({
        clientID: config.googleClientId,
        clientSecret: config.googleClientSecret,
        callbackURL: 'http://localhost:8080/api/session/auth/google/callback'
    }, async (token, tokenSecret, profile, done) => {
        try {
            console.log("profile ---------");
            console.log(profile)
            //let user = await User.findOne({ where: { googleId: profile.id } });

            // if (user) {
            //     return done(null, user);
            // } else {
            //     user = await User.create({
            //         googleId: profile.id,
            //         name: profile.displayName,
            //         email: profile.emails[0].value
            //     });
            //     return done(null, user);
            // }

            const user = {
                id: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value
            }
            return done(null, user);
        } catch (err) {
            console.log("Error")
            return done(err, false);
        }
    }))

    passport.serializeUser((user, done) => {
        console.log("user 1 ", user);
        done(null, user);//lo guarda en passport la session al usuario req.session.passpor.user
    });

    passport.deserializeUser(async (user, done) => {

        const sql = `
            SELECT *
            FROM profesores
            WHERE email = ?
        `
        const connection = await db.promise().getConnection();
        let [user2] = await connection.query(sql, [user.email])
        console.log("base de datos");
        console.log(user2[0]);
        connection.release();
        done(null, user2[0]);

    })

}

export default initializePassport;