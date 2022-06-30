const asyncWrapper = require("../middlewares/asyncWrapper")








exports.getAllJobs = asyncWrapper(  async(req, res)=>{



    res.status(201).json({
        message:"success all jobs"
    })
})

exports.getJob =  asyncWrapper( async(req, res)=>{



    res.status(200).json({
        message:"success"
    })
})
exports.createJob =  asyncWrapper( async(req, res)=>{



    res.status(200).json({
    user:req.user,
    msg:"we live in create jobs"
    })
})


exports.updateJob =  asyncWrapper( async(req, res)=>{



    res.status(200).json({
        message:"success"
    })
})
exports.deleteJobs =  asyncWrapper( async(req, res)=>{



    res.status(200).json({
        message:"success"
    })
})