import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened : props.visible
    }
    this.onClose = this.onClose.bind(this);
    this.onConfirm = this.onConfirm.bind(this)
  }

  onClose() {
    this.setState({
      isOpened: false,
    });
    this.props.cancel()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.visible == true && !this.state.isOpened) {
      this.setState({ isOpened : nextProps.visible })
    } else if(!nextProps.visible){
      this.setState({ isOpened : nextProps.visible })
    }
  }

  onConfirm() {
    this.setState({
      isOpened: false,
    })
    this.props.onConfirm()
  }

  render() {
    const { onConfirm } = this.props
    var cancelButton = null
    if(this.props.cancelText) {
      cancelButton = (<Button bsSize="sm" bsStyle="default" onClick={this.onClose}>{this.props.cancelText}</Button>)
    }
    var modal = (
      <Modal show={this.state.isOpened} onHide={this.onClose} backdrop='static'>
        <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { this.props.body }
        </Modal.Body>
        <Modal.Footer>
          {cancelButton}
          <Button bsSize="sm" bsStyle={ this.props.confirmBSStyle } onClick={ this.onConfirm }>{ this.props.confirmText }</Button>
        </Modal.Footer>
      </Modal>
    );
    return modal
  }
}
