export default class EventService{

    constructor(baseUrl){
        this.axios = axios.create({
            baseURL,
            headers: {}
        });
    }

    getEvents(){
        throw new Error('Not yet implemented');
    }

}