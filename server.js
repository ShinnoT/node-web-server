const express = require('express');
const hbs = require('hbs');
//hbs (handlebars) is good for rendering pages
//also good for rendering partials
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//middleware --> third party addon that tells express:
//'you usually do this, but do this instead'

app.use((request, response, next) => {
  let now = new Date().toString();
  let log = `${now}: ${request.method} ${request.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) => {
    if (error) {
      console.log('unable to access server');
    }
  });
  // only runs when i do http request
  next();
});

app.use((request, response, next) => {
  response.render('maintenance.hbs');
});
// because we didnt call next(); whatever you do, it will render the maintenance page
// because it stops everything after middleware from running

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (request, response) => {
  // response.send('<h1>Hello express!</h1>');
  // response.send({
  //   name: 'shinno',
  //   hobby: 'BJJ'
  // });
  response.render('home.hbs', {
    pageTitle: 'welcome page',
    // currentYear: new Date().getFullYear(),
    welcomeMessage: 'hello welcome to practice app'
  });
});

app.get('/about', (request, response) => {
  // response.send('about page');
  response.render('about.hbs', {
    pageTitle: 'about page',
    // currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errormessage: 'unable to blah blah'
  });
});

app.listen(3000);
console.log('server running');
