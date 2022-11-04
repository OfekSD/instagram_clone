import express, {Request, Response} from 'express'
import {sign} from 'jsonwebtoken'
import  {genSalt,hash, compare} from 'bcrypt'
import db, {sql} from './db'
const PORT = 5000;
const SECRET_KEY = process.env.SECRET_KEY || '';


const app = express()



const hashPassword = async (password: string, saltRounds = 10) => {
    try {
      // Generate a salt
      const salt = await genSalt(saltRounds)
  
      // Hash password
      return await hash(password, salt)
    } catch (error) {
      console.error(error)
    }
  
    // Return null if error
    return null
}


const createUserKey = (id:string) => {
    return sign({
        "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-default-role": "user",
        "x-hasura-user-id": id
    }},SECRET_KEY,{expiresIn:'24h'})

}


app.use(express.json())

app.listen(PORT, () => {
    console.log(`Auth server is up in ${PORT}`);
})

app.post('/register', async (req: Request, res: Response) => {
    // TODO: Add Validation 
    let { username, password, email }: {username: string, password:string, email: string} = req.body;
    email = email.toLowerCase()
    
    let results = await db.query(
        sql`SELECT count(CASE WHEN LOWER(USERNAME)=${username.toLowerCase()} THEN 1 END) as is_username, count(CASE WHEN EMAIL=${email} THEN 1 END) as is_email 
        FROM USERS`)
    const { is_username, is_email } = results[0];
    
    if (is_username||is_email){
        return res.status(400).json({is_username:is_username, is_email:is_email })
    }

    const hashedPassword = await hashPassword(password);
 
    results = await db.query(sql`INSERT INTO USERS(USERNAME, PASSWORD, EMAIL) 
    VALUES(${username}, ${hashedPassword}, ${email})
    RETURNING ID`
    )
    const { id } = results[0]
    const token = createUserKey(id)
    res.send({token})
    
    
})
app.post('/login', async (req: Request, res: Response) => { 

    
    let { username , password }: {username: string, password: string}  = req.body
    
    if  (!(username && password)){
        return res.status(400).send('username or password empty')
    }

    
    let results = await db.query(sql`SELECT PASSWORD AS PWD FROM USERS WHERE LOWER(USERNAME)=${username.toLowerCase()}`)
    if (results.length == 0){
        return res.status(400).send('user does not exists')
    }
    let { pwd } = results[0]
    if (!await compare(password,pwd)){
        return res.status(400).send('pwd does not exists')
    }
    results = await db.query(sql`SELECT ID FROM USERS WHERE LOWER(USERNAME)=${username.toLowerCase()}`)
    let {id} = results[0]
    const token = createUserKey(id)


    return res.send({token: token})

})