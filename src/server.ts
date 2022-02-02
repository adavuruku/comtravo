import app from './app.js';
import config from 'config';
const PORT = config.get('app.port');

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
