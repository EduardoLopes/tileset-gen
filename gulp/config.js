var app = './app';
var dist = './dist';

module.exports = {
  dir: {
    app: app,
    dist: dist
  },
  filesToCopy: [
    app + '/apple-touch-icon-precomposed.png',
    app + '/favicon.ico',
    app + '/humans.txt',
    app + '/robots.txt'
  ]
};
