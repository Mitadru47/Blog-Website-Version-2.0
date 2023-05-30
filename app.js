const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
var _ = require('lodash');

const uri = "mongodb+srv://Admin-Mitadru:DB1234@clustermg.e4fjgoy.mongodb.net/blogWebsiteDB";
mongoose.connect(uri);

const postSchema = mongoose.Schema ({ title: String, content: String });
const Post = mongoose.model("Post", postSchema); 

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(3000, function() {

  console.log("\nServer Info:\n\nStatus: Active\nPort: 3000\n");
});

app.get("/", function (req, res){

  Post.find()
    .then(function (foundPosts){

      res.render("home", { 
  
        homeIntro: homeStartingContent,
        postList: foundPosts
      });
    })
    .catch(function (error){ console.log(error); });
});

// Routing Parameter - postName
app.get("/posts/:postId", function (req, res){

  // lodash

  // _.lowerCase('--Foo-Bar--');
  // // => 'foo bar'

  Post.findOne({ _id: req.params.postId })
    .then(function(foundPost){

      let urlKey = _.lowerCase(req.params.postId);
    
      res.render("post", {
    
        postTitle: foundPost.title,
        postBody: foundPost.content
      });
    })
    .catch(function (error){ console.log(error); });
});

app.get("/compose", function(req, res){

  res.render("compose", { });
});

app.post("/compose", function (req, res){

  let post = new Post ({ 
  
    title: req.body.compositionTitle,
    content: req.body.composition 
  });

  post.save()
    .then(function (){ res.redirect("/"); })
    .catch(function (error){ console.log(error); });
});

app.get("/about", function(req, res){

  res.render("about", { aboutBody: aboutContent });
});

app.get("/contact", function(req, res){

  res.render("contact", { contactBody: contactContent });
});