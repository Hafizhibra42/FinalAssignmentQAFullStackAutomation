package qaautomation.saucedemo;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginPage extends BasePage {
	
	
public LoginPage(ThreadLocal<WebDriver> driver, ThreadLocal<WebDriverWait> explicitWait) {
		super(driver, explicitWait);
		// TODO Auto-generated constructor stub
	}

//element locator
	By username = By.id("user-name");
	By password = By.id("password");
	By loginBtn = By.id("login-button");
	By firstName = By.id("first-name");
	By lastName = By.id("last-name");
	By postalCode = By.id("postal-code");
	By backpackBtn = By.id("add-to-cart-sauce-labs-backpack");
	By tshirtBtn = By.id("add-to-cart-sauce-labs-bolt-t-shirt");
	By checkOutBtn = By.id("checkout");
	By continueBtn = By.id("continue");
	By finishBtn = By.id("finish");
	By shoppingCartBtn = By.xpath("//a[@class='shopping_cart_link']");

	public void inputUsername(String usernameInput) {
		setText(username, usernameInput);
	}
	
	public void inputPassword(String passwordInput) {
		setText(password, passwordInput);
	}
	
	public void clickBtnLogin() {
		click(loginBtn);
	}
	
	public void inputFirstName(String firstNameInput) {
		setText(firstName, firstNameInput);
	}
	
	public void inputLastName(String lastNameInput) {
		setText(lastName, lastNameInput);
	}
	
	public void inputPostalCode(String postalCodeInput) {
		setText(postalCode, postalCodeInput);
	}
	
	public void clickBtnBackpack() {
		click(backpackBtn);
	}
	
	public void clickBtnTshirt() {
		click(tshirtBtn);
	}
	
	public void clickCheckOut() {
		click(checkOutBtn);
	}
	
	public void clickBtnContinue() {
		click(continueBtn);
	}
	
	public void clickFinish() {
		click(finishBtn);
	}
	
	public void clickShoppingCart() {
		click(shoppingCartBtn);
	}
	
}
