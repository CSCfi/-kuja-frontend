import ValmisteluContainer from './containers/ValmisteluContainer'

const routes = [

    {
        path: '/asiat/valmistelu/:uuid',
        exact: true,
        component: ValmisteluContainer
    }
]
export default routes
