'use strict'

const Hapi = require('hapi')
const Monk = require('monk')
const ServerConfig = require("./serverConfig")

const server = Hapi.server({ 
    host: 'localhost', 
    port: 3001
})

const getStoryCollection = async () => {
    const db = Monk(ServerConfig.mongoConnString)
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

server.route({
    method: 'POST',
    path: '/story',
    handler: async (request, h) => {
        const story = await getStoryCollection()
        story.insert(request.payload)
        console.log(request.payload)
        return h.response()
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
})

server.route({  
    method: 'DELETE',
    path: '/story/{id}',
    handler: async (request, h) => {
        const story = await getStoryCollection()
        story.remove(request.params.id)
        return h.response()
        
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
})


server.route({  
    method: 'PATCH',
    path: '/flag/{id}',
    handler: async (request, h) => {
        const story = await getStoryCollection()
        story.update({_id: request.params.id},{$set: {flagged: true}})
        return h.response()
        
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
})

// server.route({  
//     method: 'DELETE',
//     path: '/story/{id}',
//     handler: async (request, reply) => {
//         const story = await getStoryCollection()
//         story.remove({
//             _id: request.params.id
//         }, function (err, result) {

//             if (err) {
//                 return reply(Boom.wrap(err, 'Internal MongoDB error'));
//             }

//             if (result.n === 0) {
//                 return reply(Boom.notFound());
//             }

//             reply().code(204);
//         })
        
//     }
// });

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