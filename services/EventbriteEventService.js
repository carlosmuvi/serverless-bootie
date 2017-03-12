import axios from 'axios';
import Event from '../domain/Event';
import EventService from './EventService';
const EVENTBRITE_ACCESS_TOKEN = 'TYHV7J5JQGNZTDYLMAA2';

export default class EventbriteEventService extends EventService {

    constructor() {
        super();
        this.axios = axios.create({
            baseURL: 'https://www.eventbriteapi.com/v3/',
            headers: {
                'Authorization': `Bearer ${EVENTBRITE_ACCESS_TOKEN}`,
            }
        });
    }

    getEvents(query) {
        return this.axios.get('/events/search?expand=venue', {
            params: {
                'location.latitude': query.lat,
                'location.longitude': query.lng,
                'start_date.range_start': query.startDate,
                'start_date.range_end': query.endDate
            }
        }).then(
            (response) => this._mapResponseToEvents(response));
    }

    _mapResponseToEvents(response) {
        return response.data.events.filter(ev => ev.venue).map(ev => {
            const prefix = 'eventbrite';
            const {venue} = ev;
            return new Event(
                `${prefix}-${ev.id}`,
                ev.name.text,
                ev.url,
                new Date(ev.start.utc).getTime(),
                {lat: venue.latitude, lng: venue.longitude},
                0, 0,
                prefix,
                venue.address.address_1
            );
        });
    }
}
