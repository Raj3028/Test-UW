const taskModel = require("../model/taskModel")
const validator = require('../Validator/validator')


//<<<===================== This function is used for Create Task =====================>>>//
const createTask = async (req, res) => {

    try {
        let data = req.body

        let { title, description, priority } = data

        if (!validator.checkInputsPresent(data)) return res.status(400).send({ status: false, msg: "Provide all required  details" })

        if (!validator.isValidBody(title)) return res.status(400).send({ status: false, message: "Title is required" })

        if (!validator.isValidBody(description)) return res.status(400).send({ status: false, message: "Description is required" })

        if (!validator.isValidBody(priority)) return res.status(400).send({ status: false, message: "Priority is required" })

        if (!(["high", "medium", "low"].includes(data.priority))) return res.status(400).send({ status: false, message: "You can enter only high or medium or low in Priority!" })

        let userId = req.token.payload.userId

        let task = await taskModel.create({ title: title, description: description, priority: priority, userId: userId })

        return res.status(201).send({ status: true, message: "Successfully task created", data: task })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}

//<<<===================== This function is used for Fetch Task Data =====================>>>//
const getTask = async (req, res) => {

    try {

        const userId = req.token.payload.userId

        let getTask = await taskModel.find({ status: false, userId: userId })

        return res.status(200).send({ status: true, data: getTask })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}


//<<<===================== This function is used for Update task =====================>>>//
const updateTask = async (req, res) => {

    try {

        let data = req.body
        let taskId = req.params.taskId

        if (!validator.checkInputsPresent(data)) return res.status(400).send({ status: false, message: "You have to fill something!" })

        if (data.priority) {
            if (!(["high", "medium", "low"].includes(data.priority))) return res.status(400).send({ status: false, message: "You can enter only high or medium or low in Priority!" })
        }

        let updateTask = await taskModel.findOneAndUpdate({ _id: taskId, status: false, }, { ...data }, { new: true })
        
        if (!updateTask) return res.status(400).send({ status: false, message: "Already Deleted!" })

        return res.status(200).send({ status: true, message: "successfully Updated", data: updateTask })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}


//<<<===================== This function is used for Delete Task =====================>>>//
const deleteTask = async (req, res) => {

    try {

        let taskId = req.params.taskId

        let check = await taskModel.findOneAndUpdate({ _id: taskId, status: false }, { status: true })

        if (!check) return res.status(400).send({ status: false, message: "Already Deleted!" })

        return res.status(200).send({ status: true, message: "successfully deleted" })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports = { createTask, getTask, updateTask, deleteTask }