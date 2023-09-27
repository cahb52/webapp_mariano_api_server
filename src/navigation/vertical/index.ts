// ** Icon imports
import Login from 'mdi-material-ui/Login'

// import CubeOutline from 'mdi-material-ui/CubeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'

// import Table from 'mdi-material-ui/Table'

import HomeOutline from 'mdi-material-ui/HomeOutline'

// import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'

// import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
// import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { CarPickup, FaceManProfile, RoomServiceOutline, ToolboxOutline } from 'mdi-material-ui'
import verificarRol from '../../verification/verificarrol'

const navigation = (): VerticalNavItemsType => {
  verificarRol()

  return [
    {
      title: 'Página principal',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Ingreso',
      icon: Login,
      path: '/pages/login',
      openInNewTab: false
    },
    {
      sectionTitle: 'Acciones'
    },
    {
      title: 'Servicios',
      icon: RoomServiceOutline,
      path: '/servicios'
    },

    {
      title: 'Clientes',
      icon: AccountCogOutline,
      path: '/clientes',
      openInNewTab: false
    },
    {
      title: 'Perfiles',
      icon: ToolboxOutline,
      path: '/perfiles',
      openInNewTab: false
    },
    {
      title: 'Visitas',
      icon: CarPickup,
      path: '/visitas',
      openInNewTab: false
    },
    {
      title: 'Usuarios',
      icon: FaceManProfile,
      path: '/usuario',
      openInNewTab: false
    },
    {
      sectionTitle: 'Técnicos'
    } //,
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
