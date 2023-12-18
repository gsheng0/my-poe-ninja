import { ObjectId } from "mongodb";

const collections = require("./../config/mongoCollections");
const bcrypt = require("bcrypt");

export const createUser = async(email, username, password) => {
    const user = {
        email: email,
        username: username,
        password: await bcrypt.hash(password, 16)
    }
    const userCollection = await collections.getUsers();
    const output = await userCollection.insertOne(user);
    if(!output.acknowledged || !output.insertedId){
        console.log(`[CreateUser]: User with email "${email}" was not added`)
        return false;
    }
    console.log(`[CreateUser]: User with email "${email}" was added `)
    return true;
}

export const validateUserSignInByUsername = async(username, password) => {
    const userCollection = await collections.getUsers();
    const users = await userCollection.find({username: username}).toArray();
    if(!users || users.length < 1){
        console.log(`[ValidateUserSignInByUsername]: User with email "${email}" was not validated`)
        return;
    }
    for(let i = 0; i < users.length; i++){
        const current = output[i];
        if(await bcrypt.compare(password, current.password)){
            console.log(`[ValidateUserSignInByUsername]: User with email "${email}" was validated`)
            return cleanUserObject(current);
        }
    }
    console.log(`[ValidateUserSignInByUsername]: User with email "${email}" was not validated`)
}

export const getUserById = async(_id) => {
    const userCollection = await collections.getUsers();
    const result = await userCollection.findOne({_id: new ObjectId(_id)});
    if(!result){
        console.log(`[GetUserById]: User with id "${id}" was retrieved`)
    }
    console.log(`[GetUserById]: User with id "${_id}" was retrieved successfully`)
    return cleanUserObject(result);
}

const cleanUserObject = (userObj) => {
    delete userObj.password;
    userObj._id = userObj._id.toString();
    return userObj;
}