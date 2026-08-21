import express from 'express'

const app = express()
const Port = 9000

app.get('/',(req, res)=>{
    res.send({status: 'Successful', message:'Mughal Store Api Setup is Ready'})
})

app.listen(Port, ()=>{
    console.log('Your app is runnig at port ' + Port);
})

