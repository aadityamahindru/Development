import java.io.*;
import java.util.*;

public class Main {

    public static void main(String[] args) throws Exception {
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        int a[][]=new int[n][n];
        printNQueens(a,"",0);
        System.out.println();
        
    }
    public  static boolean isSafe(int a[][],int r ,int c){
        for(int i=r-1;i>=0;i--)
        {
            if(a[i][c]==1)
            return false;
        }
        for(int i=r-1,j=c-1;i>=0&&j>=0;i--,j--)
        {
            if(a[i][j]==1)
            return false;
        }
         for(int i=r-1,j=c+1;i>=0&&j<a.length;i--,j++)
        {
            if(a[i][j]==1)
            return false;
        }
        return true;
        
    }

    public static void printNQueens(int[][] chess, String qsf, int row) {
        if(row==chess.length)
        {
            System.out.println(qsf+".");
            return;
        }
        for(int i=0;i<chess.length;i++)
        {
            if(isSafe(chess,row,i))
            {   chess[row][i]=1;
                printNQueens(chess,qsf+row+"-"+i+", ",row+1);
              chess[row][i]=0;
            }
        }
        
        
        
    }
}