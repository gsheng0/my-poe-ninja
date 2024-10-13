import { ObjectId } from "mongodb";
import { User } from "../typedef/typedef";

const collections = require("./../config/mongoCollections");
const bcrypt = require("bcrypt");

export const createUser = async(email: string, username: string, password: string) => {
    const user = {
        _id: new ObjectId(),
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

export const validateUserSignInByUsername = async(username: string, password: string) => {
    const userCollection = await collections.getUsers();
    const users: any[] = await userCollection.find({username: username}).toArray();
    if(!users || users.length < 1){
        console.log(`[ValidateUserSignInByUsername]: User with email "${username}" was not validated`)
        return;
    }
    for(let i = 0; i < users.length; i++){
        const current = users[i];
        if(await bcrypt.compare(password, current.password)){
            console.log(`[ValidateUserSignInByUsername]: User with email "${username}" was validated`)
            return cleanUserObject(current);
        }
    }
    console.log(`[ValidateUserSignInByUsername]: User with email "${username}" was not validated`)
}

export const getUserById = async(_id: string) => {
    const userCollection = await collections.getUsers();
    const result = await userCollection.findOne({_id: new ObjectId(_id)});
    if(!result){
        console.log(`[GetUserById]: User with id "${_id}" was retrieved`)
    }
    console.log(`[GetUserById]: User with id "${_id}" was retrieved successfully`)
    return cleanUserObject(result);
}

const cleanUserObject = (userObj: User) => {
    delete userObj.password;
    userObj._id = userObj._id.toString();
    return userObj;
}