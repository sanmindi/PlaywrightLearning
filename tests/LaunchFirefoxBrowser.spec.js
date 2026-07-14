import{test,firefox} from '@playwright/test'

test('Launch Firefox browser',async()=>
{
const browser=firefox.launch(
{
    headless:false
});

});
const page=await browser.newPage();
await page.goto("https://www.google.com/");

