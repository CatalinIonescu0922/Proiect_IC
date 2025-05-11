import {getprofileBusiness} from './profile.business.js'

export async function getProfileDetails(req, res ,next){
    try {
        const userId =req.user.id;
        const profile = await getprofileBusiness(userId);
        res.status(200).json(profile)

    } catch(err){
        console.error('Profile can not be retrived', err);
        res.status(500).json({message : 'Failed to load profile'})
    }
}