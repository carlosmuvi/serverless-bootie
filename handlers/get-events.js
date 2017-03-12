import MeetupEventService from '../services/MeetupEventService';
import EventbriteEventService from '../services/EventbriteEventService';

const MEETUP = 'MEETUP';
const EVENTBRITE = 'EVENTBRITE';

function getEventsHandler(event, context, callback) {
    const provider = MEETUP;
    const service = getEventProvider(provider);
    service.getEvents({}, response => callback(null, buildSuccessResponse(response)));
}

function buildSuccessResponse(data) {
    return {
        statusCode: 200,
        body: data
    };
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
    }
    return service;
}

export default getEventsHandler;

