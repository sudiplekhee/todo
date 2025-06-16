const express = require("express");
const app = express();
const db = require("./config/db"); // Assign the exported db from ./config/db
const bcrypt = require("bcrypt"); // Assign bcrypt to a variable
const { where } = require("sequelize");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const jwt = require("jsonwebtoken");
const isLogInOrNot = require("./middleware/isLogin");

const cookieParser = require("cookie-parser")
app.use(cookieParser())
// Removed duplicate /about route
// app.get('/', (req, res) => {
//     res.send("This is slice page")
// });
// app.get('/about', (req, res) => {
//     res.send("This is about page")
// });
// app.get('/about', (req, res) => {
//     res.render("home.ejs")
// });
app.get('/login', (req, res) => {
    res.render("Authentication/login.ejs");
});

app.post("/login",async(req,res)=>{
    const {email, password} = req.body
    const users = await db.users.findAll({
        where : {
            email : email,
            
        }
    })
    if(users.length==0){
        res.send("Not registered email")
    }
    else{
        //now check password , first --> plain password(form bata aako),
        //second hashed password already register garda table ma haleko
        const idPasswordMartch = bcrypt.compareSync(password,users[0].password)
        if(idPasswordMartch){
            //token generation
            const token = jwt.sign({ name : "sudip"},"secretkey",{
                expiresIn : "1d"
            })
            // jwt.sign({ name : "k lukaune"},"key", { kati din samma lukaune})
            res.cookie("token", token)
            res.redirect("/")
            // res.send("Logged in successfully")
        } else {
            res.send("Invalid credentials")
        }
    }
})
app.get('/register', (req, res) => {
    res.render("Authentication/register.ejs");
});

app.get('/', async(req, res) => {
    const datas = await db.todos.findAll()
    res.render("todo/get_todo.ejs", {datas :datas});
});

app.get('/add', isLogInOrNot , (req, res) => {
    res.render("todo/add_todo.ejs");
});

app.get('/update', (req, res) => {
    res.render("todo/update_todo.ejs");
});

app.post("/register", async (req, res) => {
    const { username, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
        return res.send("password and confirm password didnt match");
    }
    try {
        await db.users.create({
            username: username,
            password: bcrypt.hashSync(password, 10),
            email: email
        });
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.send("Error during registration");
    }
});

app.post("/add", async(req,res)=>{
    const {title, description, date, status} = req.body
    await db.todos.create({
        title : title,
        description : description,
        date : date,
    })
    res.redirect("/")
})

app.listen(3000, function () {
    console.log("Node js has started on the port 3000");
});