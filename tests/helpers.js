export async function login(page)
{

    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder("you@email.com").fill("sanmindi@gmail.com");
    await page.getByLabel("password").fill("Venuarun12!");
    await page.locator("#login-btn").click();
}

export function futureDate()
{
const futureDat= new Date();

 futureDat.setDate(futureDat.getDate()+7);
return `${futureDat.getFullYear()}-0${futureDat.getMonth()+1}-${futureDat.getDate()}T13:23`
 
}