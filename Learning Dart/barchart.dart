import 'dart:core';
import 'dart:io';

void main() {
  var n = int.parse(stdin.readLineSync());
  var list = new List();
  for (int i = 0; i < n; i++) {
    var val = int.parse(stdin.readLineSync());
    list.add(val);
  }
  int max = 0;
  for (int i = 0; i < list.length; i++) {
    if (list[i] > max) {
      max = list[i];
    }
  }
  for (int i = 0; i < max; i++) {
    for (int j = 0; j < list.length; j++) {
      if (i + list[j] >= max) {
        stdout.write("*\t");
      } else {
        stdout.write("\t");
      }
    }
    print("");
  }
}
