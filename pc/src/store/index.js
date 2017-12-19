import OneStore from './oneStore'
import LoadingStore from './loadingStore'
import timeStore from './timeStore'
import doubanStore from './doubanStore'
const store = {
    one:new OneStore(),
    loading:new LoadingStore(),
    time:new timeStore(),
    douban:new doubanStore()
}

export default store