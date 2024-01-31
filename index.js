const express = require('express')
const puppeteer = require('puppeteer')
const app = express();
let browser;

async function getBrowser() {
    if (browser) {
        return browser
    }

    browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: {
            width: 1376,
            height: 700
        }
    });

    return browser
}

app.get('/_shot', async (req, res) => {
    let { vw, vh, scale, url, mobile } = req.query;
    vw = vw || 1376;
    vh = vh || 700;
    scale = scale || 1;
    mobile = mobile ? !!mobile : false

    if (!url) {
        return res.end("Failed");
    }

    try {
        const b = await getBrowser();
        const page = await b.newPage();
        await page.setViewport({
            width: parseInt(vw),
            height: parseInt(vh),
            deviceScaleFactor: parseInt(scale),
            isMobile: mobile,
        });
        await page.goto(url);
        const imageBuffer = await page.screenshot();
        await page.close();

        res.set('Content-Type', 'image/png');
        res.send(imageBuffer);
        res.end();
    } catch (e) {
        console.error(e)
        res.status(500).send(e);
    }
});

app.listen(3000, () => {
    console.log(`Ready ...`)
})
