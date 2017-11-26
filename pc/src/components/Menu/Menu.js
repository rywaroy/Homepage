import React, { Component } from 'react';
import { Menu, Icon, Switch , Button } from 'antd';
import './menu.css'
import {NavLink} from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

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
        <div className="logo"><img src={require('../../assets/logo.jpg')} width="100%" height="100%"></img></div>
        <Menu
          mode="inline"
          theme="dark"
        >
          <SubMenu key="sub1" title={<span><Icon type="pie-chart" /><span>杂志</span></span>}>
            <Menu.Item key="5"><NavLink to='/'>one</NavLink></Menu.Item>
            <Menu.Item key="6"><NavLink to='/two/two'>two</NavLink></Menu.Item>
          </SubMenu>
        </Menu>
      </div>
      );
    }
  }