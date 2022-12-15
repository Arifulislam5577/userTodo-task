import TodoModel from "../model/TodoModel.js";

export const getAllTodos = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    let todos;

    if (Object.keys(req.query).length && startDate && endDate) {
      todos = await TodoModel.find({
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      }).populate("userInfo");
    } else {
      todos = await TodoModel.find().populate("userInfo");
    }

    if (todos) {
      res.status(200).json(todos);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let token = 10001;
export const createTodos = async (req, res) => {
  const { userName, numbers, userInfo } = req.body;

  try {
    const findLastDocument = await TodoModel.find().sort({ _id: -1 }).limit(1);
    if (findLastDocument.length) {
      token = findLastDocument[0].token + 1;
      const todo = new TodoModel({ userName, numbers, token, userInfo });
      await todo.save();
      return res.status(201).json(todo);
    } else {
      const todo = new TodoModel({ userName, numbers, token, userInfo });
      await todo.save();
      return res.status(201).json(todo);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
