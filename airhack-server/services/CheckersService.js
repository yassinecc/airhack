
// List containing all the checkers
var checkers = [];
var noOfTasks;
var graph = new Graph(noOfTasks);

function sortTasksByTime(tasks){
    tasks.sort()    
    return tasks;
}

function doMaxCheckIns(){
    // Sort the tasks
    sortedTask = sortTasksByTime(graph.adjList.keys);

    var nodesToRem;
    checkers.forEach(element => {
        updateGraph(nodesToRem);
        nodesToRem = searchMaxNodes(element);
    });
}

function updateGraph(nodesToRem){
    graph.removeTasks(nodesToRem);
}

function searchMaxNodes(checker){
    
}