package qaautomation.yopmail;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ProfilePage extends BasePage {

	public ProfilePage(ThreadLocal<WebDriver> driver, ThreadLocal<WebDriverWait> explicitWait) {
		super(driver, explicitWait);
		// TODO Auto-generated constructor stub
	}

	//elementlocator
	By headerMail = By.xpath("//div[@class='ellipsis nw b f18']");
	
	public String getHeaderTxt() {
		return getText(headerMail);
	}
}
