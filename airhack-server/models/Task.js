class Task{
    constructor(dueTime, id, distance){
        this.dueTime = dueTime;
        this.id = id;
        this.lat = lat;
        this.lng = lng;
        this.assignee_id = null;
    }

    setChecker(id){
        this.id = id;
    }
}