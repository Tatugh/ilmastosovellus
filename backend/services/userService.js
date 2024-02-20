import {User} from "../database/schemas.js";

const addUser = async (email, encryptedPass, admin=false) =>{
    const newUser = new User({
        email: email,
        password: encryptedPass,
        admin: admin
    });

    await newUser.save()
    .then(user => {
        console.log("User Added", user);
    })
    .catch(e =>{
        console.error("Error adding user:", e);
    });
};

const getUserByEmail = async (email) =>{
    await User.findOne({email: email})
    .then(user =>{
        console.log("User:", user)
    })
    .catch(e =>{
        console.log("Error user:", e);
    });
};

export {addUser, getUserByEmail};