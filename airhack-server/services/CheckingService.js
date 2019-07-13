const { getDistance } = require('geolib');
const moments = require('moments');

// TODO : Utiliser les vrais données de l'API
var body = JSON.parse({ "batchId": "1562940000_50_5", "taskersCount": 5, "tasksCount": 50, "tasks": [{ "dueTime": "16:30", "lat": 48.85554319120794, "lng": 2.3613359633447204, "assignee_id": null, "id": 6480 }, { "dueTime": "13:15", "lat": 48.85313729018271, "lng": 2.32256080014798, "assignee_id": null, "id": 9297 }, { "dueTime": "21:45", "lat": 48.838453425693785, "lng": 2.372673134911582, "assignee_id": null, "id": 1889 } ] })

var taskersCount = body.taskersCount;
var tasksCount = body.tasksCount;
var tasks = body.tasks;

var graph = new Graph(tasksCount);

// Init base
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
        var id = currTask.id;

        graph.addTask(new Task(dueTime,id,lat,lng));
    }
}

function initEdges(){
    var list = graph.adjList.keys;
    for (var i=0; i<list.length; i++){
        for(var j=i+1; j<list.length; j++){
            var distance = getDistance(getCoord(list[i]), getCoord(list[j]))
            graph.addEdge(list[i], list[j], distance/10);
        }
    }
}

function getCoord(task){
    return {
        latitude : task.lat,
        longitude : task.lng
    }
}

// Core Function
function doMaxCheckIns(){

    sortedTask = sortTasksByTime(graph.adjList.keys);
    var currTime = sortedTask[0].dueTime;
    var nodesToRem = [];

    // For each checker
    for(id=1; id<=taskersCount; id++){
        
        // Remove the visited nodes
        updateGraph(nodesToRem);

        // Set the checker on the first comming due time not visited yet
        var currTask = sortedTask[0];

        // Visit the max number of nodes and update the checker id for each visited task
        nodesToRem, sortedTask = searchMaxNodes(sortedTask, currTask, currTime, id);
    }
}

function sortTasksByTime(tasksList){
    tasksList.sort(function(a,b){
        return b.dueTime - a.dueTime;
      });  
    return tasksList;
}

function updateGraph(nodesToRem){
    graph.removeTasks(nodesToRem);
}

function searchMaxNodes(taskList, currTask, currTime, currCheckerID){
    var tasksToRemove = [];
    
    for(task in taskList){
        var travelTime = graph.getTravelTime(currTask, task)
        arrivalTime = addTimes(currTime, travelTime);

        if(compareDates(arrivalTime, task.dueTime)){
            currTime = arrivalTime + addCheckInTime();
            writeIDinJSON(task.id,currCheckerID);
            tasksToRemove.push(task);
            taskList.pop(task);
            currTask = task;
        }    
    }

    return tasksToRemove, taskList;
}

function writeIDinJSON(taskID, checkerID){
    body.tasks.forEach(element => {
        if(element.id === taskID){
            element.assignee_id = checkerID;
            break;
        }
    });
}