import React, { Component } from 'react'
import styled from 'styled-components'
import { getIndex } from "../modules/muutosUtil"
import { COLORS } from "../../../../../../modules/styles"
import { MUUTOS_TYPES } from "../modules/uusiHakemusFormConstants"
import { KOODISTOT } from "../../../modules/constants"
import { parseLocalizedField } from "../../../../../../modules/helpers"
import { FaFileAlt, FaTimes } from 'react-icons/fa';

import PerusteluSelect from './PerusteluSelect'
import PerusteluOppisopimus from './PerusteluOppisopimus'
import PerusteluVaativa from './PerusteluVaativa'
import PerusteluTyovoima from './PerusteluTyovoima'
import PerusteluVankila from './PerusteluVankila'
import PerusteluKuljettajaPerus from './PerusteluKuljettajaPerus'
import PerusteluKuljettajaJatko from './PerusteluKuljettajaJatko'

import { HAKEMUS_VIRHE } from "../modules/uusiHakemusFormConstants"

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
const Error = styled.div`
  color: ${COLORS.OIVA_RED};
  margin-bottom: 8px;
`
const LiiteListItem = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: stretch;
  align-items: center;
  width: 100%;
  padding: 2px;
  button {
    background-color: transparent;
    border: 0;
    height: 24px;
    width: 24px;
    margin-left: 8px;
    cursor: cursor;
    &:hover {
      color: ${props => props.disabled ? COLORS.WHITE : props.bgColor ? props.bgColor : COLORS.WHITE};
      background-color: ${props => props.disabled ? COLORS.LIGHT_GRAY : props.textColor ? props.textColor : COLORS.OIVA_GREEN};
      ${props => props.disabled ? 'cursor: not-allowed;' : null}
      cursor: pointer;
    }
  }
  svg {
    margin: 0 0 -2px 0;
  }
  input {
    min-width: 300px;
    height: 24px;
    font-size: 14px;
    flex: 1;
    margin: 0 8px 0 4px;
    padding: 0 8px 0 4px;
  }
  .name {
    flex: 1;
    margin-left: 8px;
  }
  .size {
    min-width: 70px;
    text-align: right;
  }
  &:hover {
    background-color: ${COLORS.OIVA_TABLE_HOVER_COLOR};
  }
`

class Perustelu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fileError: false
    }
  }

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
    if (koodisto === KOODISTOT.OIVA_TYOVOIMAKOULUTUS  && koodiarvo == 1 && (type === MUUTOS_TYPES.ADDITION || type === MUUTOS_TYPES.CHANGE )) {
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
    if (koodisto === KOODISTOT.OIVA_MUUT && koodiarvo == 5 && (type === MUUTOS_TYPES.ADDITION || type === MUUTOS_TYPES.CHANGE )) {
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
    if (koodisto === KOODISTOT.KULJETTAJAKOULUTUS && sisaltaa_merkityksen == "perus" && (type === MUUTOS_TYPES.ADDITION || type === MUUTOS_TYPES.CHANGE )) {
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
    if (koodisto === KOODISTOT.KULJETTAJAKOULUTUS  && sisaltaa_merkityksen == "jatko" && (type === MUUTOS_TYPES.ADDITION || type === MUUTOS_TYPES.CHANGE )) {
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
      console.log("File selected");
      console.log(e.target.files[0]);

      const type = e.target.files[0].name.split('.').pop().toLowerCase();

      // Rajoitetaan max kooksi 25MB ja vain pdf, word, excel, jpeg ja gif on sallittuja
      if (e.target.files[0].size <= 26214400 && 
          ['pdf', 'doc', 'txt', 'docx', 'xls', 'xlsx', 'xlsm', 'jpg', 'jpeg', 'jpe', 'jfif', 'gif'].includes(type)) {
  
        this.setState({fileError: false});
  
        obj = fields.get(i);
        if (!obj.liitteet) {
          obj.liitteet = new Array();
        }
        liite.tiedostoId = e.target.files[0].name+"-"+Math.random();
        liite.kieli = "fi";
        liite.tyyppi = type;
        liite.nimi = e.target.files[0].name;
        liite.tiedosto = e.target.files[0];
        liite.koko = e.target.files[0].size;
        liite.removed = false;
        obj.liitteet.push(liite);
        fields.remove(i);
        fields.insert(i, obj);
      } else return (
        this.setState({fileError: true})
      )
    }

    const removeAttachment = (e, tiedostoId, uuid) => {
      obj = fields.get(i);
      let index = 0;
      obj.liitteet.map( liite => {
        if ( (tiedostoId && (liite.tiedostoId === tiedostoId)) || (uuid && (liite.uuid === uuid)) ) {
          liite.removed = true;
          obj.liitteet[index] = liite;
          fields.remove(i);
          fields.insert(i, obj);
          return;
        }
        index++;
      })
    }

    const setAttachmentName = (e, tiedostoId, uuid) => {
      obj = fields.get(i);
      let index = 0;
      obj.liitteet.map( liite => {
        if ( tiedostoId && (liite.tiedostoId === tiedostoId) || (uuid && (liite.uuid === uuid)) ) {
          liite.nimi = e.target.value;
          obj.liitteet[index] = liite;
          fields.remove(i);
          fields.insert(i, obj);
          return;
        }
        index++;
      })
    }
    
    const bytesToSize = (bytes)  => {
      if (!bytes || bytes === 0) return '';

      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = parseInt(Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024)), 10);
      if (i === 0)
        return `(${bytes} ${sizes[i]}))`;
      else
        return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
    }

    const Liitteet = () => {
      return (
        fields && fields.get(i) && fields.get(i).liitteet && fields.get(i).liitteet.map( liite => 
            <div key={liite.tiedostoId ? liite.tiedostoId : liite.uuid} >
              {/* Liite tallentamaton: nimeäminen mahdollista (tiedostoId olemassa) */}
              {!liite.removed && liite.tiedostoId &&
                <LiiteListItem>
                  <FaFileAlt />
                  <input onBlur={(e) => setAttachmentName(e, liite.tiedostoId, liite.uuid)} defaultValue={liite.nimi} />
                  <span className="size">{ bytesToSize(liite.koko) }</span>
                  <button onClick={(e) => removeAttachment(e,liite.tiedostoId,liite.uuid)}><FaTimes /></button>
                </LiiteListItem>
              }
              {/* Liite tallennettu */}
              {!liite.removed && !liite.tiedostoId &&
                <LiiteListItem>     
                  <FaFileAlt />
                  <span className="name">{liite.nimi}</span>
                  <span className="size">{ bytesToSize(liite.koko) }</span>
                  <button onClick={(e) => removeAttachment(e,liite.tiedostoId,liite.uuid)}><FaTimes /></button>
                </LiiteListItem>
              }
            </div> 
        )
      )
    }

    return (
      <PerusteluWrapper>
        <PerusteluSelect
          muutosperustelukoodiarvo={muutosperustelukoodiarvo}
          muutosperustelut={muutosperustelut.muutosperusteluList}
          muutos={muutos}
          muutokset={muutokset}
          fields={fields}
        />
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
        { this.state.fileError && <Error>{HAKEMUS_VIRHE.LIITE.FI}</Error> }
        < Liitteet />
      </PerusteluWrapper>
    )
  }
}

export default Perustelu
