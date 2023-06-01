const dotenv = require('dotenv');
const app = require('./app.js');




process.on('uncaughtException',(err)=>{
   console.log(`ERROR: ${err.message}`);
   console.log('Shutting down the server due to uncaughtException');
   server.close(()=>{
       process.exit(1);
   })
})


dotenv.config({path:"C:/Users/janar/OneDrive/Desktop/ShopPlaza/backend/Config/config.env"});
require('./Config/Database.js');

const Port = process.env.PORT || 4000;
const Hostname = process.env.HOSTNAME;

app.listen(Port,Hostname,(err)=>{
   if(err) throw err;
   console.log(`Server is running at http://${Hostname}:${Port}`);
});


process.on('unhandledRejection',(err)=>{
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(()=>{
        process.exit(1);
    })
});