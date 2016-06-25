'use strict';

const Hapi = require('hapi');
const Wit = require('node-wit').Wit;
const Promise = require('promise');


const actions = {
    say(sessionId, context, message, cb) {
        console.log(message);
        cb();
    },
    merge(sessionId, context, entities, message, cb) {
        cb(context);
    },
    error(sessionId, context, error) {
        console.log(error.message);
    }
};

function witProcess(text) {
    const context = {};
    return new Promise(function(resolve, reject) {
        client.message(text, context, function(error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

const token = 'SKXDSJQMQBNUU3GGT3GB7OCQSD3FL6G6';

const client = new Wit(token, actions);

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});




// Add the route
server.route({
    method: 'GET',
    path: '/intent',
    handler: function(request, reply) {
        witProcess(request.query.q)
        .then(reply, reply);
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
