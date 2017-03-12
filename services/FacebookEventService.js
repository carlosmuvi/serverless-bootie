import axios from 'axios';
import moment from 'moment';
import Event from '../domain/Event';
import EventService from './EventService';
import EventSearch from 'facebook-events-by-location-core';
const FACEBOOK_ACCESS_TOKEN = 'EAAFG6FGHXSsBAOvIGBwWdUTlfHxsuutc1vpAZBMxc8RsdJZAR2YZCOfGxdj9CZAurHKEZCtZCZARExn5gyBvUJxMEtAw1qCv6UX0rbfJf201p3ueupwj16Rsi34DoF4p6fYhk77NFaT7pbZC9CHoVRxzcdIvp74H8e9qMFgPDYHGBOxGLTPEZAwKiS8nfeDP7tBMZD';

export default class FacebookEventService extends EventService {

    constructor() {
        super();
        this.axios = axios.create({
            baseURL: 'https://graph.facebook.com/v2.8/',
            headers: {}
        });
    }

    getEvents({query}) {
        const search = new EventSearch({
            lat: query.lat,
            lng: query.lng,
            distance: 10000,
            accessToken: FACEBOOK_ACCESS_TOKEN,
            since: moment(parseInt(query.startTime)).unix(),
            until: moment(parseInt(query.endTime)).unix(),
            version: 'v2.8',
        });
        return search.search().then((response) => this._mapResponseToEvents(response));
    }

    _mapResponseToEvents(response) {
        return response.events.filter(ev => ev.venue && ev.venue.location).map(ev => {
            const prefix = 'facebook';
            const {venue} = ev;
            const {location: l} = venue;
            return new Event(
                `${prefix}-${ev.id}`,
                ev.name,
                `http://facebook.com/events/${ev.id}`,
                new Date(ev.startTime).getTime(),
                {lat: venue.location.latitude, lng: venue.location.longitude},
                ev.stats.attending + ev.stats.maybe, 0,
                prefix,
                `${l.street}, ${l.zip} ${l.city} ${l.state}, ${l.country}`
            );
        });
    }
}
