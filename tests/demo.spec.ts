import {test, expect, chromium} from '@playwright/test'

test('demo test', async() => {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.google.com");
    await page.waitForTimeout(5000);
    console.log("test done");
})


test('logout test', async({page}) => {

    await page.goto("https://www.saucedemo.com/");
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.getByRole('button', {name : 'Login'}).click();
    await page.waitForTimeout(2000);
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
    console.log("page url : "+page.url());
    expect(page.url()).toBe('https://www.saucedemo.com/');
    console.log("test done");
})

test("webtable test", async({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.locator("//h2[normalize-space()='Static Web Table']").scrollIntoViewIfNeeded();
    const rows = page.locator("//table[@name='BookTable']/tbody/tr");
    const noOfRows = await rows.count();

    //ignore the header row and start from 1st row
    for(let i=1; i<noOfRows; i++){

        //This returns 4 locators as each row has 4 columns
        const cells = rows.nth(i).locator('td');

        let ele:String = "";
        for(let j=0; j<await cells.count(); j++){
            //Fetching content of each column
            ele += await cells.nth(j).textContent() + " ";
        }
        console.log(ele);
    }
})


test('filtering products test', async({page}) => {

    await page.goto("https://www.saucedemo.com/");
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.getByRole('button', {name : 'Login'}).click();
    
    //using traitional xpath
    //await page.locator("//div[normalize-space()='Sauce Labs Bike Light']/ancestor::div[contains(@class,'inventory_item_description')]//button").click();
    
    //using filter
    await page.locator('.inventory_item')
                .filter({has : page.locator("//div[normalize-space()='Sauce Labs Bike Light']")})
                .getByRole("button", {name : 'Add To Cart'})
                .click();

    await page.waitForTimeout(2000);
    console.log("test done");
})