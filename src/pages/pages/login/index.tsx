// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'

// ** Next Imports
//import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'

import axios from 'axios'

import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

//import { redirect } from 'next/dist/server/api-utils'

interface State {
  password: string
  showPassword: boolean
  username: string
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
    username: ''
  })

  // ** Hook
  const router = useRouter()

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const getLogin = async (event: MouseEvent) => {
    event.preventDefault()
    const { data, status } = await axios.post(
      themeConfig.serverApi + '/api/login',
      { username: values.username, password: values.password },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
    if (status === 200) {
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('rol', data.rol)

        //console.log(data.token);
        router.push('/')
      } else {
        console.log('existe un error ')
      }
    }
  }
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token !== null) {
      return <>Ya esta logueado, por favor cierre la sesión e ingrese de nuevo</>
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Bienvenido al sistema {themeConfig.templateName}! 👋🏻
            </Typography>
            <Typography variant='body2'>Por favor ingrese con su cuenta para poder manipular el sistema</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              autoFocus
              fullWidth
              id='username'
              label='username'
              sx={{ marginBottom: 4 }}
              onChange={handleChange('username')}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='password'>Contrase&ntilde;a</InputLabel>
              <OutlinedInput
                label='password'
                value={values.password}
                id='password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            ></Box>
            <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }} onClick={e => getLogin(e)}>
              Ingresar
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
