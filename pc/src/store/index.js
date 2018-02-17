import OneStore from './oneStore'
import LoadingStore from './loadingStore'
import timeStore from './timeStore'
import doubanStore from './doubanStore'
import dyttStore from './dyttStore'
const store = {
    one:new OneStore(),
    loading:new LoadingStore(),
    time:new timeStore(),
    douban:new doubanStore(),
    dytt:new dyttStore()
}

export default store