const { MercadoPagoConfig, Payment, MercadoPago } = require('mercadopago')
const client = new MercadoPagoConfig(
    { 
        accessToken: 'APP_USR-7186513777788039-091623-be1b55d679dcfeaec50e2646381835b5-473604831', 
        options: { 
            timeout: 5000, 
            idempotencyKey: 'abccfcccc' 
        } 
    }
);
const payment = new Payment(client);

const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const app=express()

app.use((request,response,next) =>{
    response.header('Access-Control-Allow-Origin','*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())
    next()
})

console.log();


const bodyParserJSON=bodyParser.json()

app.post('/criar-pix',cors(), bodyParserJSON, async function(request, response){
    const dadosBody=request.body
    const body = { 
        transaction_amount: dadosBody.transaction_amount,
        description: dadosBody.description,
        payment_method_id: dadosBody.paymentMethodId,
        payer: {
            email: dadosBody.email,
            identification: {
                type: dadosBody.identificationType,
                number: dadosBody.number
            }
        }
    }
    const requestOptions = { idempotencyKey: '123f33' }

    payment.create({ body, requestOptions })
        .then((result) => {
            console.log('DEU BOM!!!!');
            console.log(result)
        })
        .catch((error) => {
            console.log('ERRO!!!!!!');
            console.log(error)
        });
})

app.listen('8080',function(){
    console.log('API no ar!!!')
})