import React, { Component } from 'react';
import './imgpreview.css';

export default class ImgPreview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: this.props.index,
		};
		this.len = this.props.imgs.length;
	}

	prev() { // 上一张
		if (this.state.index <= 0) {
			return;
		}
		this.setState({ index: this.state.index - 1 });
	}

	next() { // 下一张
		if (this.state.index >= this.len - 1) {
			return;
		}
		this.setState({ index: this.state.index + 1 });
	}

	render() {
		return (
			<div className="img-preview">
				<div className="img-preview-close" onClick={() => this.props.close()}></div>
				<div className="img-preview-left" onClick={() => this.prev()}></div>
				<img src={this.props.imgs[this.state.index]} alt="" className="img-preview-item" />
				<div className="img-preview-right" onClick={() => this.next()}></div>
			</div>
		);
	}
}

