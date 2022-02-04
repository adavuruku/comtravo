import app from './app.js';
import config from 'config';
import { connect } from './dbConfig/dbConnection';
import { seedDb } from './common/cronjobs/seedDb';
import { scheduleJobToFetchApi } from './common/cronjobs/jobs/cronJobs';
const PORT = config.get('app.port');

app.listen(PORT, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  console.log(
    `⚡️[openApi]: Swagger documentation at http://localhost:${PORT}/v1/api-doc/`,
  );
});
