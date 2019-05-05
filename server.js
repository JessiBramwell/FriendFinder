// Dependencies
const express = require('express');

// Express Configuration
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('app/public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

// Listener
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

