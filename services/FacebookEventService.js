import axios from 'axios';
import Event from '../domain/Event';
import EventService from './EventService';
import EventSearch from 'facebook-events-by-location-core';
const FACEBOOK_ACCESS_TOKEN = 'EAACL1lbHAEsBAFZAtBzb2PwGYS7heniGKZBL0nS0d7Pe6ZBaICWpcqMzez0jaZClcxzt7gt3z30u6EWNgrGidzxVFGbm1ubncYmmvTAr5LR48yBSPBV1xnBFrCSpbobd3ROjXutUEe6V8ibIAUGctEBok8DWcZCtH5rZCdTtId04e7ZC7Bf093r7Etn2vshokAZD';

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
            return new Event(
                `${prefix}-${ev.id}`,
                ev.name,
                `http://facebook.com/events/${ev.id}`,
                new Date(ev.startTime).getTime(),
                {lat: venue.location.latitude, lng: venue.location.longitude},
                ev.stats.attending + ev.stats.maybe, 0,
                prefix
            );
        });
    }
}
