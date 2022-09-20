import { chromium } from 'playwright';

export const pageUrl = (async () => {
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto('https://www.metrosantodomingo.com/estaciones-metro-santo-domingo.html')
    await page.screenshot({ path: 'metro.png ' })

    await browser.close()
})