// import cameraRouter, { extractPaginationQueryParams } from '../camera-router';
// import request from 'supertest';
// import express from 'express';

// Hey so you'll notice I don't have any real tests. I just simply could not get my mock to work, so I couldn't mock out the operations.
// This was a big bummer but I figured I would leave my final attempt at mocking in comments (to show it's the same as https://jestjs.io/docs/en/es6-class-mocks)
// and yeah I tried all 4 of the ways they said.
// I also read a handful of blogs and I can't see what's different about mine..
// I decided I might as well show the test descriptions for tests that I would have written. At least you can see my test thought process that way...

// const cameraOperationsMock = jest.mock('../operations/camera-operations');
// jest.setTimeout(20000); // 20 seconds
// describe('camera-router', () => {
//   const app = express();
//   app.use('/camera/', cameraRouter);
//   describe('/camera/', () => {
//     describe('GET', () => {
//       describe('no query params', () => {
//         it('should call getListOfCameras', async () => {
//            This was going to be the general idea of the tests. call each endpoint with all query params that lead to code paths and assert the correct output and functions were called
//            const response = await request(app).get('/camera/');
//            expect(response.statusCode).toBe(200);
//            expect(response.data).toBe({I would have mocked the response in the mock and then had the correct expected output here});
//            expect(cameraOperationsMock.getListOfCameras).toHaveBeenCalledTimes(1);
//            expect(cameraOperationsMock.getListOfCameras).toHaveBeenCalledWith(req, res);
//         });
//       });
//     });
//   });
// });

describe('camera-router', () => {
  describe('/', () => {
    describe('GET', () => {
      describe('w/ no query params', () => {
        it('should call getListOfCameras', async () => {});
      });

      describe('w/ aggregation query param', () => {
        describe('when aggregation is image-count', () => {
          it('should call getCameraImageCount with correct parameters', async () => {});
        });

        describe('when aggregation is data-usage', () => {
          it('should call getCameraImageCount with correct parameters', async () => {});
        });
      });

      describe('POST', () => {
        it('should call deployNewCamera with correct parameters', async () => {});
      });
    });

    describe('/:camera_id', () => {
      describe('GET', () => {
        describe('w/ no query params', () => {
          it('should call getCameraById with default pagination with correct parameters', () => {});
        });

        describe('w/ aggregate query params', () => {
          describe('when aggregate is most-data', () => {
            it('should call getMostDataUsedImagesByCamera with correct parameters', () => {});
          });
        });

        describe('w/ pagination query params', () => {
          it('should call getCameraById with correct parameters', () => {});
        });
      });
    });
    
    describe('extractPaginationQueryParams', () => {
      describe('when both pagesize and count are passed in', () => {
        it('should return pagesize and offset equal to pagecount * pagesize', () => {});
      });
      describe('when pagesize is missing', () => {
        it('should return max page size and an offset of 0', () => {});
      });
      describe('when pagecount is missing', () => {
        it('should return max page size and an offset of 0', () => {});
      });
    });
  });
});
