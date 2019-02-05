import express from 'express';
import cameraRouter from './routes/camera-router';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// TODO: probably remove this and put it in a config? maybe not since osprey needs to run it and it doesn't really matter.
// TODO: Sort this out ^
const dbPassword = 'H8rm4n123';
const db = mongoose.connect(
  `mongodb://osprey-test:${dbPassword}@ds221115.mlab.com:21115/osprey-test`,
  { useCreateIndex: true, useNewUrlParser: true },
);


const app = express();
const port = process.env.PORT || 5656;
// routes go here
app.listen(port, () => {
  console.log(`Server now listening at http://localhost:${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// I'd be curious if it was deliberate to choose a singular noun here.
// It would make some sense that you cannot do a get to /camera/ but I wonder if it would be better to be plural and support getting a list of deployed cameras or something
app.use('/camera/', cameraRouter);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).send(
      JSON.stringify({
        error: `Invalid JSON: ${err}`,
      }),
    );
  }

  console.log(err);
  res.status(500).send({ error: err });
});
