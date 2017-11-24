import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened : props.visible
    }
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.setState({
      isOpened: false,
    });
    this.props.onClose()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.visible == true && !this.state.isOpened) {
      this.setState({ isOpened : nextProps.visible })
    } else if(!nextProps.visible){
      this.setState({ isOpened : nextProps.visible })
    }
  }

  render() {
    const title = this.props.title != null? this.props.title : "Info"
    const size = this.props.size? this.props.size : 'large'
    var modal = (
      <Modal show={ this.state.isOpened } onHide={ this.onClose } backdrop='static' bsSize={ size }>
        <Modal.Header>
          <Modal.Title>{ title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.body}
        </Modal.Body>
        <Modal.Footer>
          <Button bsSize="sm" bsStyle={ this.props.confirmBSStyle } onClick={ this.onClose }>{ this.props.close }</Button>
        </Modal.Footer>
      </Modal>
    );
    return modal
  }
}
