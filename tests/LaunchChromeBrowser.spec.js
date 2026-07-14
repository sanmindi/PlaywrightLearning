import{test,chromium} from '@playwright/test'

test('launch chrome browser', async()=>
{

    const browser=await chromium.launch({

        headless:false
    
    });
    const page=await browser.newPage();
    const context1 =browser.newContext();
    const context2=browser.newContext();
await page.goto("https://www.google.com/");
    




}






)