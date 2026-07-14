import{test,chromium,expect} from '@playwright/test'

test('Page Handling',async()=>
{
const browser= await chromium.launch({

    args: ['--start-maximized'],
    headless:false,
    slowMo:200
});
const context=await browser.newContext(
    {
        viewport:null
    }
);
const page= await context.newPage();

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

const [freeAccessPage]=await Promise.all([

    context.waitForEvent('page'),
page.locator("[href*='documents-request']").click()
]
)
const Title=await freeAccessPage.title();
console.log(Title);
const url=await freeAccessPage.url();
console.log(url);

const mail=await freeAccessPage.locator("[href*=mailto]").textContent();
console.log(mail);

await page.locator("#username").fill(mail);

await page.locator("#password").fill("abcd1234");
await page.locator("#signInBtn").click();
const error=await page.locator(".alert-danger");
const errorText=await page.locator(".alert-danger").textContent();
console.log(errorText);
await expect(error.isVisible());
}



)