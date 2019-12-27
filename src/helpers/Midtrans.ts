import dotenv from "dotenv";


const midtransClient: any = require('midtrans-client');
const env: any = dotenv.config().parsed

const snap: any = new midtransClient.Snap({
    isProduction: (env.MIDTRANS_isProduction.toLowerCase() == 'true'),
    serverKey: env.MIDTRANS_SERVER_KEY,
    clientKey: env.MIDTRANS_CLIENT_KEY,
})

const coreApi: any = new midtransClient.CoreApi({
    isProduction: (env.MIDTRANS_isProduction.toLowerCase() == 'true'),
    serverKey: env.MIDTRANS_SERVER_KEY,
    clientKey: env.MIDTRANS_CLIENT_KEY,
})


export class Midtrans
{
    static createOrderId()
    {
        var generatedID: number =  new Date().getTime()
        var hexadecimal1: string = (generatedID >>> 0 ).toString(16)

        var generatedID = parseInt(generatedID.toString().split('').reverse().join(''))
        var hexadecimal2: string = (generatedID >>> 0 ).toString(16)

        const order_id = `edukatrip-id-${ (hexadecimal1 + hexadecimal2).slice(0,12) }`

        return order_id
    }

    static getInstance()
    {
        return (new Midtrans);
    }

    static async create(params: object)
    {
        try {
            var midtrans = this.getInstance()
            var id = this.createOrderId()
            var options = {
                "transaction_details": {
                    "order_id": id,
                    "gross_amount": 10000
                }
            }
            
            var result = await snap.createTransaction({ ...options, ...params })
        } catch (error) {
            return new Error(error)
        }
        return result
    }
    static async status(order_id: string)
    {
        try {
            
            const response = await snap.transaction.status(order_id)
            console.log(response, order_id)
        } catch (error) {
            console.log(error)
        }
    }
}

export default Midtrans

// (async () => {
//     const status = await Midtrans.status('edukatrip-id-f02989ddb908').then((response: any)=>{
//         console.log('res',response)
//     });
//     console.log(status)
// })()

// (async () => {
//     var options ={
//         "item_details": [{
//             "id": "ITEM1",
//             "price": 10000,
//             "quantity": 1,
//             "name": "Midtrans Bear",
//         }],
//         "customer_details": {
//             "first_name": "John",
//             "last_name": "Watson",
//             "email": "test@example.com",
//             "phone": "+628123456",
//             "billing_address": {
//                 "first_name": "John",
//                 "last_name": "Watson",
//                 "email": "test@example.com",
//                 "phone": "081 2233 44-55",
//                 "address": "Sudirman",
//             },
//             "shipping_address": {
//                 "first_name": "John",
//                 "last_name": "Watson",
//                 "email": "test@example.com",
//                 "phone": "0 8128-75 7-9338",
//                 "address": "Sudirman",
//             }
//         },
//         "enabled_payments": ["credit_card", "mandiri_clickpay", "cimb_clicks","bca_klikbca", "bca_klikpay", "bri_epay", "echannel", "indosat_dompetku","mandiri_ecash", "permata_va", "bca_va", "bni_va", "other_va", "gopay","kioson", "indomaret", "gci", "danamon_online"],
//         "credit_card": {
//             "secure": true,
//         },
//         "expiry": {
//             "start_time": "2020-12-20 18:11:08 +0700",
//             "unit": "minute",
//             "duration": 9000
//         },
//     }

//     const response = await Midtrans.create(options)
//     console.log(response)
// })()

