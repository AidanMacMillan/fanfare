import Event from '../../../models/Event'
import User from '../../../models/User'
import nc from 'next-connect'
import database from '../../../middleware/database'
import jwt from 'jsonwebtoken'
import { secret } from '../../../../config'

const route = nc()
route.use(database())

route.post(async (req, res) => {
    try {
        const body = await JSON.parse(req.body); 
        
        const decoded = jwt.verify(body.token, secret);

        if(decoded.isProducer) {
            let user = false;
            await User.findOne({username: decoded.username}, async function(err, foundUser) {
                if(err) {
                    res.status(400).send("Bad Request")
                }
                user = foundUser;
            });
            
            
            if(user) {
                const event = Event({
                    name: body.name,
                    description: body.description,
                    startTime: body.startTime,
                    endTime: body.endTime
                })
        
                await event.save()

                user.events.push(event);

                await user.save();

                res.status(200).send({name: event.name})
            } else {
                res.status(400).send("Bad Request")
            }

    
            
        } else {
            res.status(400).send("Bad Request")
        }
    } catch(err) {
        console.log(err)
        res.status(400).send("Bad Request")
    }
})

route.get(async (req, res) => {
    try {
        const decoded = jwt.verify(req.query.token, secret);

        if(decoded.isProducer) {
            let user = false;
            await User.findOne({username: decoded.username}, async function(err, foundUser) {
                if(err) {
                    res.status(400).send("Bad Request")
                }
                user = foundUser;
            });

            if(user) {
                if(req.query.name) {
                    const event = await Event.findOne({ name: req.query.name })
                    res.status(200).send(event);
                } else {
                    const events = await Event.find({ _id: { $in: user.events } })
                    res.status(200).send(events);
                }
            } else {
                res.status(400).send("Bad Request")
            }
        } else {
            res.status(400).send("Bad Request")
        }

    } catch(err) {
        console.log(err)
        res.status(400).send("Bad Request")
    }
})

export default route