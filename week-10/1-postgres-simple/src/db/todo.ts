import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
    try {
        const createTodo = "INSERT INTO todos (number, title, description) VALUES ($1, $2, $3)";
        const values = [userId, title, description];
        const res = await client.query(createTodo, values);
        console.log('Todos Created:', res); // Output insertion result
    } catch (err) {
        console.log('Error during the insertion:', err);
    }
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    try{
        const updateQuery = "UPDATE todos SET done=true WHERE id=$1";
        const res = await client.query(updateQuery,[todoId]);
        console.log("res",res);
        return res;
    }catch(err){
        console.log("Error while updating todos ",err);
    }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    try{
        const getTodos = "SELECT * FROM todos WHERE user_id=$1";
        const res = await client.query(getTodos,[userId]);
        return res.rows[0];
    }
    catch(err){
        console.log("Error while fetching todos ",err)
    }
}