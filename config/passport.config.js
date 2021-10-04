const { app } = require('../app');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { findUserPerId, findUserPerEmail } = require('../queries/user.queries');


// Initialisation obligatoire de passport
app.use(passport.initialize());
// Utilisation des sessions avec passport 
app.use(passport.session());


// Stockage de l'ID utilisateur uniquement dans la session
passport.serializeUser((user, done) => {
    done(null, user._id);
})
// Passport récupere l'ID utilisateur afin de le retrouver grace à la querie
// pour ensuite le mettre sur la req.user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await findUserPerId(id);
        done(null, user);

    } catch (error) {
        done(error)
    }
})


    /* ***** Configuration de la strategie locale via email ****** */

    passport.use('local', new LocalStrategy({
        usernameField: 'email'
    }, async (email, password, done) => {
        try {
            const user = await findUserPerEmail(email);
            
            if (user) {
                const match = await user.comparePassword(password)
                if (match) {
                    done(null, user)
                }
                else {
                    done(null, false, { message: 'Mot de passe incorrect !' })
                }
            } else {
                done(null, false, { message: 'Utilisateur introuvable !' })
            }
        } catch (error) {
            done(error)
        }
    }))