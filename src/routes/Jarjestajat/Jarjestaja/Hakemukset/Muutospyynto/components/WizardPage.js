import React, { Component } from 'react'
import WizardActions from './WizardActions'
import PropTypes from 'prop-types'

class WizardPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isChangeDetected: false,
            formData: {}
        }
    }

    onChildComponentUpdate = (formValues) => {
        this.setState({
            isChangeDetected: true,
            formData: formValues
        })
    }

    onSave = () => {
        this.props.onSave(this.state.formData)
    }

    render() {
        return (
            <div>
                {
                    this.props.render({
                        onChildComponentUpdate: this.onChildComponentUpdate
                    })
                }
                <WizardActions
                    pageNumber={ this.props.pageNumber }
                    onPrev={ this.props.onPrev }
                    onNext={ this.props.onNext }
                    onSave={ this.onSave.bind(this) }
                    isSavingEnabled={ this.state.isChangeDetected }>
                </WizardActions>
            </div>
        )
    }
}

WizardPage.propTypes = {
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
    onSave: PropTypes.func,
    pageNumber: PropTypes.number
}

export default WizardPage