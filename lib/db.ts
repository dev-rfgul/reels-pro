import mongoose from 'mongoose'

// adding a ! mark after a variable means i am sure that this variable is not null and it will always have a value
const Mongo_URI = process.env.MONGO_URI!

if (!Mongo_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env.local')
}
console.log(Mongo_URI)

let cached = global.mongoose;
if (!cached) {
    global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10,
        }

        cached.promise = mongoose.
            connect(Mongo_URI, opts)
            .then((() => mongoose.connection))
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null;
    }

    return cached.conn
}