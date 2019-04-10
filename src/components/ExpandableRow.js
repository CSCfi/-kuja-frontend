import React, { Component } from "react"
import { Arrow, Heading, Span, SpanMuutos } from 'utils/UIComponents'
import { COLORS } from "modules/styles"
import arrow from 'static/images/koulutusala-arrow.svg'
import PropTypes from 'prop-types'
import ExpandableRowContent from 'components/ExpandableRowContent'

class ExpandableRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shouldBeExpanded: props.shouldBeExpanded
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle = () => {
        this.setState({
            shouldBeExpanded: !this.state.shouldBeExpanded
        })
    }

    render() {
        const muutokset = [1, 2]
        return (
            <div>
                <Heading onClick={ this.toggle }>
                    <Arrow src={ arrow } alt={ this.state.shouldBeExpanded ? 'Kutista rivi' : 'Laajenna rivi' } rotated={this.state.shouldBeExpanded} />
                    <Span>{ this.props.number }</Span>
                    <Span>{ this.props.title }</Span>
                    {muutokset.length > 0 &&
                        <SpanMuutos>
                            Muutokset:&nbsp;
                            <Span color={COLORS.OIVA_PURPLE}>
                                {muutokset.length}
                            </Span>
                            <Span>Poista muutokset</Span>
                        </SpanMuutos>
                    }
                </Heading>
                {
                    this.state.shouldBeExpanded &&
                    <ExpandableRowContent
                        code={ this.props.code }
                        articles={ this.props.articles }
                        content={ this.props.content }
                        areaCode={ this.props.areaCode }
                    >
                    </ExpandableRowContent>
                }
            </div>
        )
    }
}

ExpandableRow.propTypes = {
    shouldBeExpanded: PropTypes.bool,
    title: PropTypes.string,
    number: PropTypes.number,
    content: PropTypes.object,
    articles: PropTypes.array,
    code: PropTypes.number,
    areaCode: PropTypes.string
}

export default ExpandableRow