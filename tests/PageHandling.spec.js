import{chromium,test} from '@playwright/test'

test('Page Handling', async()=>
{
const browser= await chromium.launch();
const context=await browser.newContext();
const page=await context.newPage();
await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");


const [offersPage]=await Promise.all([
context.waitForEvent('page'),
await page.locator(".cart-header-navlink[href='#/offers']").click()

])
await offersPage.locator("#search-field").fill("stra");

});
