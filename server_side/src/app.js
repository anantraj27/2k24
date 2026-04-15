import express from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import routes from './routes/index.js';
import './configuration/passport.js'; // only imports strategies
import { createServer } from "http";
import { Server } from 'socket.io';
import { RedisStore } from "connect-redis";
import { createClient } from "redis";
import cors from "cors";
// Node.js → runtime
// http.createServer → actual server
// Express → request handler
// app.listen → shortcut
// createServer(app) → advanced control


dotenv.config();

const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: "https://fresher-2k24.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
  })
);

const io = new Server(server);
//socket.io

io.on("connection",(socket)=>{
  
  


   socket.on("typing", () => {
  socket.broadcast.emit("type_message",{

      message :'user is typing',
      serverId :socket.id
    });
});
  socket.on("chat_message",(msg)=>{

    io.emit("chat_message",{

      message :msg,
      serverId :socket.id
    })
  })
})
/* ------------------ BASIC MIDDLEWARE ------------------ */
// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//     methods :[PUT, PATCH, DELETE]
//   })
// );
const __dirname = dirname(
    fileURLToPath(import.meta.url)
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    express.static(
        path.join(__dirname, '../public')
    )
)
/* ------------------ SESSION ------------------ */
const redisClient = createClient({
  url: process.env.REDIS_URL
});


redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

await redisClient.connect();

const redisStore = new RedisStore({
  client: redisClient
});
app.set("trust proxy", 1);
app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
  maxAge: 1000 * 60 * 60 * 24 * 7,
  httpOnly: true,
  secure: true,
  sameSite: "none"
}
  })
);

/* ------------------ PASSPORT ------------------ */

app.use(passport.initialize());
app.use(passport.session());

/* ------------------ ROUTES ------------------ */

app.use('/', routes);

export { app, server };

/*
Key Features of app.use()

    Middleware Definition: app.use() 
    is used to define middleware that executes on every request,
    regardless of the HTTP method (GET, POST, PUT, DELETE, etc.).
    Path Pattern Matching: app.use() can be used to define middleware
    that runs only for specific URL paths. If no path is specified, 
    it applies to all routes.
    Order Matters: The order in which app.use() 
    is called affects the order in which middleware functions are executed.
    Global Middleware: It is often used to set up global middleware like
    logging, body parsing, authentication, or error handling.


*/
