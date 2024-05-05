const router = require('express').Router()
const { getCollection, ObjectId } = require('../todo-db')


// const todos = [
// 	{ id: 1, item: 'Learn JavaScript', complete: false },
// 	{ id: 2, item: 'Learn Express', complete: false },
// 	{ id: 3, item: 'Build a To Do App', complete: false }
// ]

// GET /api/todos (getting all tasks)
router.get('/', async (req, res) => {
    const collection = await getCollection('todo-api', 'todos')
    const todos = await collection.find().toArray()

	res.json(todos)
})

// POST /api/todos (adding new task)
router.post('/', async (req, res) => {
	const { item } = req.body
    const complete = false
    const collection = await getCollection('todo-api', 'todos')
    const result = await collection.insertOne({ item, complete })
    const id = await collection.countDocuments()

	res.json({ id })
})

// PUT /api/todos/:id (toggling completion)
router.put('/:id', async (req, res) => {
	const { id } = req.params
    const collection = await getCollection('todo-api', 'todos')
    const todo = await collection.findOne({ _id: new ObjectId(id) })
    const complete = !todo.complete  // toggle the complete property
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { complete } })

	res.json({ id: todo.id, complete })
})

module.exports = router