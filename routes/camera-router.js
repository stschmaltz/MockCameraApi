import express from 'express';
import Camera from '../models/camera-model';
import { runInNewContext } from 'vm';

const cameraRouter = express.Router();
cameraRouter
  .route('/')
  .get((req, res) => {
    Camera.find({}, (err, cameras) => {
      if (err) {
        res.json(500, err);
        return;
      }
      res.json(cameras);
    });
  })
  .post((req, res) => {
    console.log(req.body);

    const cameraOptions = { ...req.body, _id: req.body.camera_id };
    console.log(cameraOptions);
    const camera = new Camera(cameraOptions);

      const resp = camera.save((err, camera) => {
        if (err) {
          res.status(500).send(`an error has occurred: ${err}`);
          return 'nay';
        }
        res.status(201).send(camera);
      });

    console.log(resp);
  });

export default cameraRouter;
