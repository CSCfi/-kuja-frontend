import React, { Component } from "react"
import PropTypes from 'prop-types'
import Checkbox from 'components/Checkbox'
import _ from 'lodash'
import { Container05, Container1 } from 'utils/UIComponents'
import { parseLocalizedField } from "modules/helpers"
import { MUUTOS_TYPES } from "locales/uusiHakemusFormConstants"

class ExpandableRowContent extends Component {
    constructor() {
        super()
    }
    
    handleCheckboxChange = () => {
        console.info('Taisit klikata valitalaatikkoa.', arguments)
    }

    render() {
        const { articles } = this.props
        
        const { editValues } = this.props
        let { fields } = this.props
        let muutokset = []
    
        if (editValues) {
          _.forEach(editValues, value => {
            _.forEach(this.props.content, koulutus => {
              if (koulutus.koodiArvo === value.koodiarvo) {
                muutokset.push(value)
              }
            })
          })
        }
    
        const current = _.find(articles, ala => { return ala.koodi === this.props.areaCode })
        let alat = undefined
        if (current) {
          alat = current.koulutusalat
        }
        return (
            <div>
                {
                    _.map(this.props.content, (item, i) => {
                        const koulutustyyppiSuomeksi = _.find(item.metadata, (m) => {return m.kieli === "FI" }) || ""
                        return (
                            <Container1 key={ i }>
                            <h4>{ koulutustyyppiSuomeksi.nimi }</h4>
                            {
                                _.map(item.koulutukset, (subItem, ii) => {
                                    const koodiarvo = subItem.koodiarvo || subItem.koodiArvo
                                    const identifier = `input-${koodiarvo}`
                                    const { nimi, metadata } = subItem
                        
                                    let nimiText = ""
                                    if (!nimi && metadata) {
                                    nimiText = parseLocalizedField(metadata)
                                    } else {
                                    nimiText = nimi
                                    }
                        
                                    let isInLupa = false
                                    let isAdded = false
                                    let isRemoved = false
                        
                                    // osaamisala addons
                                    let isOaInLupa = false
                                    let isOaAdded = false
                                    let isOaRemoved = false
                                    const osaamisala = subItem.osaamisala
                                    let identifierOa = ''
                                    if(osaamisala) {
                                        identifierOa = `input-${osaamisala.koodiArvo}`
                                    }

                                    if (alat) {
                                        _.forEach(alat, ({ koulutukset }) => {
                                            koulutukset.forEach(({ koodi }) => {
                                                if (koodi === koodiarvo) {
                                                    isInLupa = true
                                                }
                                
                                                if (editValues) {
                                                    editValues.forEach(val => {
                                                        if (val.koodiarvo === koodiarvo) {
                                                            isAdded = val.type === MUUTOS_TYPES.ADDITION ? true : null
                                                            isRemoved =val.type === MUUTOS_TYPES.REMOVAL ? true : null
                                                        }

                                                        if (osaamisala) {
                                                            if (val.koodiarvo === osaamisala.koodiArvo) {
                                                                isOaAdded = val.type === MUUTOS_TYPES.ADDITION ? true : null
                                                                isOaRemoved = val.type === MUUTOS_TYPES.REMOVAL ? true : null
                                                            }
                                                        }
                                                    })
                                                }
                                            })
                                        })
                                    } else {
                                        // Tarkastetaan myös tilanne, jossa koulutusalalla ei ollut yhtään tutkintoa luvassa, mutta alalle on lisätty tutkintoja
                                        if (editValues) {
                                            editValues.forEach(val => {
                                                if (val.koodiarvo === koodiarvo) {
                                                    isAdded = val.type === MUUTOS_TYPES.ADDITION ? true : null
                                                    isRemoved = val.type === MUUTOS_TYPES.REMOVAL ? true : null
                                                }

                                                if (osaamisala) {
                                                    if (val.koodiarvo === osaamisala.koodiArvo) {
                                                    isOaAdded = val.type === MUUTOS_TYPES.ADDITION ? true : null
                                                    isOaRemoved = val.type === MUUTOS_TYPES.REMOVAL ? true : null
                                                    }
                                                }
                                            })
                                        }
                                    }
                    
                                    let customClassName = ""
                                    customClassName = isInLupa ? "is-in-lupa" : null
                                    customClassName = isAdded ? "is-added" : null
                                    customClassName = isRemoved ? "is-removed" : null
                    
                                    let isChecked = false
                                    if ((isInLupa && !isRemoved) || isAdded) {
                                        isChecked = true
                                    }
                        
                                    let customClassNameForOa = ""
                                    isOaInLupa ? customClassNameForOa = "is-in-lupa" : null
                                    isOaAdded ? customClassNameForOa = "is-added" : null
                                    isOaRemoved ? customClassNameForOa = "is-removed" : null
                        
                                    let isOaChecked = false
                                    if ((isOaInLupa && !isOaRemoved) || isOaAdded) {
                                        isOaChecked = true
                                    }

                                    return (
                                        <Container05 key={ `sub-item-${ ii }`}>
                                            <label>
                                                <Checkbox
                                                    checked={ isChecked }
                                                    onChange={ this.handleCheckboxChange }
                                                />
                                                <span style={{ marginLeft: 8 }}>{ subItem.koodiArvo } { nimiText }</span>
                                            </label>
                                        </Container05>
                                    )
                                })
                            }
                            </Container1>
                        )
                    })
                }
            </div>
        )
    }
}

ExpandableRowContent.propTypes = {
    articles: PropTypes.array,
    content: PropTypes.object,
    code: PropTypes.string,
    areaCode: PropTypes.number
}

export default ExpandableRowContent