import * as cron from 'node-cron';
import axios from 'axios';
import config from 'config';
import { Flight } from '../../app/schema/flight/flight.schema';
export class seedDb {
  /**
   * @param {String} url The api url
   * @param {String} token The authorization token
   * @return {Object}
   */
  fetchURL(url: string, token?: string) {
    return token
      ? axios.get(url, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        })
      : axios.get(url);
  }

  resolvePromise(t: any) {
    return t.map((e: any) => {
      if (e.status === 'fulfilled') {
        return e.value.data;
      } else {
        return {};
      }
    });
  }
  /**
   * @return {Object}
   */
  async fetchApiRecord(): Promise<any> {
    try {
      const firstUrl = 'https://discovery-stub.comtravo.com/source1';
      const secondUrl = 'https://discovery-stub.comtravo.com/source2';

      const fetchOne = this.fetchURL(firstUrl);
      const fetchTwo = this.fetchURL(
        secondUrl,
        config.get('app.app_api_token'),
      );

      const t = await Promise.allSettled([fetchOne, fetchTwo]);

      const y = this.resolvePromise(t);
      await this.formatFlightResponse(y);
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * @param {Array} flight The different flight payllads
   * @return {Array} the formatted flights
   */
  async formatFlightResponse(flight: Record<any, any>[]) {
    const newAllFlights = [];
    const flightSize = flight.length; //the two promise
    for (let i = 0; i < flightSize; i++) {
      if (flight[i].flights) {
        const flightRecord = flight[i].flights;
        const allFlightSize = flightRecord.length;
        for (let j = 0; j < allFlightSize; j++) {
          const { price, slices } = flightRecord[j];
          if (slices.length > 0) {
            newAllFlights.push(
              ...slices.map((e: Record<any, any>) => {
                return {
                  flight_db_id: `${e.flight_number}_${e.departure_date_time_utc}`,
                  price: price,
                  ...e,
                };
              }),
            );
          }
        }
      }
    }
    await this.persistToDb(newAllFlights);
  }

  /**
   * @param {Array} flight The different flight payloads
   * @return {null}
   */
  async persistToDb(flight: Record<any, any>[]) {
    try {
      if (flight.length > 0) {
        const newRecord = flight.map((e) => {
          return new Flight({
            ...e,
          }).save();
        });
        const w = await Promise.allSettled([...newRecord]);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * @return {null}
   */
  async scheduleJobToFetchApi() {
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
    cron.schedule('*/10 * * * * *', function () {
      console.log('running a task every minute');
      this.fetchApiRecord();
    });
  }
}
