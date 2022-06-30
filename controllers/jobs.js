const asyncWrapper = require("../middlewares/asyncWrapper");
const AppError = require("../middlewares/errorHandler");
const Job = require("../models/jobsModel");

exports.getAllJobs = asyncWrapper(async (req, res) => {



    const AllJobs = await Job.find({createdBy: req.user.userId}).sort("createdAt")
  res.status(200).json({
    AllJobs,
    count:AllJobs.length
  });
});

exports.getJob = asyncWrapper(async (req, res) => {

  const {user:{userId}, params:{id:jobId}} = req

  const job = await Job.findOne({
    _id:jobId, createdBy:userId
  })

  if(!job){
    return next(new AppError('no job found with that id'))
  }



  res.status(200).json({
    message: "success",
    job
  });
});


exports.createJob = asyncWrapper(async (req, res) => {
  const { company, position, status } = req.body;

  const job = await Job.create({
    company,
    position,
    status,
    createdBy: req.user.userId,
  });

  res.status(200).json({
    job
  });
});

exports.updateJob = asyncWrapper(async (req, res) => {
  
  res.status(200).json({
    message: "success",
  });
});
exports.deleteJobs = asyncWrapper(async (req, res) => {
  res.status(200).json({
    message: "success",
  });
});
