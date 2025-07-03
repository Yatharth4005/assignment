require('dotenv').config();
const express = require('express');
const app = express();
const schoolsRouter = require('./routes/schools');

app.use(express.json());
app.use('/', schoolsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 