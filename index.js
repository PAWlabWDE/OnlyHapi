'use strict';

const Hapi = require('@hapi/hapi');
const Joi = require('joi');  

const init = async () => {

    // const server = Hapi.server({
    //     port: 3000,
    //     host: 'localhost'
    // });
    //niby może dzięki temu na heroku zadziaął
    var server = new Hapi.Server(+process.env.PORT, '0.0.0.0');

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    },
    );
    server.route({
        method: 'GET',
        path: '/ts',
        handler: (request, h) => {

            return 'Hello ts!';
        }
    },
    );
    server.route({
        method: 'GET',
        path: '/users/{name?}',
        handler(request, reply) {
          if (request.params.name) {
            return(encodeURIComponent(request.params.name));
          } else {
            return('Anonymous');
          }
        },
        config: {
          validate: {
            params: {
              name: Joi.number()
            }
          }
        }
      });
      
      server.route({
        method: 'GET',
        path: '/photos/{name}.jpg',
        handler(request, reply) {
            return(encodeURIComponent(request.params.name));
        }
      });
      server.route({
        method: 'GET',
        path: '/search',
        handler(request, reply) {
          return(request.query);
        },
        config: {
          validate: {
            query: {
              text: Joi.string().required(),
              page: Joi.number().default(1),
              lang: Joi.only(['pl', 'gb', 'de']).default('pl')
            }
          }
        }
      });
      // aplikacja
const contacts = [];

server.route({
  method: 'GET',
  path: '/contacts',
  handler(request, reply) {
    return({
      contacts
    });
  }
});

server.route({
  method: 'POST',
  path: '/contacts',
//   config: {
//     validate: {
//       payload: Joi.object({
//         contact: Joi.object({
//           name: Joi.string().required().default("Mateusz"),
//           surname: Joi.string().required().default("Barański")
//         }).required()
//       })
//     }
//   },
  handler(request, reply) {
//  const contact = request.payload.contact;
//   const tempName = request.params.name;
//   const tempSurname = request.params.surname;
//   console.log(tempName + " "+tempSurname);
//    contact :Joi.object({
//       name : tempName,
//       surname : tempSurname
//   })
//     contacts.push(contact);
//     return({contact}).code(201);
const person =[request.query.name,request.query.surname];
//const contact =request.query.name;
contacts.push(person);
return person;
  }
});

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();