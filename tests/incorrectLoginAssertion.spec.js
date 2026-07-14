import{test,expect} from '@playwright/test'

test('Incorrect Login',async ({page})=>
{

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await page.locator("#username").fill("rahulshettyacademy");
await page.locator("#password").fill("abcd");
await page.locator("#signInBtn").click();
const error=await page.locator("[style*='block']").textContent();
await expect(error).toContain("Incorrect user");

}



)