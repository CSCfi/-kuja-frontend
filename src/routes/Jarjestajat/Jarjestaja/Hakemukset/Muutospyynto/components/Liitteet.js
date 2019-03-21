import React, { Component } from 'react'
import styled from 'styled-components'
import { COLORS } from "../../../../../../modules/styles"
import { FaRegFile, FaFile, FaTimes, FaLock } from 'react-icons/fa';
import { HAKEMUS_VIRHE, HAKEMUS_OTSIKOT, HAKEMUS_VIESTI } from "../modules/uusiHakemusFormConstants"
import Liite from './Liite'
import { getIndex } from "../modules/muutosUtil"

const Error = styled.div`
  color: ${COLORS.OIVA_RED};
  margin-bottom: 8px;
`
const Message = styled.div`
  color: ${COLORS.OIVA_GREEN};
  margin-bottom: 8px;
`
const Checkbox = styled.div`
  width: 20px;
  position: relative;
  margin: 6px 10px 0 10px;
  
  label {
    width: 20px;
    height: 20px;
    cursor: pointer;
    position: absolute;
    top: -3px;
    left: 0;
    background: white;
    border-radius: 0;
    border: 1px solid ${COLORS.OIVA_GREEN};
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 2px;
    
    &:hover {
      &:after {
        border-color: ${COLORS.OIVA_GREEN};
        opacity: 0.5;
      }
    }
  }
  input[type=checkbox] {
    visibility: hidden;

    &:checked + label {
      color: ${COLORS.OIVA_GREEN};
      &:hover {
        &:after {
          background: rgba(90, 138, 112, 0.0);
        }
      }
    }
    
    &:checked + label:after {
      opacity: 1;
    }
    
    &:checked + label:hover {
      &:after {
        border-color: white;
        opacity: 1;
      }
    }
  }
`
const Secret = styled.div`
  width: 20px;
  position: relative;
  margin: 0 10px 0;
  display: flex;
  justify-content: center;
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

class Liiteet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileError: false,
      fileAdded: ""
    }
  }
  render() {
    const { muutokset, fields, koodiarvo } = this.props

    console.log(fields);
    console.log(koodiarvo);

    let liite = {};

    const setAttachment = e => {

      this.setState({fileError: false});
      this.setState({fileAdded: ""});

      if (e.target.files.length === 0) return;

      console.log("File selected");
      console.log(e.target.files[0]);

      const type = e.target.files[0].name.split('.').pop().toLowerCase();

      // Rajoitetaan max kooksi 25MB ja vain pdf, word, excel, jpeg ja gif on sallittuja
      if (e.target.files[0].size <= 26214400 && 
          ['pdf', 'doc', 'txt', 'docx', 'xls', 'xlsx', 'xlsm', 'jpg', 'jpeg', 'jpe', 'jfif', 'gif'].includes(type)) {
  
        let obj = undefined;
        let i = 0;
        if (koodiarvo) {
          i = getIndex(muutokset, koodiarvo);
          obj = fields.get(i);
          if (!obj) return;
          if (!obj.liitteet) {
            obj.liitteet = []
          }
        }
    
        liite.tiedostoId = e.target.files[0].name+"-"+Math.random();
        liite.kieli = "fi";
        liite.tyyppi = type;
        liite.nimi = e.target.files[0].name;
        liite.tiedosto = e.target.files[0];
        liite.koko = e.target.files[0].size;
        liite.removed = false;
        liite.salainen = false;
        console.log(koodiarvo);

        if (koodiarvo) {
          obj.liitteet.push(liite);
          fields.remove(i);
          fields.insert(i, obj);
          console.log(fields);
        } else {
          if (!fields.liitteet) {
            fields.liitteet = [];
          }
          fields.liitteet.push(liite);
          console.log(fields.liitteet);
        }
        this.setState({fileAdded: liite.nimi })
      } else return (
        this.setState({fileError: true })
      )
    }

    const removeAttachment = (e, tiedostoId, uuid) => {
      this.setState({fileError: false});
      this.setState({fileAdded: ""});
      let obj = undefined;
      let i = 0;
      if (koodiarvo) {
        i = getIndex(muutokset, koodiarvo);
        obj = fields.get(i);
        obj.liitteet.map( (liite, index) => {
          if ( (tiedostoId && (liite.tiedostoId === tiedostoId)) || (uuid && (liite.uuid === uuid)) ) {
            liite.removed = true;
            obj.liitteet[index] = liite;
            fields.remove(i);
            fields.insert(i, obj);
            return true;
          } else return false;
        })
      } else {
        fields.liitteet.map( (liite, index) => {
          if ( (tiedostoId && (liite.tiedostoId === tiedostoId)) || (uuid && (liite.uuid === uuid)) ) {
            liite.removed = true;
            fields.liitteet[index] = liite;
            return true;
          } else return false;
        })
      }
    }

    const setAttachmentName = (e, tiedostoId, uuid) => {
      this.setState({fileError: false});
      this.setState({fileAdded: ""});
      let obj = undefined;
      let i = 0;
      if (koodiarvo) {
        i = getIndex(muutokset, koodiarvo);
        obj = fields.get(i);
        obj.liitteet.map( (liite, index) => {
          if ( (tiedostoId && (liite.tiedostoId === tiedostoId)) || (uuid && (liite.uuid === uuid)) ) {
            liite.nimi = e.target.value;
            const type = liite.nimi.split('.').pop().toLowerCase();
            if (type !== liite.tyyppi) liite.nimi = liite.nimi + "." + liite.tyyppi;
            obj.liitteet[index] = liite;
            fields.remove(i);
            fields.insert(i, obj);
            return true;
          } return false;
        }
      )} else {
        fields.liitteet.map( (liite, index) => {
          if ( (tiedostoId && (liite.tiedostoId === tiedostoId)) || (uuid && (liite.uuid === uuid)) ) {
            liite.nimi = e.target.value;
            const type = liite.nimi.split('.').pop().toLowerCase();
            if (type !== liite.tyyppi) liite.nimi = liite.nimi + "." + liite.tyyppi;
            fields.liitteet[index] = liite;
            return true;
          } else return false;
        })
      }
    }

    const setAttachmentVisibility= (e, tiedostoId, uuid) => {
      this.setState({fileError: false});
      let obj = undefined;
      let i = 0;
      if (koodiarvo) {
        i = getIndex(muutokset, koodiarvo);
        obj = fields.get(i);
        obj.liitteet.map( (liite, index) => {
          if ( (tiedostoId && (liite.tiedostoId === tiedostoId)) || (uuid && (liite.uuid === uuid)) ) {
            liite.salainen = e.target.checked;
            obj.liitteet[index] = liite;
            fields.remove(i);
            fields.insert(i, obj);
            return true;
          } return false;
        }
      )} else {
        fields.liitteet.map( (liite, index) => {
          if ( (tiedostoId && (liite.tiedostoId === tiedostoId)) || (uuid && (liite.uuid === uuid)) ) {
            liite.salainen = e.target.checked;
            fields.liitteet[index] = liite;
            return true;
          } else return false;
        })
      }
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

    const LiiteList = () => {
      let obj = undefined;
      if (koodiarvo) {
        const i = getIndex(muutokset, koodiarvo);
        obj = fields.get(i);
      }
      else 
        obj = fields;
      if (obj && obj.liitteet)
        return  obj.liitteet.map( liite => {
          if (!liite.removed) {
            return (
              <div key={ liite.tiedostoId ? liite.tiedostoId : liite.uuid }>
                {/* Liite tallentamaton: nimeäminen mahdollista (tiedostoId olemassa), vai liite tallennettu */}
                {liite.tiedostoId ?
                  <LiiteListItem>
                    <FaFile />
                    <input onBlur={(e) => setAttachmentName(e, liite.tiedostoId, liite.uuid)} defaultValue={liite.nimi} />
                    <span className="size">{ bytesToSize(liite.koko) }</span>
                    <Checkbox title="Salainen">
                      <input
                        type="checkbox"
                        checked={liite.salainen}
                        onChange={e => setAttachmentVisibility(e,liite.tiedostoId,liite.uuid)}
                        id={ liite.tiedostoId ? "c"+liite.tiedostoId : "c"+liite.uuid }
                      />
                      <label htmlFor={liite.tiedostoId ? "c"+liite.tiedostoId : "c"+liite.uuid }>
                        { liite.salainen && <FaLock/> }
                      </label>
                    </Checkbox>
                    <button title={HAKEMUS_OTSIKOT.POISTA_LIITE.FI} onClick={(e) => removeAttachment(e,liite.tiedostoId,liite.uuid)}><FaTimes /></button>
                  </LiiteListItem>
                :
                  <LiiteListItem>     
                    <FaRegFile />
                    <span className="name">{liite.nimi}</span>
                    <span className="size">{ bytesToSize(liite.koko) }</span>
                    <Secret title="Salainen">{ liite.salainen && <FaLock/> }</Secret>
                    <button title={HAKEMUS_OTSIKOT.POISTA_LIITE.FI} onClick={(e) => removeAttachment(e,liite.tiedostoId,liite.uuid)}><FaTimes /></button>
                  </LiiteListItem>
                }
              </div> 
            )
          } else return false;
        } 
      )
     else
      return null;
    }

    return (
      <div>
        { !this.props.listHidden && 
          <h4>{this.props.header ? this.props.header: HAKEMUS_OTSIKOT.LIITE_HEADER.FI }</h4>
        }
        { this.props.listHidden && <br /> }
        { !this.props.showListOnly && 
          <Liite setAttachment={setAttachment} setAttachmentName={setAttachmentName} /> 
        }
        { this.state.fileError && 
          <Error>{HAKEMUS_VIRHE.LIITE.FI}</Error> 
        }
        { this.state.fileAdded !=="" && 
          <Message>{HAKEMUS_VIESTI.LIITE_LISATTY.FI}: {this.state.fileAdded}</Message> 
        }
        { !this.props.listHidden &&
           < LiiteList /> 
        }
      </div>
    )

  }
}

export default Liiteet