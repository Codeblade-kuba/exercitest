import express from 'express';

const app = express();

app.use('/', (req, res) => {
  res.send('hello world');
});

const PORT = 5000;

app.listen(PORT, console.log(`Server Running on Port: http://localhost:${PORT}`));
