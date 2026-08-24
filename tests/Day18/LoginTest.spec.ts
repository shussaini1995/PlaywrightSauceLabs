import {test} from '../../main/fixtures/pageFixtures';
import {LoginPage} from '../../main/pages/LoginPage';

test('login Test', async({loginPageObj}) => {

    //Url is being read from playwright config file
    await loginPageObj.openUrl("/");
    await loginPageObj.login("standard_user", "secret_sauce");
    console.log("Logged in Successfully");

})