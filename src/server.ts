import app from './app.js';
import config from 'config';
import { connect } from './dbConfig/dbConnection';
import { seedDb } from './common/cronjobs/seedDb';
const PORT = config.get('app.port');

app.listen(PORT, async () => {
  connect()
    .then(() => {
      console.log('Connected to database');
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
      console.log(
        `⚡️[openApi]: Swagger documentation at http://localhost:${PORT}/v1/api-doc/`,
      );
      new seedDb().scheduleJobToFetchApi();
    })
    .catch((error) => {
      console.log('Error connecting to database', error);
    });
});
