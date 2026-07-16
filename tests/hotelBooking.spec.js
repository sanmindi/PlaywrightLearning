import{test,expect,chromium} from '@playwright/test'

test('Flight Booking', async()=>
{

const browser=await chromium.launch(
    {
args:['--start-maximized'],
headless:false,
slowMo:200,

    }
)

const context=await browser.newContext(
    {
        viewport:null
    }
)
const page= await context.newPage();
await page.goto("https://www.yatra.com/");
await page.locator('.css-lds0cf').filter({hasText:"Round Trip"}).click();
const FromCity=page.getByRole('textbox',{name:'Departure From'});

await FromCity.click();
await FromCity.fill("Mum");
console.log(FromCity.inputValue());
}
)