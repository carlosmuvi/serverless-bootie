export default class Event {
    constructor(id, name, url, time, {lat, lng}, assistants, avgRating, source, address) {
        this.id = id;
        this.time = time;
        this.url = url;
        this.name = name;
        this.latlng = {lat, lng};
        this.assistants = assistants;
        this.avgRating = avgRating;
        this.source = source;
        this.address = address;
    }
}