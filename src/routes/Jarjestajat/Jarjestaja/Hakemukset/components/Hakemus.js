import React, { Component } from 'react'

class Hakemus extends Component {
  constructor() {
    super()
    this.state = {
      showModal: false
    }
  }

  componentDidMount() {
    const { hakemus } = this.props

    if (!hakemus) {
      this.setState({
        showModal: true
      })
    }
  }

  render() {
    const { showModal } = this.state
    return (
      <div>
        {
          showModal === true
          ? <div>MODAALIN PLACEHOLDER</div>
          : <div>HAKEMUKSEN TIEDOT PLACEHOLDER</div>
        }
      </div>
    )
  }
}

export default Hakemus
