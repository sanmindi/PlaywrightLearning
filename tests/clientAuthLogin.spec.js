import{test,expect} from '@playwright/test'

test('Client Auth Login',async({page})=>
{

await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.locator(".btn1").click();
await page.locator("#firstName").fill("Santhi");
await page.locator("#lastName").fill("Mindi");
await page.locator("#userEmail").fill("smindi@gmail.com");
await page.locator("#userMobile").fill("8889991110");
await page.locator("#userPassword").fill("Smindi1234");
await page.locator("#confirmPassword").fill("Smindi1234");
await page.locator("[type='checkbox']").click();
await page.locator("login").click();




}




)