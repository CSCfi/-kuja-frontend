import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button, SubtleButton, WizardBottom, Container } from './MuutospyyntoWizardComponents'
import { hasFormChanges } from "../modules/muutospyyntoUtil"
import PropTypes from 'prop-types'

class WizardActions extends Component {

    constructor(props) {
        super(props)
    }

    onPrevClick = () => {
        this.props.onPrev(this.props.pageNumber)
    }

    onNextClick = () => {
        this.props.onNext(this.props.pageNumber)
    }

    onSaveClick = () => {
        this.props.onSave()
    }

    render() {
        return (
            <WizardBottom>
                <Container maxWidth="1085px" padding="15px">
                    <Button type="button" className={`previous button-left ${ !this.props.onPrev ? 'button-hidden' : '' }`} onClick={ this.onPrevClick }>Edellinen</Button>
                    <div>
                        <SubtleButton disabled={ !this.props.isSavingEnabled } onClick={ this.onSaveClick }>Tallenna luonnos</SubtleButton>
                    </div>
                    <Button type="button" className={`next button-right ${ !this.props.onNext ? 'button-hidden' : '' }`} onClick={ this.onNextClick }>Seuraava</Button>
                </Container>
            </WizardBottom>
        )
    }
}

WizardActions.propTypes = {
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
    pageNumber: PropTypes.number,
    isSavingEnabled: PropTypes.bool,
    save: PropTypes.func
}

export default WizardActions