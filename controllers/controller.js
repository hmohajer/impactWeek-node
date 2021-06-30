const { User } = require("../models/User");
const { Question } = require("../models/Question");
const { Comment } = require("../models/Comment");
const jwt = require("jsonwebtoken");

const homepage = (req, res) => {
    Question.find()
        .then((result) => res.render("home", { question: result, err: null }))
        .catch((err) => console.log(err));
    // res.render("home");
    // res.redirect("/feed");
};

const smoothies = (req, res) => {
    res.render("smoothies");

    // Feed.find()
    //     .then((result) => res.render("index", { feed: result , err:null}))
    //     .catch((err) => console.log(err));
};

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: "" };

    //duplicate error
    if (err.code === 11000) {
        errors.email = "this email already exist!";
        return errors;
    }

    //validation
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            //    console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    //incorect user or pass
    if (err.message === "incorrect email") {
        errors.email = "incorrect email!";
    }

    if (err.message === "incorrect password") {
        errors.password = "incorrect password!";
    }

    return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, "secret hassan test 1222", {
        expiresIn: maxAge,
    });
};

const signUp_get = (req, res) => {
    const isLogedIn = req.cookies.jwt ? true : false;

    res.render("signup", { isLogedIn });
};

const signUp_post = async (req, res) => {
    const { email, password } = req.body;
    //  res.send(email + "  new signup!");
    // console.log("in signup post:  ",req.body);
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors }); //send("user not created!");
    }
};

const login_get = async (req, res) => {

    res.render("login");
};

const logout_get = async (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
};

const login_post = async (req, res) => {
    // res.send(req.body.email + "  new login!");
    // console.log("in login post!",req.body);
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

// const set_cookies = (req, res) => {
//     // res.setHeader("set-cookie","newUser=Hassan");

//     res.cookie("newUser", "Hassan1");
//     res.cookie("anotherUser", false, { secure: true });
//     res.cookie("isEmployee", true, { maxAge: 1000 * 60 * 60 * 24 }); //1000*60*60*24
//     res.send("cookie is saved!");
// };

// const read_cookies = (req, res) => {
//     const cookies = req.cookies;
//     // console.log(cookies);
//     res.json(cookies);
// };

const addQuestion = (req, res) => {
    const question = new Question(req.body);
    question.save()
        .then((result) => res.redirect("/"))
        // .catch((err) => console.log(err.errors.name.message));
        .catch((err) => res.render("home", { question: [], err:err.errors })); //console.log(err));
};
const addQuestion_get = (req, res) => {
    res.render("addQuestion",{ err:null });
};

const deleteQuestion = (req, res) => {
    Question.findByIdAndDelete(req.params.id)
        .then((result) => res.redirect("/"))
        .catch((err) => console.log(err));
};

// const editQuestion = (req, res) => {
//     if (req.method == "GET") {
//         Feed.findById(req.params.id)
//             .then((result) => res.render("editPost", { post: result, err:null }))
//             .catch((err) => console.log(err));
//     }
//     if (req.method == "POST") {
//         Feed.findByIdAndUpdate(req.params.id, req.body)
//             .then((result) => res.redirect(`/feed/${req.params.id}`))
//             .catch((err) => console.log(err));

//     }
// };

const showQuestion = async (req, res) => {

    // Question.findById(req.params.id)
    //     .then((result) => res.render("showQuestion", { post: result }))
    //     .catch((err) => console.log(err));

        try {
            const post = await Question.findById(req.params.id);
            // console.log(req.params.id);
            const comments = await Comment.find({ questionId:req.params.id });
            // const comments = await Comment.listComments(req.params.id);
            console.log("show question:  ", comments)
            res.render("showQuestion", { post, comments });
            // res.status(200).json({ user: user._id });
        } catch (err) {
            // const errors = handleErrors(err);
            console.log(err);
            // res.status(400).json({ errors });
        }
};

const addComment = async (req, res) => {
    const { commentBody ,userId, questionId } = req.body;
    //  res.send(email + "  new signup!");
    // console.log("in signup post:  ",req.body);
    console.log("in add comment :  ",req.body);
    try {
        const comment = await Comment.create({ commentBody ,userId, questionId });
        res.status(201).json({ comment: comment.userId });
    } catch (err) {
        const errors = handleErrors(err); //************not working */
        res.status(400).json({ errors }); 
    }
};

module.exports = {
    homepage,
    smoothies,
    signUp_get,
    signUp_post,
    login_get,
    login_post,
    // set_cookies,
    // read_cookies,
    logout_get,
    showQuestion,
    addQuestion,
    addQuestion_get,
    deleteQuestion,
    addComment,
};
