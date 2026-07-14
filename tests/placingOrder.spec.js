import fs from 'fs'
const data=fs.readFileSync('test-data/loginData.json','utf-8');
const loginData=JSON.parse(data);


import{chromium,test,expect} from '@playwright/test'

test("Placing an Order", async()=>
{
const browser=await chromium.launch(
    {
    args: ['--start-maximized'],
    headless:false,
    slowMo:200
    }
);
const context=await browser.newContext({
    viewport:null
});
const page= await context.newPage();
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
const email="sanmindi@gmail.com"
await page.locator("#userEmail").fill(loginData.email); //--check for this structure---test.step
await page.locator("#userPassword").fill(loginData.password);
await page.locator("#login").click();
await page.locator(".card-body").first().waitFor();
const allProducts=await page.locator(".card-body").all();
for(let product of allProducts)
{

if((await product.locator("b").textContent())==="ZARA COAT 3")
{
await product.locator(".w-10").click();
}   
    }


await page.locator("[routerlink='/dashboard/cart']").click();

await page.locator(".cartSection").first().waitFor();
const allCartItems=await page.locator(".cartSection").all();

const value=await page.locator(".cartSection h3",{hasText:'ZARA COAT 3'});
await expect(value).toBeTruthy();
await page.locator("li button[type='button']").click();
await page.locator("div input[type='text']").nth(1).fill("123");

await page.locator("div input[type='text']").nth(2).fill("Brendon Cullum");
await page.locator("[name='coupon']").fill("rahulshettyacademy");
await page.locator(".btn.btn-primary.mt-1").click();

await page.getByPlaceholder("Select Country").click();
await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:200});

await page.locator(".list-group-item").first().waitFor();
const options=await page.locator(".list-group-item");

const optionsCount=await page.locator(".list-group-item").count();
console.log(optionsCount);

for(let i=0;i<optionsCount;i++)
{
if(await options.nth(i).textContent()===" India")
{
    await options.nth(i).click();
    console.log(await page.getByPlaceholder("Select Country").inputValue());
    break;
}

}

const mailDisplayed= await page.locator(".user__name label").textContent();

await expect(mailDisplayed).toBe(email);

await page.locator(".action__submit").click();
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderId=await page.locator(".em-spacer-1 label").last().textContent();
const trimmedOrderId=orderId.replaceAll("|","").trim();
fs.writeFileSync('orderDetails.txt',trimmedOrderId);
console.log(trimmedOrderId);

await page.locator("button[routerlink='/dashboard/myorders']").click();


const orderList=await page.locator("tbody tr");
const orderCount=await orderList.count();
console.log(orderCount);


for(let j=0;j<orderCount;j++)
{
    if(await orderList.nth(j).locator("th").textContent()===trimmedOrderId)
    {
        await orderList.nth(j).locator("button").first().click();
    }



}

await browser.close();

}
)