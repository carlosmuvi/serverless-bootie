import EventService from './EventService';
import getMeetup from 'meetup-api';
import Event from '../domain/Event';

const meetup = getMeetup({
    key: '41c594d36237b7047500392949287'
});

const SOURCE_NAME = "MEETUP";

export default class MeetupEventService extends EventService {

    getEvents({query}, callback) {
        return meetup.getOpenEvents({
            lat: query.lat,
            lon: query.lon,
            time: this._getFormattedTimeInterval(query),
            page: 200
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
                callback(this._mapToDomainModel(response));
            }
        };
    }

    _mapToDomainModel(response) {
        return results.response.filter(item => item.venue).map(v => {
            return new Event(`meetup-${v.id}`, v.name, v.event_url, v.time,
                {lat: v.venue.lat, lng: v.venue.lon}, v.yes_rsvp_count, 5, SOURCE_NAME)
        })
    }
}