const mongoose = require('mongoose');

const url ='mongodb+srv://utkarshsinha:utkarsh121@cluster0.fejcptg.mongodb.net/Rentify?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(url)
.then((result) => {
    console.log('Connected to Database');
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;