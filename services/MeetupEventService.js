import EventService from './EventService';
import getMeetup from 'meetup-api';

const meetup = getMeetup({
    key: '41c594d36237b7047500392949287'
});
export default class MeetupEventService extends EventService {

    getEvents(params, callback) {
        return meetup.getOpenEvents({
            text: 'Beer',
            time: '1489253937000,1489263937000',
            page: 1,
        }, this._onMeetupApiResponse(callback));
    }

    _onMeetupApiResponse(callback) {
        return (error, response) => {
            if (error) {
                console.log(error);
                callback(error);
            } else {
                console.log(response);
                callback(response);
            }
        };
    }
}