const puppeteer = require('puppeteer');

async function translate(text, to) {

    if (text === undefined || text === null || text.trim() === "") {
        return {
            status: "error",
            message: "Text must be specified"
        };
    } else {

        if (to === undefined || to === null || to === "") {
            to = "en";
        }

        if(text.length > 5000){
            text = text.substring(0, 5000);
        }

        const browser = await puppeteer.launch({
				headless: true,
				args: ["--no-sandbox", "--disable-setuid-sandbox"],
			});
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto(`https://translate.google.com?sl=auto&tl=${to.toLowerCase()}`);

        try { 
            await page.focus("textarea.er8xn");
            await page.keyboard.sendCharacter(text);

            try {
                await page.waitForSelector("span[jsname=W297wb]");
                const element = await page.$("textarea.KHxj8b.tL9Q4c");
                const textTranslated = await page.evaluate(
                    (element) => element.textContent,
                    element
                );




                const anotherTranslate = []; 
                //find adverb and conjunction
                try {
                    await page.waitForSelector("tbody.U87jab", {
                        timeout: 5000,
                    });
                    const moreTranslate = await page.$$("tbody.U87jab");



                    for (let i = 0; i < moreTranslate.length; i++) {
                        const contentMoreTranslate = await moreTranslate[i].$$("tr.TKwHGb");
                        for (let j = 0; j < contentMoreTranslate.length; j++) {

                            const moreTranslateEl = await contentMoreTranslate[j].$('span.kgnlhe');
                            const moreTranslateEl2 = await contentMoreTranslate[j].$(
                                "ul.FgtVoc.OvhKBb"
                            );
                            const textMoreTs = await moreTranslateEl.evaluate(node => node.innerText);
                            const textMoreTs2 = await moreTranslateEl2.evaluate(node => node.textContent);

                            anotherTranslate.push({
                                [textMoreTs]: textMoreTs2
                            })

                        }

                    }


                    return {
                        status: 'success',
                        translate: textTranslated,
                        moreTranslate: anotherTranslate
                    };
                } catch (e) {
                    return {
                        status: 'success',
                        translate: textTranslated,
                        moreTranslate: []
                    };
                }

            } catch (e) {
                return {
                    status: "error",
                    message: e.message
                };
            }

        } catch (err) {
            return {
                status: "error",
                message: err.message
            }
        }
    }
}
  
module.exports = translate;