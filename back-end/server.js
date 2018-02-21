'use strict'

const Hapi = require('hapi')
const Monk = require('monk')

const server = Hapi.server({ 
    host: 'localhost', 
    port: 3001
})

const getStoryCollection = async () => {
    const connectionString = "mongodb://administrator:administrator1@ds241658.mlab.com:41658/lowbrow"
    const db = Monk(connectionString)
    const story = await db.get("story")
    return story
}

server.route({
    method: 'GET',
    path:'/', 
    handler: (request, h) => {
        return { message: 'hello world' }
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
})

server.route({
    method: 'GET',
    path:'/story', 
    handler: async (request, h) => {
        const storyCollection = await getStoryCollection()
        const stories = await storyCollection.find()
        console.log(stories)
        return {stories}
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
})

async function start() {

    try {
        await server.start()
    }
    catch (err) {
        console.log(err)
        process.exit(1)
    }

    console.log('Server running at:', server.info.uri)
}

start()