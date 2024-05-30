const {
    handleAddReport,
    handleGetAllReports,
    handleAddDisasterType,
    handleGetAllDisasterTypes,
    handleGetReportById,
    handleGetDisasterTypeById,
  } = require('./handler');
  
  const routes = [
    {
      method: 'POST',
      path: '/reports',
      handler: handleAddReport,
    },
    {
      method: 'GET',
      path: '/reports',
      handler: handleGetAllReports,
    },
    {
      method: 'GET',
      path: '/reports/{id}',
      handler: handleGetReportById,
    },
    {
      method: 'POST',
      path: '/disaster-types',
      handler: handleAddDisasterType,
    },
    {
      method: 'GET',
      path: '/disaster-types',
      handler: handleGetAllDisasterTypes,
    },
    {
      method: 'GET',
      path: '/disaster-types/{id}',
      handler: handleGetDisasterTypeById,
    },
  ];
  
  module.exports = routes;
  