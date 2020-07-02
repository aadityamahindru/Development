import 'dart:io';

import 'dispalyArr.dart';

class Edge {
  int vtx;
  int wt;
  Edge(vtx, wt) {
    this.vtx = vtx;
    this.wt = wt;
  }
}

void main(List<String> args) {
  var graph = new List(7);
  graph[0] = [new Edge(1, 10), new Edge(3, 40)];
  graph[1] = [new Edge(0, 10), new Edge(2, 10)];
  graph[2] = [new Edge(1, 10), new Edge(3, 10), new Edge(5, 5)];
  graph[3] = [new Edge(0, 40), new Edge(2, 10), new Edge(4, 2)];
  graph[4] = [new Edge(3, 2), new Edge(5, 3), new Edge(6, 8)];
  graph[5] = [new Edge(2, 5), new Edge(4, 3), new Edge(6, 3)];
  graph[6] = [new Edge(5, 3), new Edge(4, 8)];
  display(graph);
  print("---------------------");
  var visited = new List(7);
  allPath(graph, 0, 6, "", visited);
}

display(graph) {
  for (int i = 0; i < graph.length; i++) {
    stdout.write(i.toString() + " -> ");
    for (var e in graph[i]) {
      stdout.write(e.vtx.toString() + ",");
    }
    print("");
  }
}

allPath(graph, src, des, psf, visited) {
  if (src == des) {
    psf += src.toString();
    print(psf);
    return;
  }
  visited[src] = 1;
  for (Edge e in graph[src]) {
    if (visited[e.vtx] == 0) {
      allPath(graph, e.vtx, des, psf + e.vtx.toString(), visited);
    }
  }
  visited[src] = 0;
}
