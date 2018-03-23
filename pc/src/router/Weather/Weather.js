import React, {Component} from 'react';
import {Row, Col, Select} from 'antd';
import utils from '../../utils'
import store from '../../store'
import {observer} from 'mobx-react'
import './weather.css'
const Option = Select.Option;

@observer
export default class Weather extends Component{

    componentDidMount(){
        store.weather.future.length === 0 && this.getInfo()
    }

    getInfo(){
        utils.axios.get('weather/all?city=' + store.weather.value)
            .then(res => {
                store.weather.setFuture(res.data.data.weather[0].future)
                store.weather.setNow(res.data.data.weather[0].now)
            })
    }

    //解析天气编码
    getWeatherCode(code){
        if(code < 4){
            return 1  //晴
        }else if(code < 9){
            return 2 //多云
        }else if(code < 10){
            return 3 //阴
        }else if(code < 19){
            return 4 //雨
        }else if(code < 26){
            return 5 //雪
        }else{
            return 6 //其他
        }
    }

    //选择城市
    selectCity(value){
        store.weather.setCity(value)
        this.getInfo()
    }

	render(){
		return(
			<Row>
				<Col span={2}/>
                <Col span={20}>
                <div className="weather">
                    <div className="weather-citys">
                        <Select style={{width: 120}} defaultValue={store.weather.value}
                                onChange={this.selectCity.bind(this)}>
                            {store.weather.citys.map((item, index) => (
                                <Option value={item.value} key={index}>{item.label}</Option>
                            ))}
                        </Select>
                    </div>
                    { 
                        store.weather.now ? 
                            <div className="weather-now f-cb">
                                温度:{store.weather.now.temperature}℃<br />
                                体感温度:{store.weather.now.feels_like} <br />
                                风向:{store.weather.now.wind_direction} <br />
                                风力大小:{store.weather.now.wind_scale} <br />
                                空气湿度:{store.weather.now.humidity} <br />
                                能见度:{store.weather.now.visibility}km<br />
                                气压:{store.weather.now.pressure}hPa<br />
                                空气质量指数:{store.weather.now.air_quality.city.aqi} <br />
                                pm2.5指数:{store.weather.now.air_quality.city.pm25} <br />
                                空气质量:{store.weather.now.air_quality.city.quality} <br />
                                上次更新时间:{store.weather.now.air_quality.city.last_update} <br />
                            </div>
                            :
                            null
                    }
                    
                        <div className="weather-week f-cb">
                            {
                                store.weather.future.map((item,index) => (
                                    <div className={"weather-week-item lv" + this.getWeatherCode(item.code1)} key={index}>
                                        <div className="weather-week-date">{item.date}</div>
                                        <div className="weather-week-day">{item.day}</div>
                                        <div className={'weather-icon icon' + this.getWeatherCode(item.code1)}></div>
                                        <div className={'weather-icon icon' + this.getWeatherCode(item.code2)}></div>
                                        <div className="weather-week-intro">{item.text} {item.wind}</div>
                                        <div className="weather-week-cen">{item.low}℃ / {item.high}℃</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </Col>
				<Col span={2}/>
			</Row>
		)
	}
}

