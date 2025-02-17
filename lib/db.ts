import mongoose from 'mongoose'


const Mongo_URI = process.env.MONGO_URI

if (!Mongo_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env.local')
}
console.log(Mongo_URI)

