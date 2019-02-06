import { sendError } from './common-operations';
import Camera from '../../models/camera-model';

const hasTimedOut = req => req.timedOut;
const hasSentHeader = res => res.headersSent;

export const getCameraImageCount = (req, res) => {
  Camera.aggregate(
    [
      {
        $project: {
          camera_id: 1,
          numberOfImages: {
            $cond: {
              if: { $isArray: '$images' },
              then: { $size: '$images' },
              else: 'NA',
            },
          },
        },
      },
      { $sort: { numberOfImages: -1 } },
    ],
    (err, result) => {
      if (err) {
        sendError(res, err);
        return;
      }
      if (!hasTimedOut(req) && !hasSentHeader(res)) res.json(result);
    },
  );
};

export const getCameraDataUsage = (req, res) => {
  Camera.aggregate(
    [
      {
        $project: {
          camera_id: 1,
          dataUsage: { $sum: '$images.file_size' },
        },
      },
      { $sort: { dataUsage: -1 } },
    ],
    (err, result) => {
      if (err) {
        sendError(res, err);
        return;
      }
      if (!hasTimedOut(req) && !hasSentHeader(res)) res.json(result);
    },
  );
};

export const getListOfCameras = (req, res) => {
  Camera.find({}, (err, cameras) => {
    if (err) {
      sendError(res, err);
      return;
    }
    res.json(cameras);
  })
    .select('camera_id')
    .sort('camera_id');
};

export const getCameraById = (req, res, id, pagesize, offset) => {
  Camera.findById(
    id,
    { images: { $slice: [offset, pagesize] } },
    (err, cameras) => {
      if (err) {
        sendError(res, err);
        return;
      }
      if (!hasTimedOut(req) && !hasSentHeader(res)) res.json(cameras);
    },
  );
};

export const getMostDataUsedImagesByCamera = (req, res, id, count) => {
  Camera.aggregate(
    [
      {
        $match: {
          camera_id: parseInt(id),
        },
      },
      { $unwind: '$images' },
      {
        $sort: {
          'images.file_size': -1,
        },
      },
      {
        $limit: parseInt(count),
      },
    ],
    (err, result) => {
      if (err) {
        sendError(res, err);
        return;
      }
      if (!hasTimedOut(req) && !hasSentHeader(res)) res.json(result);
    },
  );
};

export const deployNewCamera = (req, res, cameraOptions) => {
  const camera = new Camera(cameraOptions);

  camera.save((err, camera) => {
    if (err) {
      res.status(500).send(`an error has occurred: ${err}`);
      return 'nay';
    }
    res.status(201).send(camera);
  });
};
