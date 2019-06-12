const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const book = require('./controller/book');
const user = require('./controller/user');
const { auth } = require('./middleware/auth');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build'));


//GET
app.get('/api/auth', auth, (req, res) => {
    res.json({
        isAuth: true,
        id: req.user._id,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname,
    })
})

app.get('/api/logout', auth, user.logout)

app.get('/api/getBook', book.findOne)

app.get('/api/books', book.findAll)

app.get('/api/getUser', user.findOne)

app.get('/api/users', user.findAll)

app.get('/api/userPosts', book.userPosts)

app.get('/api/getReviewer', user.getReviewer)

//POST
app.post('/api/book', book.create);
app.post('/api/register', user.create);
app.post('/api/login', user.login);
app.post('/api/book_update', book.update);

//UPDATE

app.put('/api/user', user.update)

//DELETE
app.delete('/api/delete_book', book.delete);
app.delete('/api/user', user.delete);

if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build','index.html' ))
    })
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is running ${port}`);
})