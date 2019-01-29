const app = require('express')();
const Joi = require('joi');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const schema = {
    foodType : Joi.string().required(),
    timeToDeliver : Joi.string().regex(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/).required(),
    beverage : Joi.number().min(1).max(4).required()
}
const selectBeverage = function(beverage){
    if (beverage==1){
        beverage = 'water'
    }
    else if(beverage==2){
        beverage = 'coke'
    }
    else if(beverage==3){
        beverage = 'soda'
    }
    else if(beverage==4){
        beverage = 'juice'
    }
    console.log(`Here is the ${beverage} you ordered`)
}
app.post("/data",(req,res)=>{
    var {foodType,timeToDeliver,beverage} = req.body
    Joi.validate({
        foodType : foodType,
        timeToDeliver : timeToDeliver,
        beverage : beverage
    },schema,function(err,value){
        if (err){
            console.log(err.message)
        }
        else {
            console.log('The waiter has taken your order and will bring your food in 8 seconds')
            
            setTimeout(function () {
                selectBeverage(beverage)
                
            }, 3000)
            setTimeout(function(){
                console.log(`I am sorry for the delay, here is the ${foodType} you ordered`)
            },10000)
        }
    })
})
app.listen(3000,function(){
    console.log('server fine')})

