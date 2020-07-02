import 'dart:io';

void main() {
  var n = int.parse(stdin.readLineSync());
  printPrime(n);
}

isPrime(int n) {
  for (int i = 2; i * i <= n; i++) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
}

printPrime(int n) {
  for (int i = 2; i <= n; i++) {
    if (isPrime(i)) {
      print(i);
    }
  }
}
