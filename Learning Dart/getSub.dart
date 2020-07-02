import 'dart:io';

void main(List<String> args) {
  var str = stdin.readLineSync();
  var ans = getss(str);
  for (var val in ans) {
    print(val);
  }
}

getss(str) {
  if (str.length == 0) {
    var res = new List();
    res.add("");
    return res;
  }
  var ch = str[0];
  var res = getss(str.substring(1));
  var myres = new List();
  for (var val in res) {
    myres.add(ch+val);
    myres.add("-"+val);
  }
  return myres;
}
