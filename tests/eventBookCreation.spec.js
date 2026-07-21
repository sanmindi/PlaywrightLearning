import{test,expect} from '@playwright/test'
import {login,futureDate} from './helpers'

test('Event Creation',async({page})=>
{
//Login and login page assertion

await login(page);
await expect(page.getByRole('link',{name:'Browse Events →'})).toBeVisible();
const baseURL= await page.url();
console.log(baseURL);

// Create a new event

await page.locator('//div[@class="relative"]').getByRole("button").click();
await page.locator("//a[@class='flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors'][@href='/admin/events']").click();
const eventTitle=`Event Title ${Date.now()}`;
await page.locator("#event-title-input").fill(eventTitle);
await page.locator("#admin-event-form textarea").fill("Playwright Event Creation");
await page.getByLabel("City").fill("Bangalore");
await page.getByLabel("Venue").fill("Whitefield");
 
 await page.getByLabel("Event Date & Time").waitFor();
await page.getByLabel("Event Date & Time").fill((futureDate()));
await page.getByLabel("Price ($)").fill("500");
await page.getByLabel("Total Seats").fill("50");
await page.locator("#add-event-btn").click();

await expect(page.getByText("Event created!")).toBeVisible();


//Find the event card and capture seats

await page.getByRole('link',{name:"Events"}).nth(0).click();
const allEventCards=page.locator("//div/article[@data-testid='event-card']");
await allEventCards.first().waitFor();
const myEventTitle=await allEventCards.filter({hasText:eventTitle});
await expect(myEventTitle).toBeVisible();
const seatsBeforeBookingText=await myEventTitle.getByText("seats available").textContent();
const seatsBeforeBooking= seatsBeforeBookingText.match(/\d/g).join('');
console.log(`Seats Before Booking are ${seatsBeforeBooking}`);


// Start Booking
await myEventTitle.locator("//div/a[@data-testid='book-now-btn']").click();

// Fill Booking form

await expect(page.locator("#ticket-count")).toHaveText("1");
await page.getByLabel("Full Name").fill("Santhi Mindi");
await page.locator("#customer-email").fill("sanmindi@gmail.com");
await page.getByPlaceholder("+91 98765 43210").fill("9981121210");
await page.locator(".confirm-booking-btn").click();


//Verify booking confirmation

await expect(page.locator(".booking-ref")).toBeVisible();
const bookingRef=(await page.locator(".booking-ref").textContent()).trim();

//Verify in My Bookings

await page.getByRole('link',{name:'My Bookings'}).nth(0).click();
await page.locator("#booking-card").first().waitFor();
const currentPageURL=await page.url();
const expectedURL=``

await expect(currentPageURL).toBe(`${baseURL}bookings`);    
const bookingCards=await page.locator("#booking-card");
await bookingCards.first().waitFor();
const myBookingCard=await bookingCards.locator(".booking-ref").filter({hasText:bookingRef});
await (expect(myBookingCard)).toBeVisible();
await myBookingCard.waitFor();
 await expect(myBookingCard.locator("h3")).toHaveText(eventTitle);




}






)





