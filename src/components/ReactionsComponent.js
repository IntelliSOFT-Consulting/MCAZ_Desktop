import React, { Component } from 'react';

export default class ReactionsComponent extends Component {

  constructor(props) {
    super(props)
    const { connection, model, name } = this.props
    let reactions = model[name] == null ? [] : model[name]
    this.state = { connection, reactions : reactions }
    this.addReaction = this.addReaction.bind(this)
    this.removeReaction = this.removeReaction.bind(this)
    this.setModelValue = this.setModelValue.bind(this)
  }

  render() {
    const { readonly } = this.props
    let reactions = this.state.reactions.map((reaction, index) => {
      return (
        <div key={ index } className="form-group">
          <div className="col-md-10">
            <input disabled={ readonly? true : false } className="form-control input-sm col-md-10" type="text" name="reaction" value={ this.state.reactions[index]['reaction_name'] } onChange={ (e) => this.handleChange(index, e.target.value) }/>
          </div>
          <div className="col-md-2">
            <button className="btn btn-sm btn-danger" onClick={ (e) => this.removeReaction(e, index) } disabled={ readonly? true : false }>
              <span className="glyphicon glyphicon-trash"></span>
            </button>
          </div>
        </div>
      )
    })
    const addReactions = readonly? null : (
      <button className="btn btn-sm btn-default" onClick={ this.addReaction }>Add Reaction</button>
    )
    return(
      <div className="col-md-6 col-sm-12">
        <div className="form-group">
          Other Reactions? { addReactions }
        </div>
        { reactions }
      </div>
    )
  }

  addReaction(e) {
    e.preventDefault()
    let reactions = this.state.reactions
    reactions.push({ reaction_name : "" })
    this.setState({ reactions : reactions })
    this.setModelValue()
  }

  handleChange(i, value) {
    let reactions = this.state.reactions
    reactions[i] = { reaction_name : value }
    this.setState({ reactions : reactions})
    this.setModelValue()
  }

  removeReaction(e, i) {
    e.preventDefault()
    let reactions = this.state.reactions
    reactions.splice(i, 1)
    const newReaction = Object.assign([], reactions)
    this.setState({ reactions : newReaction })
    this.setModelValue()
  }

  setModelValue() {
    const { model, name } = this.props
    const { reactions } = this.state
    model[name] = reactions
  }

  componentWillReceiveProps(nextProps) {

  }
}
