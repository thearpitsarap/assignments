import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    try{
        const res = await prisma.todo.create({
            data:{
                userId,
                title,
                description
            }
        })
        console.log("res",res);
        return res;
    }
    catch(err){
        console.log("Error while creating todo ",err);
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
        const res = await prisma.todo.update({
            where:{id:todoId},
            data:{
                done:true
            }
        })
        console.log("res ",res);
        return res;
    }
    catch(err){
        console.log("Error while updating todo ",err);
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
        const res = await prisma.todo.findFirst({
            where:{
                id:userId
            }   
        })
        console.log("res",res);
        return res;
    }
    catch(err){
        console.log("Error while fetching todos ",err);
    }
}