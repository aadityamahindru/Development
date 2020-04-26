import java.io.*;
import java.util.*;

public class Main {

    public static void main(String[] args) throws Exception {
        // write your code here
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        int m=sc.nextInt();
        int arr[][]=new int[n][m];
        for(int i=0;i<n;i++)
        {
            for(int j=0;j<m;j++)
            {
                arr[i][j]=sc.nextInt();
            }
        }
        int s=sc.nextInt();
        int k=sc.nextInt();
        rotate(arr,s,k);
        display(arr);
    }
    public static void rotate(int a[][],int s,int k)
    {
        int n=a.length;
        int m=a[0].length;
        int rstart=s-1,cstart=s-1,cend=m-s,rend=n-s;
        int b=n-2*(s-1);
        int l=m-2*(s-1);
        int no=2*(l+b)-4;
        k=k%no;
        if(k<0)
        {
            k=k+no;
        }
        int count=0;
        while(count<k)
        {
            int temp=a[rstart][cstart];
            for(int i=cstart;i<cend;i++)
            {
                a[rstart][i]=a[rstart][i+1];
            }
            for(int i=rstart;i<rend;i++)
            {
                a[i][cend]=a[i+1][cend];
            }
            for(int i=cend;i>cstart;i--)
            {
                a[rend][i]=a[rend][i-1];
            }
            for(int i=rend;i>rstart+1;i--)
            {
                a[i][cstart]=a[i-1][cstart];
            }
            a[rstart+1][cstart]=temp;
            count++;
            
        }
    }
    public static void display(int[][] arr){
        for(int i = 0; i < arr.length; i++){
            for(int j = 0; j < arr[0].length; j++){
                System.out.print(arr[i][j] + " ");
            }
            System.out.println();
        }
    }

}