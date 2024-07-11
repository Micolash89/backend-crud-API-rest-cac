import { Router } from "express";
import { authMiddleware } from "../../utils.js";
import { currentGet, loginPost } from "../controllers/sessionController.js";
import passport from "passport";

const sessionRouter = Router();

sessionRouter.post("/login", loginPost);

sessionRouter.get("/current", authMiddleware, currentGet);

sessionRouter.get("/github", passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

sessionRouter.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/current' }), async (req, res) => {
    console.log("session");
    console.log(req.session)
    res.redirect('/');
});

sessionRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

sessionRouter.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // Redirigir al usuario después de la autenticación exitosa
    console.log("session google");
    console.log(req.isAuthenticated());
    console.log(req.session);
    res.redirect('/');
}
);

export default sessionRouter;