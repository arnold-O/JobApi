const express = require('express')
const { loginUser } = require('../controllers/auth')
const { createJob, updateJob, deleteJobs, getJob, getAllJobs } = require('../controllers/jobs')



const router = express.Router()



router.route('/').post(createJob).get(getAllJobs)

router.route('/:id').patch(updateJob).delete(deleteJobs).get(getJob)




module.exports = router