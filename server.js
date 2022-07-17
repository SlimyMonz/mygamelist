// routes
const usersModel = require('./backend/routes/usersRoute');
const gameDbModel = require('./backend/routes/gameDbRoute')
const steamModel = require('./backend/routes/steamRoute');

// config DB folder stuff
const {connectDB, app, PORT, express, path} = require("./backend/db");
connectDB();

app.use('/api/users', usersModel)
app.use('/api/games', gameDbModel)
app.use('/api/steam', steamModel)


//start Node + Express server listener
app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});

// Server static assets if in production
if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}