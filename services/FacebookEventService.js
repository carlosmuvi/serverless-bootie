import axios from 'axios';
import Event from '../domain/Event';
import EventService from './EventService';
import EventSearch from 'facebook-events-by-location-core';
const FACEBOOK_ACCESS_TOKEN = 'EAACL1lbHAEsBABSgBiJrEcj8TZCmsZBSAgdcsskZAZCSEAZCC1NgZC8tgznm1FVAK3xzFPPx43CTMWhJrnR0term1Ex6x2hZAPxUSEJD4ZBQaN6FI7u120RfUSaKP3ZC0VIfijdKI7UZAMJuYtIbLqZCBIqZCp1j0wYG6NobRloPAXBpfxW4gC4TL0aGu4VExaObx50ZD';

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
            since: query.startDate,
            until: query.endDate,
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
