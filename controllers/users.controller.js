const multer = require('multer');
const {
    createUser,
    searchUsersPerUsername,
    findUserPerUsername,
    findUserPerId,
    addUserIdToCurrentUserFollowing,
    removeUserIdToCurrentUserFollowing
} = require('../queries/user.queries');
const { getUserTweetsFormAuthorId } = require('../queries/tweet.queries')
const path = require('path');

exports.signupForm = (req, res) => {
    res.render('users/user-form')
}

exports.signup = async (req, res) => {
    const body = req.body;
    try {
        const user = await createUser(body);
        res.redirect('/');

    } catch (error) {
        res.render('users/user-form', { errors: [error.message], isAuthenticated: req.isAuthenticated(), currentUser: req.user });
    }
}

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../public/images/avatars'))
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })
})

exports.uploadImage = [
    upload.single('avatar'),
    async (req, res, next) => {
        try {
            const user = req.user;
            user.avatar = `/images/avatars/${req.file.filename}`;
            await user.save();
            res.redirect('/');

        } catch (error) {
            next(error)
        }
    }
]

exports.userProfile = async (req, res, next) => {
    try {

        const username = req.params.username;
        const user = await findUserPerUsername(username);
        const tweets = await getUserTweetsFormAuthorId(user._id);
        res.render('tweets/tweet', {
            tweets,
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user,
            user,
            editable: false
        })
    } catch (error) {
        next(error)
    }
}

exports.userList = async (req, res, next) => {
    try {
        const search = req.query.search;
        const users = await searchUsersPerUsername(search);
        res.render('includes/search-menu', { users });

    } catch (error) {
        next(error)
    }
}

exports.followUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const [, user] = await Promise.all([
            addUserIdToCurrentUserFollowing(req.user, userId),
            findUserPerId(userId)
        ])
        res.redirect(`/users/${user.username}`)
    } catch (error) {
        next(error)
    }
}

exports.unFollowUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const [, user] = await Promise.all([
            removeUserIdToCurrentUserFollowing(req.user, userId),
            findUserPerId(userId)
        ])
        res.redirect(`/users/${user.username}`)

    } catch (error) {
        next(error)
    }
}




