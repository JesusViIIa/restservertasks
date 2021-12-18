const express = require('express')
const router = express.Router()
const Task = require('../models/task')//mongo model task




/////_____________________________Gets_____________________________////////////////////-----------
router.get('/', async (req,res)=>{
     const tasks = await Task.find()
     res.send(tasks)

})

router.get('/:id', async (req,res)=>{
    const task =await Task.findById(req.params.id)
    res.send(task)

})


/////_____________________________posts_____________________________////////////////////-----------
router.post('/', async (req, res) => {
    const {title, description }= req.body
    const task= new Task({title, description})
    await task.save()
    res.send({status: 'task saved'})
});


/////_____________________________update_____________________________////////////////////-----------

router.put('/:id', async (req, res) => {
    const {title, description }= req.body
    const updateTask= ({title, description})
    await Task.findByIdAndUpdate(req.params.id,updateTask)
    res.send({status:'task updated'})
    
});


/////_____________________________delete____________________________////////////////////-----------
router.delete('/:id',async (req, res) => {
    await Task.findByIdAndRemove(req.params.id)
    res.send({status:'task deleted'})
});


module.exports = router