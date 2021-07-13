const routes = require('next-routes')();

routes
  .add('/campaigns/new', '/campaigns/new')
  .add('/campaigns/:address', '/campaigns/show')
  .add('/campaigns/:address/requests', '/campaigns/requests/index')
  .add('/campaigns/:address/requests/new', '/campaigns/requests/new')
  .add('/campaigns/newTest', '/campaigns/newTest')
  .add('/campaigns/test/:address', '/campaigns/test/show')
  .add('/api/GetDownloadUrl','/api/GetDownloadUrl')
  .add('/campaigns/indexTest', '/campaigns/indexTest')
  .add('/campaigns/indexMynode', '/campaigns/indexMynode');

module.exports = routes;
