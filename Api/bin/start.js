// #!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from "../app.js";
import createDebugger from "debug";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createIndexes } from "../Models/realEstate.js";

dotenv.config();
const debug = createDebugger("rental-app:server");

async function connectToMongoDB() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    await createIndexes();
     
    startServer();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}


/**
 * Get port from environment and store in Express.
 */

function startServer() {
  /**
   * Get port from environment and store in Express.
   */
  const port = normalizePort(process.env.PORT || "3000");
  app.set("port", port);

  /**
   * Create HTTP server.
   */
  const server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);

  /**
   * Normalize a port into a number, string, or false.
   */
  function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   */
  function onError(error) {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */
  function onListening() {
    const addr = server.address();
    const bind =
      typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
    console.log(`server listenening on http://localhost:${port}`);
  }
}

// Call the connectToMongoDB function to connect to MongoDB
connectToMongoDB();
