import { supabase } from "../utils/supabase";

export const getAllTodos = async () => {
  const todos = await supabase.from("todo").select("*");
  return todos.data;
};

export const addTodo = async (title: string) => {
  const { data, error } = await supabase.from("todo").insert([{ title }]);

  if (error) {
    console.error("insert Error:", error.message);
    return;
  }
  console.log("insert success", data);

  return data;
};

export const deleteTodo = async (id: number) => {
  await supabase.from("todo").delete().eq("id", id);
};
