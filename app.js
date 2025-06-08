const express = require("express");
const app = express();
const db = require("./config/db"); // Assign the exported db from ./config/db
const bcrypt = require("bcrypt"); // Assign bcrypt to a variable

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

app.get('/register', (req, res) => {
    res.render("Authentication/register.ejs");
});

app.get('/', (req, res) => {
    res.render("todo/get_todo.ejs");
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
        res.send("Registered Successfully");
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
    res.send("todo save")
})

app.listen(3000, function () {
    console.log("Node js has started on the port 3000");
});