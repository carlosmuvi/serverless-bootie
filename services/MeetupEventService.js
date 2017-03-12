import EventService from './EventService';
import getMeetup from 'meetup-api';

const meetup = getMeetup({
    key: '41c594d36237b7047500392949287'
});
export default class MeetupEventService extends EventService {

    getEvents({query}, callback) {
        return meetup.getOpenEvents({
            lat: query.lat,
            lon: query.lon,
            time: this._getFormattedTimeInterval(query),
            page: 1,
        }, this._onMeetupApiResponse(callback));
    }

    _getFormattedTimeInterval(query) {
        return query.startTime + "," + query.endTime;
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