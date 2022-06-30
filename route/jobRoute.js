const express = require('express')
const { loginUser } = require('../controllers/auth')
const { createJob, updateJob, deleteJobs, getJob, getAllJobs } = require('../controllers/jobs')



const router = express.Router()



router.route('/createjob').post(createJob)

router.route('/updatejob/:id').patch(updateJob)
router.route('/delete/:id').delete(deleteJobs)
router.route('/singlejob/:').get(getJob)
router.route('/').get(getAllJobs)



module.exports = router