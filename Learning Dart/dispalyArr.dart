import 'dart:io';

void main(List<String> args) {
  int n = int.parse(stdin.readLineSync());
  int m = int.parse(stdin.readLineSync());
  var arr = new List();
  for (int i = 0; i < n; i++) {
    var row = new List();
    for (int j = 0; j < m; j++) {
      row.add(int.parse(stdin.readLineSync()));
    }
    arr.add(row);
  }
  print("------------------------------------------");
  display(arr);
}

display(arr) {
  for (int i = 0; i < arr.length; i++) {
    for (int j = 0; j < arr[0].length; j++) {
      stdout.write(arr[i][j].toString() + "\t");
    }
    print("");
  }
}
