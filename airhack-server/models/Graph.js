class Graph { 
   // defining Nodes array and 
   // adjacent list 
   constructor(noOfNodes) { 
       this.noOfTasks = noOfTasks; 
       this.adjList = new Map(); 
   } 

   addTask(v) { 
      // initialize the adjacent list with a null array 
      this.adjList.set(v, [[]]); 
   } 

   addEdge(v, w, timeCost) { 
      // get the list for node v and put the 
      // node w denoting edge between v and w 
      var pair = [w,timeCost];
      this.adjList.get(v).push(pair); 

      // Since graph is undirected, 
      // add an edge from w to v also 
      pair = [v, timeCost];
      this.AdjList.get(w).push(pair); 
   } 

   removeTask(task){
      // TODO
   }

   removeTasks(tasks){
      for(task in tasks){
         this.removeTask(task);
      }
   }

   getTravelTime(currTask, targetTask){
      return getDistanceBetween(currTask,targetTask)/10;
   }

   getDistanceBetween(task1, task2){
      var list = this.adjList.get(task1)
      for(array in list){
         if(array[0] === task2){
            return getDistance();
         }
      }
   }

   printGraph() { 
      // get all the nodes 
      var get_keys = this.adjList.keys(); 
   
      // iterate over the nodes 
      for (var i of get_keys) { 
         // great the corresponding adjacency list 
         // for the vertex 
         var get_values = this.adjList.get(i); 
         var conc = ""; 
   
         // iterate over the adjacency list 
         // concatenate the values into a string 
         for (var j of get_values){
            conc += j + " "; 
         }

         // print the vertex and its adjacency list 
         console.log(i + " -> " + conc); 
      } 
   } 
} 