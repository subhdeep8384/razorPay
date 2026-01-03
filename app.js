const dotenv = require(`dotenv`)
const express = require(`express`)
const cors = require(`cors`)
const Razorpay = require(`razorpay`)
const app = express() ;
app.use(cors({
    origin : "http://localhost:5173",
    methods : ["GET" , "POST"]
}));
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const mongoose = require(`mongoose`);
mongoose.connect(`mongodb+srv://subhdeep:lFMP5093JnbumewM@payments.8x9u1tj.mongodb.net/`).then(() => console.log(`MongoDB Connected`)).catch((err) => console.log(err))


const paymentSchema = new mongoose.Schema({
    orderId :{
        type :String ,
        required : true
    } ,

})
const razorpay = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID ,
    key_secret : process.env.RAZORPAY_KEY_SECRET
})
app.post('/order' , async  (req , res )=>{

    const options = {
        amount : Number(req.body.amount) ,
        currency : req.body.currency || "INR" ,
        receipt : `rcpt_${req.body.receipt}_${Date.now()}` ,
    } ;

    try{
        const order = await razorpay.orders.create(options) ;
        if(!order) {
            return res.status(500).json({
                message : "Error in creating order"
            })
        }
        return res.status(200).json(order)
    }catch(e){
        return res.status(500).json({
            message : e.message
        })
    }
})
app.listen(3000 , () =>{
    console.log(`Server is running on port 3000`)
})