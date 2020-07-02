import 'dispalyArr.dart';

class Node {
  int data;
  Node left;
  Node right;
  Node(int data, Node left, Node right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

void main(List<String> args) {
  Node right = new Node(10, null, null);
  Node left = new Node(40, null, null);
  Node root = new Node(20, left, right);
  display(root);
}

display(root) {
  if (root == null) {
    return;
  }
  var str = "";
  str += (root.left == null) ? "." : root.left.data.toString();
  str += " <- " + root.data.toString() + " -> ";
  str += (root.right == null) ? "." : root.right.data.toString();
  print(str);
  display(root.left);
  display(root.right);
}
