const express = require("express");
const app = express();
const db = require("./config/db"); // Assign the exported db from ./config/db
const bcrypt = require("bcrypt"); // Assign bcrypt to a variable
const { where } = require("sequelize");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

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
    try {
        const {email, password} = req.body
        const isUsername = await db.users.findOne({where: {email}})
        const isPassword =await bcrypt.compare(password, isUsername.password)
        if(!isUsername || !isPassword){
            return res.status(401).json({message: "Invalid Credentials"})
        }
        res.redirect("/")
        
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
})

app.get('/register', (req, res) => {
    res.render("Authentication/register.ejs");
});

app.get('/', async(req, res) => {
    const datas = await db.todos.findAll()
    console.log(datas)
    res.render("todo/get_todo.ejs", {datas :datas});
});

app.get('/add', (req, res) => {
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