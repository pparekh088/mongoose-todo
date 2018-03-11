const mongoose = require('mongoose');
const express = require("express");
const PORT = 8080;
const uri = 'mongodb://localhost:27017/todoApp';
const Todo = require('./models/todo');

mongoose.connect(uri);

const app = express();
const todos = [];

app.get("/todos", (req, res) => {
	//use .find on our todo model to grab all todo
	Todo
		.find()
		.then(docs =>{
				//IF we find send them back to use 
			res.status(200).json({ 
				message: 'success',
				payload: docs
			 });
		}).catch(err =>{
				//If error send an error to user
			res.status(500).json({ 
				message: err.message
			 });
		});
});

app.post("/todos/:todo", (req, res) => {
	// 1. init new TODO instance
	const todo = new Todo({
		// 2. pass in the value of the todo desc from params
		description: req.params.todo
	})
	// 3. Try and save. 
	todo
		.save()
		.then(doc =>{
				// 4. on suceess send success messgae
			res.status(201).json({ 
				message: 'success',
				payload: doc
			 });
		}).catch(err =>{
				// 5. on error send an error message 
				res.status(500).json({ 
					message: err.message
				 });
		})
});

app.put("/todos/:index/:nextTodo", (req, res) => {
	const { index, nextTodo } = req.params;
	let todo = todos[index];

	if (todo) {
		todos[index] = nextTodo;
		res.status(200).json({ todo: todos[index] });
	} else {
		res.status(404).json({
			message: "The todo does not exist."
		});
	}
});

app.delete("/todos/:id", (req, res) => {
	// 1. change index to id
	// 2. find matching todo from db and remove
	// 3. on success remove and send success message
	// 4. on error send error
	const id = req.params.id;
	
	Todo
		.findByIdAndRemove(id)
		.then(doc =>{
			res.status(200).json({ 
					message : 'sucess',
					payload : doc
			 });
		}).catch(err =>{
			res.status(404).json({
				message: err.message
			});
		});
});

app.patch('/todos/:id/complete', (req,res) =>{
	const id = req.params.id;
	
	Todo
		// 1. fins the todo with the id 
		// 2. update the todo
		.findByIdAndUpdate(id, {
			completed: true
		})
			// 3. on sucess send back the todo
		.then(doc =>{
			res.status(200).json({ 
					message : 'sucess',
					payload : doc
			 });
		})
		// 4. on error send the error
		.catch(err =>{
			res.status(404).json({
				message: err.message
			});
		});
})
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}.`);
});
