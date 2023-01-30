package qaautomation.saucedemo;

import org.testng.Assert;
import org.testng.annotations.Test;

public class WebTest extends BasedWebTest{
	
	LoginPage loginPage = new LoginPage(driver, explicitWait);
	ProfilePage profilePage = new ProfilePage(driver, explicitWait);
	
	String username = "standard_user";
	String password = "secret_sauce";
	String firstName = "Hafizh";
	String lastName = "Ibrahim";
	String postalCode = "13450";
	
	@Test
	
 	public void testSuccessTransaction() {
		
		
		//login
		loginPage.inputUsername(username);
		loginPage.inputPassword(password);
		loginPage.clickBtnLogin();
		loginPage.clickBtnBackpack();
		loginPage.clickBtnTshirt();
		loginPage.clickShoppingCart();
		loginPage.clickCheckOut();
		loginPage.inputFirstName(firstName);
		loginPage.inputLastName(lastName);
		loginPage.inputPostalCode(postalCode);
		loginPage.clickBtnContinue();
		loginPage.clickFinish();
		

		//profile
		String actualText = profilePage.getProfiletxt();
		Assert.assertTrue(actualText.contains(actualText));
	}
}
