import EventService from './EventService';
import getMeetup from 'meetup-api';
import Event from '../domain/Event';

const meetup = getMeetup({
    key: '41c594d36237b7047500392949287'
});

const SOURCE_NAME = "meetup";

export default class MeetupEventService extends EventService {

    getEvents({query}) {
        return new Promise((resolve, reject) => {
            meetup.getOpenEvents({
                lat: query.lat,
                lon: query.lng,
                time: this._getFormattedTimeInterval(query),
                page: 200
            }, this._onMeetupApiResponse(resolve, reject));
        });
    }

    _getFormattedTimeInterval(query) {
        return query.startTime + "," + query.endTime;
    }

    _onMeetupApiResponse(resolve, reject) {
        return (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(this._mapToDomainModel(response));
            }
        };
    }

    _mapToDomainModel(response) {
        return response.results
            .filter(item => item.venue)
            .filter(item => item.venue.lat != 0 && item.venue.lon != 0)
            .map(item => {
                return new Event(
                    `${SOURCE_NAME}-${item.id}`,
                    item.name,
                    item.event_url,
                    item.time,
                    {lat: item.venue.lat, lng: item.venue.lon},
                    item.yes_rsvp_count + item.maybe_rsvp_count,
                    5,
                    SOURCE_NAME,
                    item.venue.address_1
                )
            })
    }
}