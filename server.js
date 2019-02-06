import mongoose from 'mongoose';
import app from './app';

require('dotenv').config({ path: '.env' });

// TODO: probably remove this and put it in a config? maybe not since osprey needs to run it and it doesn't really matter.
// TODO: Sort this out ^
const dbPassword = 'H8rm4n123';
mongoose.connect(
  `mongodb://osprey-test:${dbPassword}@ds221115.mlab.com:21115/osprey-test`,
  { useCreateIndex: true, useNewUrlParser: true },
);

const port = process.env.PORT || 5656;

app.listen(port, () => {
  console.log(`Server now listening at http://localhost:${port}`);
});
