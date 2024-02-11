import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
    try{
        const newUser = await prisma.user.create({
            data:{
                username,
                password,
                name
            }
        })
        console.log("newUser ",newUser);
        return newUser;
    }
    catch(err){
        console.log("Error while creating user ",err);
    }
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    const user = prisma.user.findFirst({
        where:{
            id:userId
        }
    })
    console.log(user);  
    return user;
}