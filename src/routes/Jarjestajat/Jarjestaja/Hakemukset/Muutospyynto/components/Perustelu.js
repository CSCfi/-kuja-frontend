import React, { Component } from 'react'
import styled from 'styled-components'
import { getIndex } from "../modules/muutosUtil"
import { COLORS } from "../../../../../../modules/styles"
import { MUUTOS_TYPES } from "../modules/uusiHakemusFormConstants"
import { KOODISTOT } from "../../../modules/constants"
import { parseLocalizedField } from "../../../../../../modules/helpers"

import PerusteluSelect from './PerusteluSelect'
import PerusteluOppisopimus from './PerusteluOppisopimus'
import PerusteluVaativa from './PerusteluVaativa'
import PerusteluTyovoima from './PerusteluTyovoima'
import PerusteluVankila from './PerusteluVankila'
import PerusteluKuljettajaPerus from './PerusteluKuljettajaPerus'
import PerusteluKuljettajaJatko from './PerusteluKuljettajaJatko'

import Liite from './Liite'

const PerusteluWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 3px solid ${COLORS.BORDER_GRAY};
  padding: 0 110px 30px 60px;
  margin: 10px 40px 20px 40px;
  
  textarea {
    width: 100%;
    max-width: 100%;
    font-size: 14px;
    border: 1px solid ${COLORS.BORDER_GRAY};
    
    &:focus {
      outline: none;
    }
  }
`

const PerusteluTopArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`
class Perustelu extends Component {

  componentWillMount() {
    const { muutosperustelut, vankilat, ELYkeskukset } = this.props

    if (muutosperustelut && !muutosperustelut.fetched) {
      this.props.fetchMuutosperustelut()
    }

    if (vankilat && !vankilat.fetched) {
      this.props.fetchVankilat()
    }

    if (ELYkeskukset && !ELYkeskukset.fetched) {
      this.props.fetchELYkeskukset()
    }

  }

