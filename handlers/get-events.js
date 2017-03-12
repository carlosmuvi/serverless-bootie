import MeetupEventService from '../services/MeetupEventService';
import EventbriteEventService from '../services/EventbriteEventService';

const MEETUP = 'MEETUP';
const EVENTBRITE = 'EVENTBRITE';

function getEventsHandler(event, context, callback) {
    const provider = EVENTBRITE;
    const service = getEventProvider(provider);
    service.getEvents(
        {query: event.query},
        response => callback(null, buildSuccessResponse(response)));
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

