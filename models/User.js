const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Please enter an email"],
            unique: true,
            lowercase: true,
            validate: [isEmail, "Please enter a valid email"],
        },
        password: {
            type: String,
            required: [true, "Please enter a password"],
            minlength: [6, "the password must be at least 6 characters"],
        },
    },
    { timestamps: true }
);

//fire a function after a document saved to db //mongoose hook
userSchema.post("save", function (doc, next) {
    next();
});

//fire a function after a document saved to db //mongoose hook
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);

        if (auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = {
    User,
};
