const express=require("express");
const app=express();
const port=8080;
const path=require("path");

// uuid -> package which give the unique id every time
const { v4: uuidv4 } = require('uuid');

// IMPORTING package of method override
var methodOverride = require('method-override')


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {    
        id:uuidv4() ,
        username:"ApanaCollege",
        content :"I love Coding"
    },
    {
        id:uuidv4() ,
        username:"Vivek Kumar Singh",
        content :"Hard work is important to achieve sucess"
    },
    {
        id:uuidv4() ,
        username:"Pratik Verma",
        content :"Smart work is important to achieve sucess"
    }
]


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts"); 
})

app.get("/posts/:id", (req,res)=>{
     let {id}=req.params;
     console.log(id);
    // res.send("request working");
     let post=posts.find((p)=> id === p.id);
     console.log(post);
     res.render("show.ejs", {post});

     });

// patch request -> updating the content 
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=> id === p.id);
    post.content=newContent;
    console.log(post)
   // console.log(newContent);   
    res.redirect("/posts");
});


// Edit the page route
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post=posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});


// delete route
app.delete("/posts/:id",(req,res) =>{
    let {id} = req.params;
    posts=posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})
app.listen(port,()=>{
    console.log("listening to port 8080");
})