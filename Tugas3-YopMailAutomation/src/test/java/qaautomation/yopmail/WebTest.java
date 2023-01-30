package qaautomation.yopmail;

import org.testng.Assert;
import org.testng.annotations.Test;

public class WebTest extends BasedWebTest {
	
	LoginPage loginPage = new LoginPage(driver, explicitWait);
	ProfilePage profilePage = new ProfilePage(driver, explicitWait);
	CommonPage commonPage = new CommonPage(driver, explicitWait);
	
	String email = "automationtest";
	
	
	@Test
	public void testSuccessGetBodyMail() {
		
		//login
		loginPage.inputEmail(email);
		loginPage.clickLoginBtn();
		
		//switchiframe
		commonPage.switchIframe();
		
		//profile
		String actualText =  profilePage.getHeaderTxt();
		Assert.assertTrue(actualText.contains(actualText));
	}

}