// (async (): Promise => {
//     var options = {
//         "item_details": [{
//             "id": "ITEM1",
//             "price": 10000,
//             "quantity": 1,
//             "name": "Midtrans Bear",
//             "brand": "Midtrans",
//             "category": "Toys",
//             "merchant_name": "Midtrans"
//         }],
//         "customer_details": {
//             "first_name": "John",
//             "last_name": "Watson",
//             "email": "test@example.com",
//             "phone": "+628123456",
//             "billing_address": {
//                 "first_name": "John",
//                 "last_name": "Watson",
//                 "email": "test@example.com",
//                 "phone": "081 2233 44-55",
//                 "address": "Sudirman",
//                 "city": "Jakarta",
//                 "postal_code": "12190",
//                 "country_code": "IDN"
//             },
//             "shipping_address": {
//                 "first_name": "John",
//                 "last_name": "Watson",
//                 "email": "test@example.com",
//                 "phone": "0 8128-75 7-9338",
//                 "address": "Sudirman",
//                 "city": "Jakarta",
//                 "postal_code": "12190",
//                 "country_code": "IDN"
//             }
//         },
//         "enabled_payments": ["credit_card", "mandiri_clickpay", "cimb_clicks","bca_klikbca", "bca_klikpay", "bri_epay", "echannel", "indosat_dompetku","mandiri_ecash", "permata_va", "bca_va", "bni_va", "other_va", "gopay","kioson", "indomaret", "gci", "danamon_online"],
//         "credit_card": {
//             "secure": true,
//             "bank": "bca",
//             "installment": {
//                 "required": false,
//                 "terms": {
//                     "bni": [3, 6, 12],
//                     "mandiri": [3, 6, 12],
//                     "cimb": [3],
//                     "bca": [3, 6, 12],
//                     "offline": [6, 12]
//                 }
//             },
//             "whitelist_bins": [
//                 "48111111",
//                 "41111111"
//             ]
//         },
//     }
// })()
// (new Midtrans).createOrderId()
// const createTransaction = async (params: object) => {
//     try {
//         var id = createOrderId()
//         params = {
//             "transaction_details": {
//                 "order_id": id,
//                 "gross_amount": 200000
//             }, "credit_card":{
//                 "secure" : true
//             }
//         }
//         var result = await snap.createTransaction(params)
//         console.log(result)
//     } catch (error) {
//         console.log(error)
//     }

// }


// const createOrderId = () => {
//     var order_id: string = "EDUKATRIP-ID-";
//     var chars: any = new Date().getTime().toString().match(/.{1,2}/g)
//     chars.reverse()

//     chars.map((data: any, i: string) => {
//         var hexa: any = (data >>> 0).toString(16)
//         order_id += hexa.toString()
//     })

//     return order_id.slice(0,25)
// }
// (async () => {
//     await createTransaction({})
// })()










// const coreApi = new midtransClient.CoreApi({
//     isProduction: (env.MIDTRANS_isProduction.toLowerCase() == 'true'),
//     serverKey: env.MIDTRANS_SERVER_KEY,
//     clientKey: env.MIDTRANS_CLIENT_KEY,
// })

// let parameter = {
//     "payment_type": "credit_card",
//     "transaction_details": {
//         "gross_amount": 120000,
//         "order_id": "test-transaction-54321",
//     },
//     "credit_card":{
//         "token_id": '4811 1111 1111 1114', // change with your card token
//         "authentication": true
//     }
// }

// let param = {
//     "transaction_details": {
//         "order_id": "test-transaction-123",
//         "gross_amount": 200000
//     }, "credit_card":{
//         "secure" : true
//     }
// }
// snap.createTransaction(param).then((data: any) => {
//     console.log(data)
// })


// console.log(coreApi)

// // coreApi.get(parameter)
// //     .then((chargeResponse: any)=>{
// //         console.log('chargeResponse:');
// //         console.log(chargeResponse);
// //     }).catch((e: any) => {
// //         console.log(e.rawHttpClientData.data)
// //     });



































// // const midtransClient = require('./../../index.js');
// const midtransClient = require('midtrans-client'); // use this if installed via NPM

// // initialize snap client object
// let snap = new midtransClient.Snap({
//     isProduction : (env.MIDTRANS_isProduction.toLowerCase() == 'true'),
//     serverKey : env.MIDTRANS_SERVER_KEY,
//     clientKey : env.MIDTRANS_CLIENT_KEY
// });

// // Alternative way to initialize snap client object:
// // let snap = new midtransClient.Snap();
// // snap.apiConfig.set({
// //     isProduction : false,
// //     serverKey : 'YOUR_SERVER_KEY',
// //     clientKey : 'YOUR_CLIENT_KEY'
// // })

// // Another alternative way to initialize snap client object:
// // let snap = new midtransClient.Snap();
// // snap.apiConfig.isProduction = false;
// // snap.apiConfig.serverKey = 'YOUR_SERVER_KEY';
// // snap.apiConfig.clientKey = 'YOUR_CLIENT_KEY';

