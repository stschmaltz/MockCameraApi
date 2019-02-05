import { sendError } from './common-operations';
import Camera from '../../models/camera-model';

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
        sendError(err);
        return;
      }
      res.json(result);
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
        sendError(err);
        return;
      }
      res.json(result);
    },
  );
};

export const getListOfCameras = (req, res) => {
  Camera.find({}, (err, cameras) => {
    if (err) {
      sendError(err);
      return;
    }
    res.json(cameras);
  })
    .select('camera_id')
    .sort('camera_id');
};

export const getCameraById = (req, res, id, queryParams) =>
  Camera.findById(
    id,
    { images: { $slice: [queryParams.offset, queryParams.pageSize] } },
    (err, cameras) => {
      if (err) {
        sendError(err);
        return;
      }
      if (!hasTimedOut(req) && !hasSentHeader(res)) res.json(cameras);
    },
  );

const hasTimedOut = req => req.timedOut;
const hasSentHeader = res => res.headersSent;

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
