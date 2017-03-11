import getMeetup from 'meetup-api';
const meetup = getMeetup({
    key: '41c594d36237b7047500392949287'
});

export default (event, context, callback) => {

    meetup.getOpenEvents({
        text: 'Beer',
        time: '1489253937000,1489263937000',
        page: 1,
    }, function (error, event) {
        if (error) {
            console.log(error);
            callback(null, buildSuccessResponse(error));
        } else {
            console.log(event);
            callback(null, buildSuccessResponse(event));
        }
    });

    function buildSuccessResponse(body) {
        return {
            statusCode: 200,
            body: body
        };
    }
};
