import express from 'express';
import cameraRouter from './routes/camera-router';
import bodyParser from 'body-parser';
import timeout from 'connect-timeout';

require('dotenv').config({ path: '.env' });

const app = express();

// Timeout in ms from config. Default = 10000ms
const timeoutTime = process.env.TIMEOUT_MS || 10000;

// Set up timeout
function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

app.use(timeout(timeoutTime));
app.use(haltOnTimedout);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

export default app;
