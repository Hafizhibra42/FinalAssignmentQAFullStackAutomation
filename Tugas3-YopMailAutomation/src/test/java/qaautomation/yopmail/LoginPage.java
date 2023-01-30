package qaautomation.yopmail;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginPage extends BasePage {

	public LoginPage(ThreadLocal<WebDriver> driver, ThreadLocal<WebDriverWait> explicitWait) {
		super(driver, explicitWait);
		// TODO Auto-generated constructor stub
	}
	
	//element locator
	By email = By.id("login");
	By loginBtn = By.xpath("//i[@class='material-icons-outlined f36']");
	
	public void inputEmail(String emailInput) {
		setText(email, emailInput);
	}
	
	public void clickLoginBtn() {
		click(loginBtn);
	}
	

}
