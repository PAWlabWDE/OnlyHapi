const hapi = require('hapi');
const inert = require('inert');

// const server = hapi.server({ //tworzy serwer
//     port: 3000,
//     host: 'localhost',
//     routes: {
//         cors: true
//     }
// });


var server = new hapi.Server(+process.env.PORT, '0.0.0.0');

///////////////////////////////////// route
//ruting, serwer na rządanie get zwróci to po return
server.route({
        method: 'GET',
        path: '/aboutus',
        handler: (req, h) => {
            return '<h1>About Us</h1>'
        }
    })
    //ruting całej strony, potrzebny "inert" chyba do tego
server.route({
    method: 'GET',
    path: '/staticpage',
    handler: (req, h) => {
        return h.file('./frontend-react/staticpage.html')
    }
})

server.route({ //parametr name będzie wyświetlony (w ścieżce podać bez klamer)
    method: 'GET',
    path: '/users/{name}',
    handler(request, reply) {
        return (request.params.name); //takie drukowanie powoduje podatność na ataki XSS
    }
});


server.route({
    method: 'GET',
    path: '/userss/{name?}', // path: '/photos/{name}.jpg' 
    // path: '/users/{name*2}' w adresie: /users/jan/kowalski
    // path: '/users/{name*}' przechwytuje całą ścieżkę
    handler(request, reply) {
        if (request.params.name) {
            return (encodeURIComponent(request.params.name));
        } else {
            return ('Anonymous');
        }
    }
});

server.route({
    method: 'GET',
    path: '/search',
    handler(request, reply) {
        return (request.query); //zwraca obiekt w którym są dane z adresu
    }
});
//biblioteka Joi pozwoli na walidację query z adresu (endpointa)



//uruchamia serwer hapi
const bootUpServer = async() => {
    await server.register(inert); //do renderowani calego htmla chyba XDD
    await server.start();
    console.log(`Server is running at ${server.info.uri}`);
    process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
    })
}

bootUpServer(); //wywołuje funkcję uruchamiającą serwer