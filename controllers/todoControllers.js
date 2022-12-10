import TodoModel from "../model/TodoModel.js";

export const getAllTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find();
    if (todos) {
      res.status(200).json(todos);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let token = 10001;
export const createTodos = async (req, res) => {
  const { userName, numbers } = req.body;
  try {
    const findTodoByToken = await TodoModel.findOne({ token });

    if (findTodoByToken) {
      token = token + 1;
      const todo = new TodoModel({ userName, numbers, token });
      const newTodo = await todo.save();
      res.status(201).json(newTodo);
    } else {
      const todo = new TodoModel({ userName, numbers, token });
      const newTodo = await todo.save();
      res.status(201).json(newTodo);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
