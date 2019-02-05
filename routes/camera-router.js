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

cameraRouter.use('/:camera_id', (req, res, next) => {
  console.log('I run first');
  next();
});

cameraRouter.route('/:camera_id').get((req, res) => {
  console.log(req.params.camera_id);
  console.log(req.query);
  const queryParams = extractPaginationQueryParams(req.query);
  console.log(queryParams);
  Camera.findById(
    req.params.camera_id,
    { images: { $slice: [queryParams.offset, queryParams.pageSize] } },
    (err, cameras) => {
      // console.log(cameras);
      console.log(err);
      if (err) {
        res.status(500).send(`An error has occurred: ${err}`);
        return 'nay';
      }
      if (!req.timedOut && !res.headersSent) res.json(cameras);
    },
  );
});

const extractPaginationQueryParams = query => {
  console.log('WE IN', query);
  const maxPageSize = 10;
  const { pageSize, pageCount } = query;
  console.log(pageSize, pageCount);
  if (!pageSize || !pageCount) {
    return {
      pageSize: maxPageSize,
      offset: 0,
    };
  }

  return {
    pageSize: parseInt(pageSize),
    offset: pageCount * (pageSize || 0),
  };
};
export default cameraRouter;
