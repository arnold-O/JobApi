const express = require('express')
const { loginUser } = require('../controllers/auth')
const { createJob, updateJob, deleteJobs, getJob, getAllJobs } = require('../controllers/jobs')



const router = express.Router()



router.route('/createjob').post(createJob)

router.route('/updatejob/:id').patch(updateJob)
router.route('/deletejob/:id').delete(deleteJobs)
router.route('/singlejob/:id').get(getJob)
router.route('/').get(getAllJobs)



module.exports = router