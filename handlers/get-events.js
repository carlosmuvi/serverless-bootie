import getMeetup from 'meetup-api';
const meetup = getMeetup({
    key: '41c594d36237b7047500392949287'
});


export default (event, context, callback) => {
    const {query} = event;
    getOpenEvents(query, function (error, event) {
        if (error) {
            console.log(error);
            callback(null, buildResponse(400, error));
        } else {
            console.log(event);
            callback(null, buildResponse(200, event));
        }
    });
};

function getOpenEvents(query, onComplete) {
    meetup.getOpenEvents({
        lat: query.lat,
        lon: query.lon,
        time: buildTimeIntervalParameter(startTime, endTime),
        page: 1,
    }, onComplete);
}

const buildTimeIntervalParameter = (s, e) => s + "," + e;

function buildSuccessResponse(body) {
    return {
        statusCode: 200,
        body: body
    };
}
