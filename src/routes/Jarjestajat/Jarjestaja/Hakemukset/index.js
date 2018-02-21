import HakemuksetJaPaatoksetContainer from './containers/HakemuksetJaPaatokset'
import Hakemus from './components/Hakemus'

const routes = [
  {
    path: '/jarjestajat/:ytunnus/hakemukset-ja-paatokset/',
    component: HakemuksetJaPaatoksetContainer,
    exact: true
  },
  {
    path: '/jarjestajat/:ytunnus/hakemukset-ja-paatokset/:diaarinumero',
    component: Hakemus
  }
]

export default routes
