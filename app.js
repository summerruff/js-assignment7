
const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('public'))

const todos = [
	{ id: 1, item: 'Learn JavaScript', complete: false },
	{ id: 2, item: 'Learn Express', complete: false },
	{ id: 3, item: 'Build a To Do App', complete: false }
]

app.get('/', (_, response) => {
	response.sendFile('index.html', { root })
})



// GET /api/todos
app.get('/api/todos', (req, res) => {
	res.json(todos)
})

// POST /api/todos
app.post('/api/todos', (req, res) => {
	const { item } = req.body
	const id = todos.length + 1
	const complete = false
	todos.push({ id, item, complete })

	res.json({ id })
})

// PUT /api/todos/:id
app.put('/api/todos/:id', (req, res) => {
	const { id } = req.params
	const task = todos.find(todo => todo.id.toString() === id)
	task.complete = !task.complete // toggle the complete property


	res.json({ id, complete: task.complete })
})


const message = `Server running: http://localhost:${port}`
app.listen(port, () => console.log(message))