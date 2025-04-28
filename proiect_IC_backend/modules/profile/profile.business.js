import {getUserProfileById} from './profile.model.js'

export async function getprofileBusiness(userId) {
    const userProfile = await getUserProfileById(userId);
    if(!userProfile){
        throw new Error('User profile not found')
    }
    return userProfile   
}