// // prepare Snap API parameter ( refer to: https://snap-docs.midtrans.com ) minimum parameter example:
// let parameter = {
//     "transaction_details": {
//         "order_id": "test-transaction-1236",
//         "gross_amount": 30000
//     },
//     "item_details": [{
//         "id": "ITEM1",
//         "price": 10000,
//         "quantity": 1,
//         "name": "Midtrans Bear",
//         "brand": "Midtrans",
//         "category": "Toys",
//         "merchant_name": "Midtrans"
//     },{
//         "id": "ITEM2",
//         "price": 20000,
//         "quantity": 1,
//         "name": "Midtrans Panda",
//         "brand": "Midtrans",
//         "category": "Toys",
//         "merchant_name": "Midtrans"
//     }],
//     "customer_details": {
//         "first_name": "John",
//         "last_name": "Watson",
//         "email": "test@example.com",
//         "phone": "+628123456",
//         "billing_address": {
//             "first_name": "John",
//             "last_name": "Watson",
//             "email": "test@example.com",
//             "phone": "081 2233 44-55",
//             "address": "Sudirman",
//             "city": "Jakarta",
//             "postal_code": "12190",
//             "country_code": "IDN"
//         },
//         "shipping_address": {
//             "first_name": "John",
//             "last_name": "Watson",
//             "email": "test@example.com",
//             "phone": "0 8128-75 7-9338",
//             "address": "Sudirman",
//             "city": "Jakarta",
//             "postal_code": "12190",
//             "country_code": "IDN"
//         }
//     },
//     "enabled_payments": ["credit_card", "mandiri_clickpay", "cimb_clicks","bca_klikbca", "bca_klikpay", "bri_epay", "echannel", "indosat_dompetku","mandiri_ecash", "permata_va", "bca_va", "bni_va", "other_va", "gopay","kioson", "indomaret", "gci", "danamon_online"],
//     "credit_card": {
//         "secure": true,
//         "bank": "bca",
//         "installment": {
//             "required": false,
//             "terms": {
//                 "bni": [3, 6, 12],
//                 "mandiri": [3, 6, 12],
//                 "cimb": [3],
//                 "bca": [3, 6, 12],
//                 "offline": [6, 12]
//             }
//         },
//         "whitelist_bins": [
//             "48111111",
//             "41111111"
//         ]
//     },
//     "bca_va": {
//         "va_number": "12345678911",
//         "free_text": {
//             "inquiry": [
//                 {
//                     "en": "text in English",
//                     "id": "text in Bahasa Indonesia"
//                 }
//             ],
//             "payment": [
//                 {
//                     "en": "text in English",
//                     "id": "text in Bahasa Indonesia"
//                 }
//             ]
//         }
//     },
//     "bni_va": {
//         "va_number": "12345678"
//     },
//     "permata_va": {
//         "va_number": "1234567890",
//         "recipient_name": "SUDARSONO"
//     },
//     "callbacks": {
//         "finish": "https://demo.midtrans.com"
//     },
//     "expiry": {
//         "start_time": "2020-12-20 18:11:08 +0700",
//         "unit": "minute",
//         "duration": 9000
//     },
//     "custom_field1": "custom field 1 content",
//     "custom_field2": "custom field 2 content",
//     "custom_field3": "custom field 3 content"
// };

// // create transaction
// // snap.createTransaction(parameter)
// //     .then((transaction: any)=>{
// //         // transaction token
// //         let transactionToken = transaction.token;
// //         console.log('transactionToken:',transactionToken);

// //         // transaction redirect url
// //         let transactionRedirectUrl = transaction.redirect_url;
// //         console.log('transactionRedirectUrl:',transactionRedirectUrl);
// //     })
// //     .catch((e: any)=>{
// //         console.log('Error occured:',e.message);
// //     });

// // alternative way to create transactionToken
// snap.createTransactionToken(parameter)
//     .then((transactionToken: any)=>{
//         console.log('transactionToken:',transactionToken);
//     })
//     .catch((e: any)=>{
//         console.log('Error occured:',e.message);
//     });

// // alternative way to create transactionRedirectUrl
// snap.createTransactionRedirectUrl(parameter)
//     .then((transactionRedirectUrl: any)=>{
//         console.log('transactionRedirectUrl:',transactionRedirectUrl);
//     })
//     .catch((e: any)=>{
//         console.log('Error occured:',e.message);
//     });

// // Aync / await way
// async function snapAsync(){
//     let transactionToken = await snap.createTransactionToken(parameter);
//     console.log('transactionToken:',transactionToken);
// }
// snapAsync();


