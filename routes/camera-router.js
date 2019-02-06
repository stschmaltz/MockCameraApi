import express from 'express';
import get from 'lodash.get';
import {
  getListOfCameras,
  getCameraImageCount,
  getCameraDataUsage,
  getCameraById,
  deployNewCamera,
  getMostDataUsedImagesByCamera,
} from './operations/camera-operations';

const cameraRouter = express.Router();
cameraRouter
  .route('/')
  .get((req, res) => {
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
  const id = req.params.camera_id;
  const maxCount = 100;
  const aggregate = get(req, 'query.aggregate');
  const { pagesize, offset } = extractPaginationQueryParams(req.query);

  if (aggregate === 'most-data') {
    const count = get(req, 'query.count') || maxCount;
    getMostDataUsedImagesByCamera(req, res, id, count);

    return;
  }
  getCameraById(req, res, id, pagesize, offset);
});

// I chose to make this return a default max page size and the first page if you don't specify both
export const extractPaginationQueryParams = query => {
  const maxPageSize = 10000;
  const { pagesize, pagecount } = query;

  // I wasn't sure if I should handle negatives here.
  // I figure the consumer of this api is us and I don't need to guard against weird query params
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
