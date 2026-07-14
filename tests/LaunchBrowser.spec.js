import{chromium,test} from '@playwright/test'

test('Launch browser',async()=>
{

const browser=await chromium.launch(

{
    headless:false
});
const page= await browser.newPage();
await page.goto('https://www.google.com');



}



);

workers concept