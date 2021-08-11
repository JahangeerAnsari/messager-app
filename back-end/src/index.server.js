const express = require('express');
const app = express();
const env = require('dotenv');
const bodyParser = require('body-parser');
const { static } = require("express");
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
// env config

env.config();
require('./database/index')

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use("/public", static(path.join(__dirname, "/src/uploads")));


// SOCKET INITIALIZATION
const users = {};
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});
app.set('io', io);
io.on("connection", socket => {
    console.log('someone connect to the socket id', socket.id);

    socket.on('forceDisconnect', function(){
        socket.disconnect();
        console.log("socket  disconnect")
    });
    
    socket.on('oppnents', (opponentUser) => {
        console.log("Server : ", opponentUser);
        users[opponentUser] = socket.id
        // we tell every users present her
        io.emit('oppnents', users)
    })

    socket.on("send_message", async (data) => {
        console.log("data", data);
        const savedMessage = await saveMessage(data);
        console.log("====> savedMessage : ", savedMessage)
        if (savedMessage.status === 201) {
            console.log("====> new message emiting : ")

            io.emit("new_message", savedMessage);
        }
        else {
            io.emit("error_emit", savedMessage);
        }


    });
    socket.on("get_all_users", async () => {
        const resp = await getUsers();
        console.log("====> resp : ", resp)
        if (resp.status === 200) {
            io.emit("return_all_users", resp);
        }
        else {
            io.emit("error_emit", resp);
        }


    });
    socket.on("get_conversations", async (data) => {
        const resp = await getConversations(data);
        console.log("====> resp : ", resp)
        if (resp.status === 200) {
            io.emit("return_conversations", resp);
        }
        else {
            io.emit("error_emit", resp);
        }


    });
});

// apiRoutes
// const messageRoute = ('./')
const cartRoutes = require('./routes/cart.route')
const productRoutes = require('./routes/product.route');
const categoryRoutes = require('./routes/category.route')
const userRoutes = require('./routes/user.route');
const adminRoute = require('./routes/adminRoutes/admin.routes');
const messageRoute = require('./routes/messageRoute');
const { saveMessage, getConversations } = require('./controllers/messageController');
const { getAllUsers, getUsers } = require('./controllers/user.controller');

// api
app.use('/api', userRoutes);
app.use('/api', adminRoute);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes)
app.use('/api', messageRoute)

server.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})
