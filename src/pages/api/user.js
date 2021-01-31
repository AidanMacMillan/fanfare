import User from '../../models/User.js'
import nc from 'next-connect'
import database from '../../middleware/database'

const route = nc()
route.use(database())

route.post(async (req, res) => {
  try {
      const user = User({
          username: req.body.username,
          email: req.body.email,
          isProducer: req.body.isProducer,
          password: req.body.password
      })

      await user.save()

      res.status(200).send(user.toAuthJSON())

  } catch(err) {
      console.log(err)
      res.status(400).send("Bad Request")
  }
})

export default route