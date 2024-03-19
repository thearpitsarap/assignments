import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string
  },
  Variables : {
		userId: string;
    blogId: string
	}
}>();

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/users/signup', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const exists = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password
      }
    })
    if (exists == null) {
      await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          password: body.password,
        }
      })
      return c.json({ "Message": "User Created Successfully" })
    }
    else {
      return c.json({ "Message": "User Already Exists" })
    }
  }
  catch (e) {
    console.log(e);
    return c.json({ "Error": e });
  }
})

app.post('/users/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const exists = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password
      }
    })
    if(exists!=null){
      const jwt = await sign({id:exists.id},c.env.JWT_SECRET)
      return c.json({"JWT":jwt})
    }
    
    return c.text("User Doesn't exist")
  }
  catch (e) {
    return c.text("Error while SignIn")
  }
})

app.use('/posts/*', async (c, next) => {
  const jwt = c.req.header("Auth")
  if(!jwt){
    c.status(401);
    return c.text("User not Authorised");
  }
  const user = jwt?.split(" ")[1];
  const payload = await verify(user,c.env.JWT_SECRET);

  if(!payload){
    c.status(401);
    return c.text("User UnAuthorised");
  }
  c.set('userId', payload.id);
  await next();
})

app.post('/posts',async (c)=>{

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get('userId');
  const body = await c.req.json();
  try{
    await prisma.post.create({
      data:{
        title: body.title,
        content:body.content,
        authorId:userId
      }
    })
    return c.text("Blog created succuessfully");
  }
  catch(e){
    c.status(400);
    return c.text("Error while creating Blog");
  }
})

app.get('/posts', async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try{
    const blogs = await prisma.post.findMany({});
    return c.json({blogs});
  }
  catch(e){
    c.status(401);
    return c.text("Error while feetching BLogs");
  }
})

app.get('/posts/:id',async (c)=>{

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try{
    const id = c.req.param('id');

    const post = await prisma.post.findUnique({
      where:{
        id
      }
    })

    if(post==null){
      return c.text("Blog Doesn't Exist");
    }
    return c.json({post});
  }
  catch(e){
    return c.text("Error while fetching Blog");
  }
})

app.put('/posts/:id', async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try{
    const userId = c.get('userId');
    const blogId = c.req.param('id');
    const body = await c.req.json();
    
    const post = await prisma.post.findUnique({
      where:{
        id:blogId
      }
    })

    if(post?.authorId!=userId){
      return c.text("You are not owner of this blog");
    }

    await prisma.post.update({
      where:{
        id:blogId
      },
      data:{
        title:body.title,
        content:body.content
      }
    })
    return c.text("Blog created succuessfully");

  }
  catch(e){
    c.status(401);
    return c.text("Error while updating Blog");
  }
})

export default app