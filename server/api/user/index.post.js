import Users from "~~/server/dbModels/user";

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
    if (body.call == 'GetProfile') {
        const foundUser = await Users.find({user_uid: body.uid})    
        return {profile: foundUser[0]}
    }
 })