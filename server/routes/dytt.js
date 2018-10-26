const router = require('koa-router')();
const request = require('request');
const cheerio = require('cheerio');
const eventproxy = require('eventproxy');
const iconv = require('iconv-lite');

const ep = new eventproxy();

const options = {
    url: 'http://www.dytt8.net/html/gndy/dyzz/index.html',
    encoding: null,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
    },
};

router.get('/all', async ctx => {
    const page = ctx.query.page || 1;
    const pages = await getPage(page);
    let data = [];
    for (let i = 0; i < pages.length; i++) {
        const item = await getList(pages[i]);
        data = data.concat(item);
    }
    ctx.success(200, '获取成功', data);
});

// 获取电影天堂最新资源列表页码、链接
function getPage(page) {
    return new Promise((resolve) => {
        options.url = 'http://www.dytt8.net/html/gndy/dyzz/index.html';
        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const $ = cheerio.load(body, {
                    decodeEntities: false,
                });
                const arr = [];
                $('#header > div > div.bd2 > div.bd3 > div.bd3r > div.co_area2 > div.co_content8 > div > select option').each(function (index) {
                    if (page > index) {
                        arr.push($(this).val());
                    } else {
                        return false;
                    }
                });
                resolve(arr);
            }
        });
    });
}

// 获取每页列表资源
function getList(url) {
    return new Promise((resolve, reject) => {
        options.url = `http://www.dytt8.net/html/gndy/dyzz/${url}`;
        request(options, async function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const covertBody = iconv.decode(body, 'gbk');
                const $ = cheerio.load(covertBody, {
                    decodeEntities: false,
                });
                let arr = [];
                for (let i = 0; i < $('.co_content8 table').length; i = i + 5) {

                    await (new Promise(() => {
                        ep.after(`dytt${i}`, 5, function (dytts) {
                            arr = arr.concat(dytts);
                            resolve();
                        });
                        for (let j = i; j < i + 5; j++) {
                            let obj = {};
                            let url;
                            obj.title = $('.co_content8 table').eq(j).find('tr').eq(1).find('.ulink').text();
                            url = $('.co_content8 table').eq(j).find('tr').eq(1).find('.ulink').attr('href');
                            obj.time = $('.co_content8 table').eq(i).find('tr').eq(2).find('td').eq(1).find('font').text();
                            obj.intro = $('.co_content8 table').eq(i).find('tr').eq(3).find('td').eq(0).text();
                            getInfo(url, obj, i);
                        }
                    }));
                }
                resolve(arr);
            }
        });
    });
}


// 获取每个列表的详情页
// function getInfo(url) {
//     return new Promise((resolve, reject) => {
//         options.url = 'http://www.dytt8.net' + url
//         request(options, function (error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 let covertBody = iconv.decode(body, 'gbk');
//                 let $ = cheerio.load(covertBody, {
//                     decodeEntities: false
//                 });
//                 let content = $('#Zoom').html()
//                 resolve(content)
//             } else {
//                 reject()
//             }
//         })
//     })
// }
function getInfo(url, obj, i) {
    options.url = `http://www.dytt8.net${url}`;
    request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const covertBody = iconv.decode(body, 'gbk');
            const $ = cheerio.load(covertBody, {
                decodeEntities: false,
            });
            obj.content = $('#Zoom').html();
            ep.emit(`dytt${i}`, obj);
        }
    });
}

module.exports = router;
