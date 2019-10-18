/**
 * @name Download file / upload file
 *
 * @desc Find an image by class selector, downloads the image, saves it to disk and read it again. Use this together with a .fileUpload() method.
 *
 */

const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const INSTAGRAM_USER = 'email';
const INSTAGRAM_PWD = 'password';

const main = async () => {
/*  */
    try {
        const browser = await puppeteer.launch({
            headless: false
        })
        const page = await browser.newPage()
        await page.goto("https://www.instagram.com/accounts/login/?source=auth_switcher", {
            waitUntil: 'networkidle2'
        });
    
        //email
        await page.waitForSelector("[name='username']");
        // await page.click("[name='username']");
        await page.type("[name='username']", INSTAGRAM_USER);
    
        //password
        await page.keyboard.down("Tab");
        //uncomment the following if you want the passwor dto be visible
        // page.$eval("._2hvTZ.pexuQ.zyHYP[type='password']", (el) => el.setAttribute("type", "text"));
        await page.keyboard.type(INSTAGRAM_PWD);
    
        //the selector of the "Login" button
        // await page.click("._0mzm-.sqdOP.L3NKy>.Igw0E.IwRSH.eGOV_._4EzTm");
        
        //we find the Login btn using the innerText comparison because the selector used for the btn might be unstable
        await page.evaluate(() => {
            let btns = [...document.querySelector(".HmktE").querySelectorAll("button")];
            btns.forEach(function (btn) {
                if (btn.innerText == "Log In")
                    btn.click();
            });
        });

    } catch (e) {
        console.log('Error', e);
    }
}

main();