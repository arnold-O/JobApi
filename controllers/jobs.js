const asyncWrapper = require("../middlewares/asyncWrapper");
const AppError = require("../middlewares/errorHandler");
const Job = require("../models/jobsModel");

exports.getAllJobs = asyncWrapper(async (req, res) => {
  const AllJobs = await Job.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(200).json({
    AllJobs,
    count: AllJobs.length,
  });
});

exports.getJob = asyncWrapper(async (req, res, next) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    return next(new AppError("no job found with that id"));
  }

  res.status(200).json({
    message: "success",
    job,
  });
});

exports.createJob = asyncWrapper(async (req, res, next) => {
  const { company, position, status } = req.body;


  if(!company || !position){
    return next(new AppError('please enter company and position',401))
  }

  const job = await Job.create({
    company,
    position,
    status,
    createdBy: req.user.userId,
  });

  res.status(200).json({
    job,
  });
});

exports.updateJob = asyncWrapper(async (req, res, next) => {
  const {
    body:{company, position},
    user: { userId },
    params: { id: jobId },
  } = req;

 if(company === "" || position===""){
  return next(new AppError('please provide the company or position field', 400))
 }

 const jobUpdate = await Job.findByIdAndUpdate({_id:jobId, createdBy:userId}, req.body,{
  new:true,
  runValidators:true
 })
 if(!jobUpdate){
  return next(new AppError('Job doesnt exit', 400))


 }
  res.status(200).json({
    jobUpdate,
  });
});
exports.deleteJobs = asyncWrapper(async (req, res, next) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndRemove({
    _id:jobId,
    createdBy:userId
  })

  if(!job){
    return next(new AppError('no such job '), 400)
  }
  res.status(200).json({
    message: "job removed successfully",
  });
});
