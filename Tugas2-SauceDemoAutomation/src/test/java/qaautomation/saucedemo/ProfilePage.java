package qaautomation.saucedemo;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ProfilePage extends BasePage{

	public ProfilePage(ThreadLocal<WebDriver> driver, ThreadLocal<WebDriverWait> explicitWait) {
		super(driver, explicitWait);
		// TODO Auto-generated constructor stub
	}

	By thankYouTxt = By.xpath("//h2[normalize-space()='THANK YOU FOR YOUR ORDER']");
	
	public String getProfiletxt() {
		return getText(thankYouTxt);
	}
}
