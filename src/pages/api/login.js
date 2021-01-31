import User from '../../models/User.js'
import nc from 'next-connect'
import database from '../../middleware/database'

const route = nc()
route.use(database())

route.post(async (req, res) => {
    try {
        const body = await JSON.parse(req.body); 

        await User.findOne({email: body.email.toLowerCase()}, async function(err, user) {
            if(err) {
                res.status(200).send("Invalid Login");
            } else {
                if(user) {
                    const valid = await user.validPassword(body.password);
                    if(valid) {
                        res.status(200).send(user.toAuthJSON())
                    } else {
                        res.status(200).send("Invalid Login")
                    }
                } else {
                    res.status(200).send("Invalid Login")
                }
            }
        })
    } catch(err) {
        console.log(err)
        res.status(400).send("Bad Request")
    }
})

export default route