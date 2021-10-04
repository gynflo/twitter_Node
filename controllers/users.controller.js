const { createUser } = require('../queries/user.queries')

exports.signupForm = (req,res) => {
    res.render('users/user-form')
}

exports.signup = async (req,res) => {
    const body = req.body;
    try {
        const user = await createUser(body);
        res.redirect('/');
        
    } catch (error) {
        res.render('users/user-form', { errors: [error.message], isAuthenticated: req.isAuthenticated(), currentUser: req.user });
    }
}



