// ** React Imports
import { useState, useEffect, ChangeEvent } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import verificarRol from '../../verification/verificarrol'
import { Alert, AlertTitle, Button, CardContent, FormControl, Grid, IconButton, TextField } from '@mui/material'
import Close from 'mdi-material-ui/Close'
import axios from 'axios'
import themeConfig from 'src/configs/themeConfig'
import Select from 'react-select'

interface Datos {
  id_rol: string
  users: string
  estado: string
  password: string
}

const ActualizarServicio = () => {
  const router = useRouter()
  verificarRol()

  //opciones globales
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [mensaje, setMensaje] = useState('Dato Guardado')
  const [respuesta, setRequest] = useState<Datos>({
    id_rol: '',
    users: '',
    estado: '',
    password: ''
  })

  const handleChange = (prop: keyof Datos) => (event: ChangeEvent<HTMLInputElement>) => {
    setRequest({ ...respuesta, [prop]: event.target.value })
  }

  //traemos los datos para actualizar
  const { id } = router.query
  const resultados = async (id: any) => {
    let miToken
    try {
      miToken = localStorage.getItem('token') || ''
    } catch (error) {}

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: themeConfig.serverApi + '/api/usuarioadmin/' + id,
      headers: {
        Authorization: 'Bearer ' + miToken
      }
    }
    axios
      .request(config)
      .then((response: any) => {
        const respu = response.data
        setRequest(respu)

        //console.log(respu)

        return respu
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
  useEffect(() => {
    resultados(id)
  }, [id])
  useEffect(() => {
    setRequest(respuesta)
  }, [respuesta])

  //guardamos los datos
  const guardarDatos = async (e: MouseEvent) => {
    e.preventDefault()
    let miToken = ''
    try {
      miToken = localStorage.getItem('token') || ''
    } catch (error) {}
    const { data } = await axios.post(
      themeConfig.serverApi + '/api/actualizarusuario/' + id,
      { id_rol: respuesta.id_rol, users: respuesta.users, estado: respuesta.estado, password: respuesta.password },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + miToken
        }
      }
    )

    console.log(data)
    if (data.message === 'ok') {
      setOpenAlert(!openAlert)
      setMensaje('Dato Guardado')
      router.push('/usuario/ver?id=' + id)
    } else {
      setOpenAlert(!openAlert)
      setMensaje('Dato no pudo guardarse')
    }
  }
  const optionroles = Object.values([
    { value: '1', label: 'Admin' },
    { value: '2', label: 'Supervisor' },
    { value: '3', label: 'Técnico' }
  ])

  return (
    <Box>
      <Card>
        <CardContent>
          <Grid container spacing={7}>
            <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
              <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <FormControl fullWidth>
                    <Select options={optionroles} onChange={e => setRequest({ ...respuesta, ['id_rol']: e?.value })} />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <TextField
                    fullWidth
                    type='hidden'
                    id='id_rol'
                    name='id_rol'
                    placeholder='Id Rol'
                    value={respuesta.id_rol}
                    onChange={handleChange('id_rol')}
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <TextField
                    fullWidth
                    type='text'
                    id='estado'
                    name='estado'
                    label='Estado'
                    placeholder='Estado 1 2 3'
                    value={respuesta.estado}
                    onChange={handleChange('estado')}
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <TextField
                    fullWidth
                    type='text'
                    id='users'
                    name='users'
                    label='Usuario'
                    placeholder='Usuario'
                    value={respuesta.users}
                    onChange={handleChange('users')}
                  />
                </Grid>
                {/* <Divider /> */}
                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <TextField
                    fullWidth
                    type='password'
                    id='password'
                    name='password'
                    label='Password'
                    placeholder='indica tu password'
                    value={respuesta.password}
                    onChange={handleChange('password')}
                  />
                </Grid>
                {openAlert ? (
                  <Grid item xs={12} sx={{ mb: 3 }}>
                    <Alert
                      severity='warning'
                      sx={{ '& a': { fontWeight: 400 } }}
                      action={
                        <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                          <Close fontSize='inherit' />
                        </IconButton>
                      }
                    >
                      <AlertTitle>{mensaje}</AlertTitle>
                    </Alert>
                  </Grid>
                ) : null}
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    size='large'
                    variant='contained'
                    sx={{ marginBottom: 7 }}
                    onClick={(e: any) => guardarDatos(e)}
                  >
                    Guardar datos
                  </Button>
                  <Button type='reset' variant='outlined' color='secondary'>
                    Limpiar
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

module.exports = ActualizarServicio
