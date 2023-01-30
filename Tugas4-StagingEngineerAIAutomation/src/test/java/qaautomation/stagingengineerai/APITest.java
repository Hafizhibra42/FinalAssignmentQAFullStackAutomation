package qaautomation.stagingengineerai;

import static org.testng.Assert.assertEquals;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchema;

import org.testng.annotations.Test;

import com.github.javafaker.Faker;

import io.restassured.RestAssured;
import io.restassured.response.Response;


public class APITest {
	String token;
	Faker faker = new Faker();
	String first_name = faker.name().firstName();
	String last_name = faker.name().lastName();
	String email = faker.internet().emailAddress();
	String password = faker.internet().password();
	String phone_number = "+62-81288899305";
	
	
	@Test
	public void signupAPI () {
		RestAssured.baseURI = "https://api-staging-builder.engineer.ai";
		SchemaSignUp schema = new SchemaSignUp();
		String payload = "{\"user\":{\"first_name\":\""+first_name+"\","
				+ "\"last_name\":\""+last_name+"\","
				+ "\"email\":\""+email+"\",\"password\":\""+password+"\","
				+ "\"phone_number\":\""+phone_number+"\",\"user_type\":\"User\","
				+ "\"currency_id\":2}}";
		System.out.println(payload);
		
		Response responseSignup = RestAssured.given()
				.contentType("application/json")
				.body(payload).when().post("/users");
		responseSignup.then().assertThat().body(matchesJsonSchema(schema.signUpSchema()));
		assertEquals(responseSignup.statusCode(), 200);
		token = responseSignup.jsonPath().get("user.authtoken");
	}
	
}
