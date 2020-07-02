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
  print("--------------------------------------");
  for (int i = 0; i < arr[0].length; i++) {
    if (i % 2 == 0) {
      for (int j = 0; j < arr.length; j++) {
        print(arr[j][i]);
      }
    } else {
      for (int j = arr.length - 1; j >= 0; j--) {
        print(arr[j][i]);
      }
    }
  }
}
