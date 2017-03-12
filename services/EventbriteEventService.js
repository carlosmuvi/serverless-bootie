import EventService from './EventService';
import getMeetup from 'meetup-api';

const meetup = getMeetup({
    key: '41c594d36237b7047500392949287'
});
export default class EventbriteEventService extends EventService {

    getEvents(params, callback) {
        return meetup.getOpenEvents({
            text: 'Beer',
            time: '1489253937000,1489263937000',
            page: 1,
        }, callback);
    }
}