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

    getEvents(params, callback) {
        return this.axios.get('/events/search?expand=venue').then(
            (response) => callback(this._mapResponseToEvents(response)));
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
                prefix
            );
        });
    }
}
