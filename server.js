console.log("Launching it  !!!")


require('dotenv').config()
const express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs')
const random = require('random')



const app = express();

const users =[];

app.use(bodyParser.urlencoded({ extended: true } ))
app.set('view-engine','ejs')
app.use(express.static("public"));



//app.use(bodyParser.json())

app.get('/home',(req,res)=>{

 res.render('index.ejs')

})

app.get('/movie',(req,res)=>{

    var rand = random.int(min = 0, max = 300)
    var imageUrl;

    fs.readFile('top_rated.json', function (err, data) {
        var jsonData = JSON.parse(data)
        console.log('data:'+jsonData.results.length+"random : "+rand)

        console.log(jsonData.results[rand].element+jsonData.results[rand].element.poster_path) 
        imageUrl='http://image.tmdb.org/t/p/w185/'+jsonData.results[rand].element.poster_path
         
    
   // res.send(jsonData.results[rand].element)
    res.render('response.ejs',{
        name:jsonData.results[rand].element.title,
        ratings:jsonData.results[rand].element.vote_average,
        desc:jsonData.results[rand].element.overview,
        imgpath:imageUrl,
        release_date:jsonData.results[rand].element.release_date

    })
        
     })



})


app.post('/register',async (req,res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email:req.body.email,
            password:hashedPassword
        })
        
        console.log(users)
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }


})



app.listen(3000)
