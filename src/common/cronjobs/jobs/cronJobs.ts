import * as cron from 'node-cron';
import { seedDb } from '../seedDb';

/**
 * @return {null}
 */
const scheduleJobToFetchApi = () => {
  // console.log('here running');
  // const e = {
  //   flight_db_id: '2101_2019-08-10T05:25:00.000Z',
  //   price: 148.87,
  //   origin_name: 'Schonefeld',
  //   destination_name: 'Schonefeld',
  //   departure_date_time_utc: '2019-08-10T05:25:00.000Z',
  //   arrival_date_time_utc: '2019-08-10T07:20:00.000Z',
  //   flight_number: '2101',
  //   duration: 115,
  // };
  // const t = new Flight({ ...e });
  // await Promise.all([t.save()]);
  // await t.save();
  cron.schedule('*/20 * * * * *', () => {
    console.log('running a task every 1 minute');
    new seedDb().fetchApiRecord();
  });
};

export { scheduleJobToFetchApi };
