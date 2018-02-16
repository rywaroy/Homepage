const router = require('koa-router')();
const request = require('request')
const cheerio = require("cheerio");
const iconv = require('iconv-lite')

let options = {
    url: 'http://www.dytt8.net/html/gndy/dyzz/index.html',
    encoding:null,
	headers: {
		'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
	}
};

router.get('/all', async ctx => {
    let page = ctx.query.page || 1;
    let pages = await getPage(page)
    let data = []
    for(let i = 0; i < pages.length; i++){
        let item = await getList(pages[i])
        data = data.concat(item)
    }
    
	// let data = await( new Promise ((resolve,reject) => {
	// 	request(options,function (error, response, body) {
	// 		resolve(body)
	// 	})
	// }))
	ctx.body = {data:data}
})

//获取电影天堂最新资源列表页码、链接
function getPage(page){
    return new Promise((resolve,reject) => {
        request(options,function (error, response, body) {
			if(!error && response.statusCode == 200){
                let $ = cheerio.load(body,{decodeEntities: false});
                let arr = []
                $("#header > div > div.bd2 > div.bd3 > div.bd3r > div.co_area2 > div.co_content8 > div > select option").each(function(index,el){
                    if(page > index){
                        arr.push($(this).val())
                    }else{
                        return false
                    }
                    // arr.push($(this).val())
                })
                resolve(arr)
            }
		})
    })
}

//获取每页列表资源
function getList(url){
    return new Promise((resolve,reject) => {
        options.url = 'http://www.dytt8.net/html/gndy/dyzz/' + url
        request(options,function (error, response, body) {
			if(!error && response.statusCode == 200){
                let covertBody = iconv.decode(body,'gbk');
                let $ = cheerio.load(covertBody,{decodeEntities: false});
                let arr = []
                $('.co_content8 table').each(function(index,el){
                    let obj = {}
                    obj.title = $(this).find('tr').eq(1).find('.ulink').text()
                    obj.time = $(this).find('tr').eq(2).find('td').eq(1).find('font').text()
                    obj.intro = $(this).find('tr').eq(3).find('td').eq(0).text()
                    arr.push(obj)
                })
                resolve(arr)
            }
		})
    })
}

module.exports = router;