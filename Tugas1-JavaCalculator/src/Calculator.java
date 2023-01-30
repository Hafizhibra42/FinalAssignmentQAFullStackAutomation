
import java.util.Scanner;

public class Calculator {

	public static void main(String[] args) {
		
		Scanner scan = new Scanner(System.in);
		
		try {
		System.out.println("Masukkan angka pertama: ");
		int num1 = scan.nextInt();
		
		
		System.out.println("Masukkan angka kedua: ");
		int num2 = scan.nextInt();
		
		System.out.println("Penambahan: " + (num1 + num2));
		System.out.println("Pengurangan: " + (num1 - num2));
		System.out.println("Perkalian: " + (num1 * num2));
		System.out.println("Pembagian: " + (num1 / num2));
		
	} catch (Exception e) {
		System.out.println("Sorry that is not a number, please try again by input a number.");
	}
		
	}
	
}
