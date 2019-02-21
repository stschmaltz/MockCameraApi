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