  render() {

    const { helpText, muutos, muutokset, koodiarvo, sisaltaa_merkityksen, fields, perusteluteksti, muutosperustelukoodiarvo, muutosperustelut, vankilat, ELYkeskukset } = this.props
    const { perusteluteksti_oppisopimus, perusteluteksti_vaativa, perusteluteksti_tyovoima, perusteluteksti_vankila } = this.props
    const { perusteluteksti_kuljetus_perus, perusteluteksti_kuljetus_jatko} = this.props
    const { koodisto, type, metadata } = muutos
    const kasite = parseLocalizedField(metadata, 'FI', 'kasite');
    const i = getIndex(muutokset, koodiarvo);

    // let fileReader = new FileReader();
    let liite = {};
    let obj = fields.get(i);

    // lisälomakkeet
    // tulevat vain lisäyksille tai muutoksille.
    // koodisto on oiva muut

    // laajennettu oppisopimus

    if (koodisto === KOODISTOT.OIVA_MUUT && kasite === "laajennettu" && (type === MUUTOS_TYPES.ADDITION )) {
      return (
        <PerusteluWrapper>
          <PerusteluOppisopimus
            muutosperustelut={muutosperustelut}
            perusteluteksti_oppisopimus={perusteluteksti_oppisopimus}
            fields={fields}
            muutokset={muutokset}
            koodiarvo={koodiarvo}
          />
        </PerusteluWrapper>
      )
   }

    // vaativa erityinen tuki
    // pitääkö tulla vain yksi perustelu-lomake, vaikka kaikki kolme eri vaihtoehtoa on valittu: ohjeistettu valitsemaan vain yksi
    if (koodisto === KOODISTOT.OIVA_MUUT && (kasite === "vaativa_1" || kasite === "vaativa_2" ) && (type === MUUTOS_TYPES.ADDITION || type === MUUTOS_TYPES.CHANGE )) {
      return (
        <PerusteluWrapper>
          <PerusteluVaativa
            muutosperustelut={muutosperustelut}
            perusteluteksti_vaativa={perusteluteksti_vaativa}
            fields={fields}
            muutokset={muutokset}
            koodiarvo={koodiarvo}
            muutos={muutos}
          />
        </PerusteluWrapper>
      )
    }

    // Työvoimakoulutus
    // lisäykset ja muutokset tässä, mikäli oikeus poistetaan, tulee se normiperusteluilla
    if (koodisto === KOODISTOT.OIVA_TYOVOIMAKOULUTUS  && koodiarvo === 1 && (type === MUUTOS_TYPES.ADDITION || type === MUUTOS_TYPES.CHANGE )) {
      return (
        <PerusteluWrapper>
          <PerusteluTyovoima
            muutosperustelut={muutosperustelut}
            muutosperustelukoodiarvo={muutosperustelukoodiarvo}
            perusteluteksti_tyovoima={perusteluteksti_tyovoima}
            fields={fields}
            muutokset={muutokset}
            koodiarvo={koodiarvo}
            muutos={muutos}
            ELYkeskukset={ELYkeskukset.ELYkeskusList}
          />
        </PerusteluWrapper>
      )
    }

    // Vankilakoulutus
    // lisäykset ja muutokset tässä, mikäli oikeus poistetaan, tulee se normiperusteluilla
    if (koodisto === KOODISTOT.OIVA_MUUT && koodiarvo === 5 && (type === MUUTOS_TYPES.ADDITION || type === MUUTOS_TYPES.CHANGE )) {
      return (
        <PerusteluWrapper>
          <PerusteluVankila
            muutosperustelut={muutosperustelut}
            perusteluteksti_vankila={perusteluteksti_vankila}
            fields={fields}
            muutokset={muutokset}
            koodiarvo={koodiarvo}
            muutos={muutos}
            vankilat={vankilat.vankilaList}
          />
        </PerusteluWrapper>
      )
    }

    // Kuljettajakoulutus - perustaso
    // lisäykset ja muutokset tässä, mikäli oikeus poistetaan, tulee se normiperusteluilla
    if (koodisto === KOODISTOT.KULJETTAJAKOULUTUS && sisaltaa_merkityksen === "perus" && (type === MUUTOS_TYPES.ADDITION || type === MUUTOS_TYPES.CHANGE )) {
      return (
        <PerusteluWrapper>
          <PerusteluKuljettajaPerus
            muutosperustelut={muutosperustelut}
            muutosperustelukoodiarvo={muutosperustelukoodiarvo}
            perusteluteksti_kuljetus_perus={perusteluteksti_kuljetus_perus}
            fields={fields}
            muutokset={muutokset}
            koodiarvo={koodiarvo}
            muutos={muutos}
          />
        </PerusteluWrapper>
      )
    }

    // Kuljettajakoulutus - jatko
    // lisäykset ja muutokset tässä, mikäli oikeus poistetaan, tulee se normiperusteluilla
    if (koodisto === KOODISTOT.KULJETTAJAKOULUTUS  && sisaltaa_merkityksen === "jatko" && (type === MUUTOS_TYPES.ADDITION || type === MUUTOS_TYPES.CHANGE )) {
      return (
        <PerusteluWrapper>
          <PerusteluKuljettajaJatko
            muutosperustelut={muutosperustelut}
            muutosperustelukoodiarvo={muutosperustelukoodiarvo}
            perusteluteksti_kuljetus_jatko={perusteluteksti_kuljetus_jatko}
            fields={fields}
            muutokset={muutokset}
            koodiarvo={koodiarvo}
            muutos={muutos}
          />
        </PerusteluWrapper>
      )
    }

    const setAttachment = e => {
      obj = fields.get(i);
      if (!obj.liitteet) {
        obj.liitteet = [];
      }
      liite.tiedostoId = "file"+koodiarvo+"-"+Math.random();
      liite.kieli = "fi";
      liite.tyyppi = e.target.files[0].name.split('.').pop();
      liite.nimi = e.target.files[0].name;
      liite.tiedosto = e.target.files[0];
      obj.liitteet.push(liite);
      fields.remove(i);
      fields.insert(i, obj);
    }

    const setAttachmentName = e => {
      obj = fields.get(i);
      obj.liitteet[0].nimi = e.target.value;
    }

    return (
      <PerusteluWrapper>

        {/* Näytä tutkinnoille. Tutkinnot ja koulutukset samassa koodistossa.
        Tutkinnoilla on koulutusala, koulutuksilla ei. */}
        { koodisto === KOODISTOT.KOULUTUS && muutos.meta.koulutusala && 
          <PerusteluSelect
            muutosperustelukoodiarvo={muutosperustelukoodiarvo}
            muutosperustelut={muutosperustelut.muutosperusteluList}
            muutos={muutos}
            muutokset={muutokset}
            fields={fields}
          />
        }

        {/* Näytä vähimmäisopiskelijavuosille. */}
        { koodisto === KOODISTOT.KOULUTUSSEKTORI && 
          <PerusteluSelect
            muutosperustelukoodiarvo={muutosperustelukoodiarvo}
            muutosperustelut={muutosperustelut.muutosperusteluList}
            muutos={muutos}
            muutokset={muutokset}
            fields={fields}
          />
        }


        <PerusteluTopArea>
          <span>{helpText}</span>
          <span>Ohje</span>
        </PerusteluTopArea>
        <textarea
          rows="5"
          defaultValue={perusteluteksti !== null ? perusteluteksti : undefined}
          onBlur={(e) => {
            let obj = fields.get(i)
            obj.meta.perusteluteksti = e.target.value
            fields.remove(i)
            fields.insert(i, obj)
          }}
        />
        <Liite setAttachment={setAttachment} setAttachmentName={setAttachmentName} />
        <br />
        {/* Liite listaus */}
        { fields && fields.get(i) && fields.get(i).liitteet && fields.get(i).liitteet.map( 
          liite => <span key={liite.nimi+liite.tiedostoId}>{liite.nimi}</span> 
        )}
      </PerusteluWrapper>
    )
  }
}

export default Perustelu
