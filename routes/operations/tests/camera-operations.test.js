// Please see my comment on camera-operations.test.js for why I don't have real tests here
// TLDR: I couldn't sort out mocking for some reason (I've mocked in jest many times)
// after a series of attempts so I aborted and wrote test descriptions as a way to show some sort of test thought process
describe('common-operations', () => {
  describe('getCameraImageCount', () => {
    it('calls aggregate with expected parameters', () => {});

    describe('when successful', () => {
      it('calls res.json() with result', () => {});
    });

    describe('when error occurs', () => {
      it('calls send error function', () => {});
    });
  });

  describe('getCameraDataUsage', () => {
    it('calls aggregate with expected parameters', () => {});

    describe('when successful', () => {
      it('calls res.json() with result', () => {});
    });

    describe('when error occurs', () => {
      it('calls send error function', () => {});
    });
  });

  describe('getListOfCameras', () => {
    it('calls find with expected parameters', () => {});

    describe('when successful', () => {
      it('calls res.json() with result', () => {});
    });

    describe('when error occurs', () => {
      it('calls send error function', () => {});
    });
  });

  describe('getCameraById', () => {
    it('calls findById with expected parameters', () => {});

    describe('when successful', () => {
      it('calls res.json() with result', () => {});
    });

    describe('when error occurs', () => {
      it('calls send error function', () => {});
    });
  });

  describe('getMostDataUsedImagesByCamera', () => {
    it('calls aggregate with expected parameters', () => {});

    describe('when successful', () => {
      it('calls res.json() with result', () => {});
    });

    describe('when error occurs', () => {
      it('calls send error function', () => {});
    });
  });

  describe('deployNewCamera', () => {
    it('calls save with expected parameters', () => {});

    describe('when successful', () => {
      it('calls res.json() with result', () => {});
    });

    describe('when error occurs', () => {
      it('calls send error function', () => {});
    });
  });
});
