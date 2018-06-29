import React, { Component } from 'react';
import './imgpreview.css';

export default class ImgPreview extends Component {
	render() {
		return (
			<div className="img-preview">
				<img src={this.props.imgs[this.props.index].url} alt="" className="img-preview-item" />
			</div>
		);
	}
}

