import * as cron from 'node-cron';
import axios from 'axios';
import config from 'config';
import { Flight } from '../../app/schema/flight/flight.schema';
import { RoundTripMain } from '../../app/schema/flight/roundTripMain.schema';
import { RoundTrip } from '../../app/schema/flight/roundTrip.schema';
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

  // resolvePromise(t: any) {
  //   return t.map((e: any) => {
  //     if (e.status === 'fulfilled') {
  //       return e.value.data;
  //     } else {
  //       return {};
  //     }
  //   });
  // }

  /**
   * @param {Array} flight The different flight payllads
   * @return {Array} the resolve or rejected promises
   */
  async settleApiCalls(apiCalls: any[]) {
    try {
      if (apiCalls.length > 1) {
        return await Promise.allSettled([...apiCalls]);
      }
      throw Error();
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * @param {Array} flight The different flight payllads
   * @return {Array} the formatted flights
   */
  async formatFlightResponse(flight: Record<any, any>[]) {
    try {
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
    } catch (e) {
      throw new Error(e);
    }
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
        // const w = await Promise.allSettled([...newRecord]);
        const w = await this.settleApiCalls([...newRecord]);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * @param {Array} flight The different flight payloads
   * @return {null}
   */
  async persistToRoundTripDb(flight: Record<any, any>[]) {
    try {
      const arrSize = flight.length;
      if (arrSize > 0) {
        for (let i = 0; i < arrSize; i++) {
          const flightExist = await RoundTripMain.findOne({
            flight_db_id: flight[i].flight_db_id,
          });
          if (!flightExist) {
            //insert each of the trip node
            const t1 = new RoundTrip({
              ...flight[i].slice[0],
            }).save();
            const t2 = new RoundTrip({
              ...flight[i].slice[1],
            }).save();

            const insertedRecs: any = await this.settleApiCalls([t1, t2]);
            const allArtist = [];
            for (let j = 0; j < insertedRecs.length; j++) {
              if (insertedRecs[j].status === 'fulfilled') {
                allArtist.push(insertedRecs[j].value._id);
              }
            }
            // link each trip back to parent
            await RoundTripMain.findOneAndUpdate(
              {
                flight_db_id: flight[i].flight_db_id,
              },
              {
                $addToSet: {
                  slice: { $each: allArtist },
                },
                price: flight[i].price,
              },
              {
                upsert: true,
              },
            );
          }
        }
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * @param {Array} flight The different flight payllads
   * @return {Array} the formatted flights
   */
  async formatFlightRoundTripResponse(flight: Record<any, any>[]) {
    try {
      const newAllFlights = [];
      const flightSize = flight.length; //the two promise
      for (let i = 0; i < flightSize; i++) {
        if (flight[i].flights) {
          const flightRecord = flight[i].flights;
          const allFlightSize = flightRecord.length;
          for (let j = 0; j < allFlightSize; j++) {
            const { price, slices } = flightRecord[j];
            const flight_db_id = `${slices[0].flight_number}_${slices[0].departure_date_time_utc}_${slices[1].flight_number}_${slices[1].departure_date_time_utc}`;
            const newObject = {
              flight_db_id,
              price,
              slice: [slices[0], slices[1]],
            };
            newAllFlights.push(newObject);
          }
        }
      }
      await this.persistToRoundTripDb(newAllFlights);
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * @return {Object}
   */
  async fetchApiRecord(): Promise<any> {
    try {
      const firstUrl = 'https://discovery-stub.comtravo.com/source1';
      const secondUrl = 'https://discovery-stub.comtravo.com/source2';

      // await Flight.deleteMany();
      // await RoundTrip.deleteMany();
      // await RoundTripMain.deleteMany();

      const fetchOne = this.fetchURL(firstUrl);
      const fetchTwo = this.fetchURL(
        secondUrl,
        config.get('app.app_api_token'),
      );
      const allApiCalls = await this.settleApiCalls([fetchOne, fetchTwo]);

      // const resolveApiAndPayloads = this.resolvePromise(allApiCalls);
      const resolveApiAndPayloads = allApiCalls.map((e: any) => {
        if (e.status === 'fulfilled') {
          return e.value.data;
        } else {
          return {};
        }
      });

      await Promise.allSettled([
        this.formatFlightResponse(resolveApiAndPayloads),
        this.formatFlightRoundTripResponse(resolveApiAndPayloads),
      ]);
    } catch (e) {
      throw new Error(e);
    }
  }
}
