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
await page.goto("https://rahulshettyacademy.com/dropdownsPractise/");
await page.locator("#ctl00_mainContent_rbtnl_Trip_1").click();
//Radio Button click
await page.locator("#ctl00_mainContent_ddl_originStation1_CTXT").click();

// Selecting the origin station using filter method

let originStations=await page.locator("#glsctl00_mainContent_ddl_originStation1_CTNR table tbody td li");
await originStations.first().waitFor();
await originStations.filter({hasText:'Pune (PNQ)'}).click();

// Selecting the destination station using the getByText

await page.locator("#ctl00_mainContent_ddl_destinationStation1_CTXT").click();
await page.locator("#ctl00_mainContent_ddl_destinationStation1_CTXTaction").click();
await page.locator("#ctl00_mainContent_ddl_destinationStation1_CTNR tbody li").getByText("Delhi (DEL)").click();

await page.locator("#spclearDate").click();
await page.locator("#ctl00_mainContent_rbtnl_Trip_1").click();

//Selecting passenger info and currency, adding more passengers using loop 

const passengerDropdown=page.locator("#divpaxinfo");
await passengerDropdown.click();

for(let i=0;i<2;i++)
{
    await page.locator("#hrefIncAdt").click();
}

//Select DropDown selection
const currencyDropdown=await page.locator("#ctl00_mainContent_DropDownListCurrency");
await currencyDropdown.click();
await currencyDropdown.selectOption("INR");

//Selecting Departure Date using getByRole
const departureDate="14";
await page.locator(".picker-first2").getByRole('button').click();
const datesDropdown=await page.locator("tbody td a");
await datesDropdown.filter({hasText:departureDate}).nth(0).click();




// Selecting Return Date using loop mechanism

const returnDate="20";
await page.locator(".picker-second").getByRole('button').click();
const allDates= page.locator("tbody td a");
const allDatesCount=await allDates.count();

for(let j=0;j<allDatesCount;j++)
{
    if(await allDates.nth(j).textContent()===returnDate)
    {
       await allDates.nth(j).click();
       break;
    }
}
//Assert entered Departure Date

const actualDepartureDate=await page.locator("#view_fulldate_id_1");
await (expect(actualDepartureDate).toHaveText(`Tue, May ${departureDate} 2019`));

//Assert the entered return Date

const actualReturnDate=await page.locator("#view_fulldate_id_2");
await (expect(actualReturnDate).toHaveText(`Mon, May ${returnDate} 2019`));

//Click Search Button

await page.locator("#ctl00_mainContent_btn_FindFlights").click();


// Assert Menu Bar Items

const menuExpectedValues=["Flights","Hotels","Holiday Packages","Flight Status","Check-In","Manage Booking"];

const menuValues=await page.locator(".button-align-center a");
await menuValues.first().waitFor();
const menuActualValues=((await menuValues.allTextContents()).map(word=>word.trim()));
await expect(menuActualValues).toEqual(menuExpectedValues);

// Open another page and switch back to the parent page

const [newPage]=await Promise.all([
 context.waitForEvent("page"),
 page.locator("[href*='documents-request']").click()
]);

const [signUpPage]=await Promise.all([
    context.waitForEvent("page"),
newPage.getByRole('link',{name:'Sign Up'}).last().click()

])
await page.bringToFront();
await page.waitForLoadState();

//Mouse actions

console.log(await page.locator('span').filter({hasText:"Hotels"}).first().hover());
await page.pause();
await page.getByText("Holiday Packages").last().hover();

}

)

