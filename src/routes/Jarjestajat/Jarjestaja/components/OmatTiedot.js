import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import HeaderBar from 'modules/Header/components/HeaderBar'
import LinkItemUpper from 'modules/Header/components/LinkItemUpper'
import LinkItem from 'modules/Header/components/LinkItem'
import { ROLE_ESITTELIJA, ROLE_KAYTTAJA } from 'modules/constants'
import { LUPA_TEKSTIT } from "../../../Jarjestajat/Jarjestaja/modules/constants"
import { COLORS, FONT_STACK } from 'modules/styles'
import { getRoles, getOrganisation } from 'routes/Login/modules/user'
import Loading from '../../../../modules/Loading'
import { InnerContentContainer, InnerContentWrapper  } from "../../../../modules/elements"

class OmatTiedot extends Component {

  componentDidMount() {
    // getRoles lataa datan sessionStorageen
    this.props.getRoles().then(() => {
       this.props.getOrganisation(sessionStorage.getItem('oid'))
    })
  }

  render() {

    console.log(this.props.user);
    const { oppilaitos } = this.props.user;
    let ytunnus = undefined;
    let postinumero = undefined;
    let ppostinumero = undefined;
    if (oppilaitos) {
        if (oppilaitos.organisaatio) {
            ytunnus = oppilaitos.organisaatio.ytunnus
            postinumero = oppilaitos.organisaatio.kayntiosoite.postinumeroUri.substr(6)
            ppostinumero = oppilaitos.organisaatio.postiosoite.postinumeroUri.substr(6)
        }
    }

    if (oppilaitos && oppilaitos.organisaatio)
      return (
        <InnerContentContainer>
          <InnerContentWrapper>
            <h2>{LUPA_TEKSTIT.OMATTIEDOT.OTSIKKO.FI}</h2>
            <h3>{LUPA_TEKSTIT.OMATTIEDOT.KAYNTIOSOITE.FI}</h3>
            <p>
              {oppilaitos.organisaatio.kayntiosoite.osoite},&nbsp;
              {postinumero}&nbsp;
              {oppilaitos.organisaatio.kayntiosoite.postitoimipaikka}
            </p>
            <h3>{LUPA_TEKSTIT.OMATTIEDOT.POSTIOSOITE.FI}</h3>
            <p>
              {oppilaitos.organisaatio.postiosoite.osoite},&nbsp;
              {ppostinumero}&nbsp;
              {oppilaitos.organisaatio.postiosoite.postitoimipaikka}
            </p>
            <h3>{LUPA_TEKSTIT.OMATTIEDOT.YHTEYSTIEDOT.FI}</h3>
            <p>
              <b>{LUPA_TEKSTIT.OMATTIEDOT.PUHELINNUMERO.FI}:</b> {oppilaitos.organisaatio.yhteystiedot[9].numero}
            </p>
            <p>
              <b>{LUPA_TEKSTIT.OMATTIEDOT.WWWW.FI}</b> <a href={oppilaitos.organisaatio.yhteystiedot[2].www} target="full">{oppilaitos.organisaatio.yhteystiedot[2].www}</a>
            </p>
            <p>
              <b>{LUPA_TEKSTIT.OMATTIEDOT.EMAIL.FI}:</b> {oppilaitos.organisaatio.yhteystiedot[6].email}
            </p>
            <br />
            <p>{LUPA_TEKSTIT.OMATTIEDOT.INFO.FI}</p>
          </InnerContentWrapper>
        </InnerContentContainer>
      ) 
    else
      return <Loading />

    // Käyntiosoite: Hallilantie 24 , 33820  TAMPERE
    // Postiosoite: Ahlmanin koulu Hallilantie 24 , 33820  TAMPERE
    // Puhelinnumero: 03 3399 2500
    // Www-osoite: http://www.ahlman.fi
    // Sähköpostiosoite: ahlman@ahlman.fi
    // Sivulle myös info: Tiedot tulevat Opetushallituksen Organisaatiotietopalvelusta, joka päivittää ne Yritys- ja yhteisötietojärjestelmästä. Muutokset tietoihin sitä kautta.
    
  }
}

function mapStateToProps(state) {
  return { user: state.user }
}

function mapDispatchToProps(dispatch) {
  return {
    getRoles: () => dispatch(getRoles()),
    getOrganisation: (oid) => dispatch(getOrganisation(oid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(OmatTiedot)
