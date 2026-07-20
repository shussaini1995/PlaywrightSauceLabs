import {test, expect} from '@playwright/test';
import {LoginPage} from '../../main/pages/LoginPage';

let loginPageObj :LoginPage;

test.beforeEach("object creation", async({page}) => {
    loginPageObj = new LoginPage(page);
})

test('login Test', async({page}) => {

    //Url is being read from playwright config file
    await loginPageObj.openUrl("/");
    await loginPageObj.login("standard_user", "secret_sauce");
    console.log("Logged in Successfully");

})