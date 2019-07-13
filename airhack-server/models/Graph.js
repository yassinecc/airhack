class Graph { 
   // defining Nodes array and 
   // adjacent list 
   constructor(noOfNodes) { 
       this.noOfTasks = noOfTasks; 
       this.adjList = new Map(); 
   } 

   addTask(v) { 
      // initialize the adjacent list with a null array 
      this.adjList.set(v, []); 
   } 

   addEdge(v, w) { 
      // get the list for node v and put the 
      // node w denoting edge between v and w 
      this.adjList.get(v).push(w); 
      this.adjList
      // Since graph is undirected, 
      // add an edge from w to v also 
      this.AdjList.get(w).push(v); 
   } 

   removeTask(task){
      
   }

   removeTasks(tasks){

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