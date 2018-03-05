import OneStore from './oneStore'
import LoadingStore from './loadingStore'
import timeStore from './timeStore'
import doubanStore from './doubanStore'
import dyttStore from './dyttStore'
import weatherStore from './weatherStore'
import ArticleStore from './articleStore'

const store = {
    one:new OneStore(),
    loading:new LoadingStore(),
    time:new timeStore(),
    douban:new doubanStore(),
    dytt:new dyttStore(),
    weather:new weatherStore(),
    article:new ArticleStore()
}

export default store