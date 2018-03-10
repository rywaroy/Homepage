import React, {Component} from 'react';
import {Row, Col} from 'antd';
import utils from '../../utils'
import Masonry from 'masonry-layout'
import './album.css'

export default class Group extends Component{

	constructor(props){
        super(props)
        this.state = {
            list:[]
        }
    }
    
    componentDidMount(){
        this.getAlbums()
    }

    getAlbums(){
        utils.axios.get('album/group',{
            params:{
                id:this.props.match.params.id
            }
        }).then(res => {
            this.setState({
                list:res.data.data
            },() => {
                this.msnryInit()
            })
        })
    }

    msnryInit(){
        var msnry = new Masonry( '.grid', {
            columnWidth: 300,
            itemSelector: '.grid-item',
            gutter:10,
          });
    }
	
	render(){
		return(
			<Row>
				<Col span={2}/>
				<Col span={20}>
                    <div className="grid album">
                        {
                            this.state.list.map((item,index) => (
                                <div className="group-item grid-item" key={index}>
                                    <img src={item.url} width="100%"/>
                                </div>
                            ))
                        }
                        
                    </div>
				</Col>
				<Col span={2}/>
			</Row>
		)
	}
}

