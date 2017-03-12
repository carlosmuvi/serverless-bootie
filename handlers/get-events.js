import MeetupEventService from '../services/MeetupEventService';
import EventbriteEventService from '../services/EventbriteEventService';

const MEETUP = 'meetup';
const EVENTBRITE = 'eventbrite';
const DEFAULT_PROVIDERS = `${EVENTBRITE},${MEETUP}`;

function getEventsHandler(event, context, callback) {
    const {providers} = event.query;
    const providerServices = getProviderServices(providers || DEFAULT_PROVIDERS);
    Promise.all(providerServices.map(service => {
        return service.getEvents({query: event.query});
    })).then(providerResponses => {
        callback(null, providerResponses.reduce((acc, events) => {
            return acc.concat(events);
        }, []));
    }).catch(error => {
        callback(null, error);
    });
}

function getProviderServices(providers) {
    const providersArray = providers.split(',');
    return providersArray.map(p => getEventProvider(p.trim()));
}

function getEventProvider(provider) {
    let service;
    switch (provider) {
        case MEETUP:
            service = new MeetupEventService();
            break;
        case EVENTBRITE:
            service = new EventbriteEventService();
            break;
        default:
            throw new Error(`Unrecognized provider: ${provider}`);
    }
    return service;
}

export default getEventsHandler;

