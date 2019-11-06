const hapi = require('hapi');
const inert = require('inert');

const server = hapi.server({ //tworzy serwer
    port: 3000,
    host: 'https://trellohapi.herokuapp.com/',
    routes: {
        cors: true
    }
});


//const server = new hapi.Server(+process.env.PORT, '0.0.0.0');

///////////////////////////////////// route
server.route({
    method: 'GET',
    path: '/',
    handler: function(request,reply){
        return('It is wokring');
    }
});
//ruting, serwer na rządanie get zwróci to po return
server.route({
        method: 'GET',
        path: '/a',
        handler: function(req, h)  {
             return ('<h1>About Us</h1>');
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











server.route({
    method: 'GET',
    path: '/',
    handler: function(request,reply){
        return('It is wokring');
    }
});
server.route({
    method: 'GET',
    path: '/conect',
    handler: function(request,reply){
    
        connection.connect(function(err) {
          if (err) {
            return console.error('error: ' + err.message+err.stack);
          }         
          console.log('Connected to the MySQL server.');
        });
        connection.query('CREATE TABLE [IF NOT EXISTS] Column(column_id INT AUTO_INCREMENT PRIMARY KEY,title VARCHAR(255) NOT NULL);')
        connection.query('select table_schema as database_name, table_name from information_schema.tables');
        return "Polaczylem sie lub nie xddd";
    }
});

server.start(function(){
    console.log('Server is running');
})