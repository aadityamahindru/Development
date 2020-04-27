import java.io.*;
import java.util.*;

public class Main {

    public static void main(String[] args) throws Exception {
        // write your code here
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        int max = Integer.MIN_VALUE;
        for (int i = 0; i < n; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        int k=max;
        for (int j = 0; j < k; j++) {

            for (int i = 0; i < n; i++) {
                if (arr[i] == max) {
                    System.out.print("*\t");
                    arr[i]=arr[i]-1;

                } else {
                    System.out.print("\t");
                }
            }
            max--;
            System.out.println();
        }
    }

}