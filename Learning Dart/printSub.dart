import 'dart:io';

void main(List<String> args) {
  var str = stdin.readLineSync();
  getss(str, "");
}

getss(str, psf) {
  if (str.length == 0) {
    print(psf);
    return;
  }
  var ch = str[0];
  var roq = str.substring(1);
  getss(roq, psf + ch);
  getss(roq, psf+"-");
}
