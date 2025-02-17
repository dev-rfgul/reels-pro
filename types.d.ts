import { Connection } from 'mongoose'

declare global {
    var mongoose: {
        conn: Connection | null,
        promise: Promise<Connection> | null
    }
}

export {}


// this file is being used in lib/db.ts to define the global mongoose object.