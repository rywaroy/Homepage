import OneStore from './oneStore'
import LoadingStore from './loadingStore'
import timeStore from './timeStore'
import doubanStore from './doubanStore'
import dyttStore from './dyttStore'
import weatherStore from './weatherStore'
const store = {
    one:new OneStore(),
    loading:new LoadingStore(),
    time:new timeStore(),
    douban:new doubanStore(),
    dytt:new dyttStore(),
    weather:new weatherStore()
}

export default store