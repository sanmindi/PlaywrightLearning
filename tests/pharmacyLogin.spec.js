import{chromium,test,expect} from '@playwright/test'

test('Login to Pharmacy', async ()=>
{

const browser= await chromium.launch();
const context= await browser.newContext();
const page= await context.newPage();
await page.goto("https://qa-pharmacy.wellgisticshub.com/login");
await page.locator(".p-button-label").click();
await page.locator("#username-label").fill("santhi.mindi@wellgisticshealth.com");
await page.locator("#password-label").fill("Test$123");
await page.locator("#password-label")
await page.locator(".c98723ed1").click();

await page.keyboard.type("abc");
await page.keyboard.

const text=await page.locator(".legal-name").textContent();
await expect(text).toBe("Legal (NCPDP #: 3533535)");
}
);
test('Verify Terms and Conditions',async ({})=>
{

const browser= await chromium.launch();
const context= await browser.newContext();
const page= await context.newPage();
await page.goto("https://qa-pharmacy.wellgisticshub.com/login");
await page.locator(".p-button-label").click();
await page.locator("#username-label").fill("santhi.mindi@wellgisticshealth.com");
await page.locator("#password-label").fill("Test$123");
await page.locator(".c98723ed1").click();

const [page2]=await Promise.all([
context.waitForEvent('page'),
page.locator(".text-decoration-none.ng-star-inserted[href='https://wellgisticshub.com/terms-conditions/']").click()
]);
console.log(await page2.locator(".av-special-heading-tag ").textContent());
}



);

test('Verify Privacy Policy',async ()=>
{
const browser= await chromium.launch();
const context= await browser.newContext();
const page= await context.newPage();
await page.goto("https://qa-pharmacy.wellgisticshub.com/login")

const [privacyPage]=await Promise.all(
[
context.waitForEvent('page'),
page.locator("[href*='privacy-policy']").click()


]


)
const privacyText=await privacyPage.locator(".av-special-heading-tag").textContent();
await expect(privacyText).toBe("WELLGISTICS HUB PRIVACY POLICY");

}



)

