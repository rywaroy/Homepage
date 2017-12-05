import OneStore from './oneStore'
import LoadingStore from './loadingStore'
import timeStore from './timeStore'
const store = {
    one:new OneStore(),
    loading:new LoadingStore(),
    time:new timeStore()
}

export default store