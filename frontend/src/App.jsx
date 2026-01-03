import './App.css'
import axios from 'axios'
function App() {
  const handleClick = async  (e) =>{ 
    e.preventDefault()
    const response = await axios.post(`http://localhost:3000/order`, {
      "amount" : 50000 ,
      "currency" : "INR",
      "receipt" :"QQWEEE"
  }) ;
  var options = {
    "key": import.meta.env.VITE_RAZORPAY_KEY, 
    "amount": Number(response.data.amount), 
    "currency": response.data.currency,
    "name": "Chut bhandar",
    "description": "your money will help us to buy chuts",
    "image": "https://example.com/your_logo",
    "order_id": response.data.id, 
    "handler": function (response){
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
    },
    "prefill": {
        "name": "user",
        "email": "your@email.com", 
        "contact": "+919876543210"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
var rzp1 = new window.Razorpay(options);
rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
  rzp1.open();
  }
  return (
    <>
     <button onClick={handleClick}>cheakout page</button>
    </>
  )
}

export default App
