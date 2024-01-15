import { useState } from "react";

type Todo = {
  value: string;
  readonly id: number;
};

export const App = () => {
  const [text, setText] = useState("");
  const [todoArray, setTodoArray] = useState<Todo[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
    };

    setTodoArray((todoArray) => [newTodo, ...todoArray]);
    setText("");
  };

  const handleEdit = (id: number, value: string) => {
    setTodoArray((todoArray) => {
      const newTodoArray = todoArray.map((todo) => {
        if (todo.id === id) {
          return { ...todo, value: value };
        }
        return todo;
      });

      console.log("=== Original todoArray ===");
      todoArray.map((todo) => {
        console.log(`id: ${todo.id}, value: ${todo.value}`);
      });

      return newTodoArray;
    });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input type="text" value={text} onChange={(e) => handleChange(e)} />
        <input type="submit" value="追加" onSubmit={handleSubmit} />
      </form>
      <ul>
        {todoArray.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="text"
                value={todo.value}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
