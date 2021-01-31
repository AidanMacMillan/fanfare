import User from '../../models/User.js'
import nc from 'next-connect'
import database from '../../middleware/database'

const route = nc()
route.use(database())

route.post(async (req, res) => {
    try {
        const body = await JSON.parse(req.body); 
        
        const user = User({
            username: body.username,
            email: body.email,
            isProducer: body.isProducer,
            password: body.password
        })

        await user.save()

        res.status(200).send(user.toAuthJSON())
    } catch(err) {
        console.log(err)
        res.status(400).send("Bad Request")
    }
})

export default route