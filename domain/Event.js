export default class Event {
    constructor(id, name, time, {lat, lng}, assistants, avgRating) {
        this.id = id;
        this.name = name;
        this.time = time;
        this.latlng = {lat, lng};
        this.assistants = assistants;
        this.avgRating = avgRating;
    }
}