import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import { addTodo, getAllTodos } from "@/utils/supabaseFunctions";
import { supabase } from "../utils/supabase";

//todos=todoリストを保持する配列、title=入力フォームの文字列(1件分)
const TodoApp = () => {
  const [todos, setTodos] = useState<any>([]);
  const [title, setTitle] = useState<string>("");

  //データベースから全todoを取得→todosにセットする
  useEffect(() => {
    const getTodos = async () => {
      const todos = await getAllTodos();
      setTodos(todos);
    };
    getTodos();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //Todo追加、title=todoの入力内容
    await addTodo(title); //supabaseに新しいtodoを追加
    const todos = await getAllTodos(); //最新のtodoを再取得
    setTodos(todos); //画面に表示

    setTitle(""); //入力フォームを空にする
  };

  return (
    <section className="text-center mb-2 text-2xl font-medium">
      <h3>Supabase Todo App</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className="mr-2 shadow-lg p-1 bg-orange-100 rounded-md"
          onChange={(e) => setTitle(e.target.value)} //入力された文字列をstateに保存
          value={title}
        />
        <button
          className="shadow-md border-2 px-1 py-1 rounded-lg bg-green-200"
          type="submit"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} setTodos={setTodos} />
    </section>
  );
};

export default TodoApp;
