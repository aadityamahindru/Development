import java.io.*;
import java.util.*;

public class Main{

public static void main(String[] args) throws Exception {
    // write your code here
    Scanner sc=new Scanner(System.in);
    int n=sc.nextInt();
    int a[]=new int[n+1];
    System.out.println(fibo(n,a));
 }
public static int fibo(int n, int a[])
{
    if(n==0||n==1)
    {
        return n;
    }
    if(a[n]!=0)
    return a[n];
    int f1=fibo(n-1,a);
    int f2=fibo(n-2,a);
    int fibon=f1+f2;
    a[n]=fibon;
    return a[n];
}
}