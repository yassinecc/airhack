const { getDistance } = require('geolib');

var body = JSON.parse({ "batchId": "1562940000_50_5", "taskersCount": 5, "tasksCount": 50, "tasks": [{ "dueTime": "16:30", "lat": 48.85554319120794, "lng": 2.3613359633447204, "assignee_id": null, "id": 6480 }, { "dueTime": "13:15", "lat": 48.85313729018271, "lng": 2.32256080014798, "assignee_id": null, "id": 9297 }, { "dueTime": "21:45", "lat": 48.838453425693785, "lng": 2.372673134911582, "assignee_id": null, "id": 1889 } ] })

var taskersCount = body.taskersCount;
var tasksCount = body.tasksCount;
var tasks = body.tasks;

// List containing all the checkers
var checkers = [];

var graph = new Graph(tasksCount);

function initGraph(){
    initTasks();
    initEdges();
}

function initTasks(){
    for (var i in tasks){
        var currTask = task[i];

        var lat = currTask.lat;
        var lng = currTask.lng;

        var dueTime = currTask.dueTime;
        var assignee_id = currTask.assignee_id;
        var id = currTask.id;

        graph.addTask(new Task(dueTime,id,lat,lng));
    }
}

function initEdges(){
    for (var i in graph.adjList.keys){
        
    }
}

function sortTasksByTime(tasks){
    tasks.sort()    
    return tasks;
}

function doMaxCheckIns(){
    // Sort the tasks
    sortedTask = sortTasksByTime(graph.adjList.keys);
    var currTime = sortedTask[0].dueTime;

    var nodesToRem;
    checkers.forEach(element => {
        updateGraph(nodesToRem);
        nodesToRem = searchMaxNodes(element, currTime);
    });
}

function updateGraph(nodesToRem){
    graph.removeTasks(nodesToRem);
}

function searchMaxNodes(checker, sortedTask, currTime){
    for(task in sortedTask){
        //var travelTime = 
        //if(compareDates(task))
    }
}