import express from 'express';
import get from 'lodash.get';
import {
  getListOfCameras,
  getCameraImageCount,
  getCameraDataUsage,
  getCameraById,
  deployNewCamera,
} from './operations/camera-operations';

const cameraRouter = express.Router();
cameraRouter
  .route('/')
  .get((req, res) => {
    console.log(req.query.aggregate);
    const aggregate = get(req, 'query.aggregate');
    if (aggregate) {
      if (aggregate === 'image-count') {
        getCameraImageCount(req, res);
        return;
      }
      if (aggregate === 'data-usage') {
        getCameraDataUsage(req, res);
        return;
      }
    }
    getListOfCameras(req, res);
  })
  .post((req, res) => {
    const cameraOptions = { ...req.body, _id: req.body.camera_id };

    if (!req.timedout) {
      deployNewCamera(req, res, cameraOptions);
    }
  });

cameraRouter.use('/:camera_id', (req, res, next) => {
  next();
});

cameraRouter.route('/:camera_id').get((req, res) => {
  const paginationParams = extractPaginationQueryParams(req.query);
  const id = req.params.camera_id;
  getCameraById(req, res, id, paginationParams);
});

const extractPaginationQueryParams = query => {
  const maxPageSize = 10000;
  const { pagesize, pagecount } = query;

  if (!pagesize || !pagecount) {
    return {
      pagesize: maxPageSize,
      offset: 0,
    };
  }

  return {
    pagesize: parseInt(pagesize),
    offset: pagecount * (pagesize || 0),
  };
};
export default cameraRouter;
