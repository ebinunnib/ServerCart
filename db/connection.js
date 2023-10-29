const mongoose=require('mongoose')

mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("______________mongodbatlass connected______________");
}).catch((error)=>{
    console.log("_____________mdb not connected_____________");
    console.log(error);
})