import React, { Component } from 'react';
import { Menu, Icon} from 'antd';
import './menu.css'
import {Link} from 'react-router-dom';
const SubMenu = Menu.SubMenu;

export default class Sider extends Component {
    state = {
        collapsed: false,
      }
      toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      }
    render() {
      return (
        <div style={{ width: 200 }}>
        <div className="logo"><img src={require('../../assets/logo.jpg')} width="100%" height="100%" alt=""></img></div>
        <Menu
          mode="inline"
          theme="dark"
        >
          <SubMenu key="magazine" title={<span><Icon type="pie-chart" /><span>杂志</span></span>}>
            <Menu.Item key="one"><Link to='/magazine/one'>ONE · 一个</Link></Menu.Item>
          </SubMenu>
        </Menu>
      </div>
      );
    }
  }