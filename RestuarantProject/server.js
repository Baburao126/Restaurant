const sequelize=require('./config/dbconfig');
const express=require('express');
const cors = require('cors');
const routes = require('./routes/restuarantRoutes');
const Routes=require('./routes/userRoutes');
const OrderRooutes=require('./routes/basketOrderRoutes')
const Routess=require('./routes/bulkOrderRoutes');
const ConfirmOrderRoutes=require('./routes/confirmOrdersRoutes');


const App=express();
App.use(cors());
sequelize.authenticate()
    .then(()=>{
        console.log('database connected');

    })

    .catch(err=>{
        console.log(err);
    })
sequelize.sync()
App.use(express.json());

App.use('/users',Routes);
App.use('/restuarant',routes);
App.use('/basket',OrderRooutes);
App.use('/bulkorder',Routess)
App.use('/confirmorder',ConfirmOrderRoutes);



App.listen(8000,()=>{
    console.log('server running on http://localhost:8000');
})
