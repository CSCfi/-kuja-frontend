import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import Koulutusala from '../../../Jarjestajat/Jarjestaja/components/Koulutusala'
import MuuMaarays from '../../../Jarjestajat/Jarjestaja/components/MuuMaarays'

// import { slugify } from "../../../../../../modules/helpers"
// import { KOHTEET } from '../../../modules/constants'
import { COLORS } from "../../../../modules/styles"


const SectionWrapper = styled.div`
  margin-left: 30px;
  position: relative;
  border-bottom: 1px solid ${COLORS.BORDER_GRAY};
  padding: 0 0 26px;
  
  &:last-child {
    border-bottom: none;
  }
`

const Span = styled.span`
  font-size: 20px;
  position: absolute;
  left: -30px;
`

const H3 = styled.h3`
  text-transform: uppercase;
  font-size: 20px;
`

const Tutkinnot = styled.div`
  margin-bottom: 30px;
`

const MuutMaaraykset = styled.div`
  margin-bottom: 30px;
`


const ControlsWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

const Button = styled.div`
  color: ${props => props.textColor ? props.textColor : COLORS.WHITE};
  background-color: ${props => props.disabled ? COLORS.LIGHT_GRAY : props.bgColor ? props.bgColor : COLORS.OIVA_GREEN};
  border: 1px solid ${props => props.disabled ? COLORS.LIGHT_GRAY : props.bgColor ? props.bgColor : COLORS.OIVA_GREEN};
  cursor: pointer;
  display: inline-block;
  position: relative;
  margin-left: 15px;
  height: 36px;
  width: 140px;
  line-height: 36px;
  vertical-align: middle;
  text-align: center;
  border-radius: 2px;
  
  &:hover {
    color: ${props => props.disabled ? COLORS.WHITE : props.bgColor ? props.bgColor : COLORS.OIVA_GREEN};
    background-color: ${props => props.disabled ? COLORS.LIGHT_GRAY : props.textColor ? props.textColor : COLORS.WHITE};
    ${props => props.disabled ? 'cursor: not-allowed;' : null}
  }
`

class TutkinnotMuutos extends Component {

    getIsRemoving() {
        return this.props.muutokset.isRemoving
    }

    handleConfirmRemoveClick() {

    }

    handlePoistaTutkintojaClick() {
        this.props.toggleLupaSectionIsRemoving()
        if (!this.props.muutokset.isRemoving) {
            this.props.clearToBeRemoved()
        }
    }

    renderControls() {
        const { isRemoving, muutokset } = this.props.muutokset
        let count = 0
        if (muutokset) {
            count = muutokset.length
        }

        if (isRemoving) {
            return (
                <ControlsWrapper>
                    <Button disabled={count === 0} bgColor={COLORS.OIVA_GREEN} onClick={this.handleConfirmRemoveClick.bind(this)}>Poista valitut</Button>
                    <Button bgColor={COLORS.OIVA_RED} onClick={this.handlePoistaTutkintojaClick.bind(this)}>Peruuta</Button>
                </ControlsWrapper>
            )
        } else {
            return (
                <ControlsWrapper>
                    <Button bgColor={COLORS.OIVA_RED} onClick={this.handlePoistaTutkintojaClick.bind(this)}>Poista tutkintoja</Button>
                </ControlsWrapper>
            )
        }
    }

    render() {
        const { kohde } = this.props

        if (kohde) {
            const { kohdeid, heading } = kohde
            const { maaraykset, muutMaaraykset } = kohde
            const { isRemoving } = this.props.muutokset

            return (
                <SectionWrapper>
                    <Span>{`${kohdeid}.`}</Span>
                    <H3>{heading}</H3>

                    {this.renderControls()}
                    {isRemoving
                        ? <p>Valitse poistettavat tutkinnot</p>
                        : null
                    }
                    <div>
                        <Tutkinnot>
                            {_.map(maaraykset, (ala, i) => <Koulutusala key={i} {...ala} renderCheckbox={isRemoving} />)}
                        </Tutkinnot>
                        <MuutMaaraykset>
                            {_.map(muutMaaraykset, (poikkeus, i) => <MuuMaarays key={i} {...poikkeus} />)}
                        </MuutMaaraykset>
                    </div>
                </SectionWrapper>
            )
        } else {
            return <SectionWrapper><H3>Ei kohdetietoja</H3></SectionWrapper>
        }
    }
}

export default withRouter(TutkinnotMuutos)
