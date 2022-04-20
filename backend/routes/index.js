const router = require('express').Router()
const userRoutes = require('./userRoutes')
const blogRoutes = require('./blogRoutes')

router.use("/api/user", userRoutes)
router.use("/api/blog", blogRoutes)

module.exports = router