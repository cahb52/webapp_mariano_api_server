// ** React Imports
import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import verificarRol from '../../verification/verificarrol'
import { Alert, AlertTitle, Button, CardContent, Grid, IconButton, TextField } from '@mui/material'
import Close from 'mdi-material-ui/Close'
import axios from 'axios'
import themeConfig from 'src/configs/themeConfig'

interface Datos {
  id_personal: string
  primer_apellido: string
  segundo_apellido: string
  primer_nombre: string
  segundo_nombre: string
  cui: string
  fecha_nacimiento: string
  direccion: string
  telefono: string
  id_users: string
}

const ActualizarServicio = () => {
  const router = useRouter()
  verificarRol()

  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [mensaje, setMensaje] = useState('Dato Guardado')

  const [respuesta, setRequest] = useState<Datos>({
    id_personal: '',
    primer_apellido: '',
    segundo_apellido: '',
    primer_nombre: '',
    segundo_nombre: '',
    cui: '',
    fecha_nacimiento: '',
    direccion: '',
    telefono: '',
    id_users: ''
  })

  const handleChange = (prop: keyof Datos) => (event: ChangeEvent<HTMLInputElement>) => {
    setRequest({ ...respuesta, [prop]: event.target.value })
  }
  const guardarDatos = async (e: MouseEvent) => {
    e.preventDefault()
    let miToken = ''
    try {
      miToken = localStorage.getItem('token') || ''
    } catch (error) {}
    const { data } = await axios.post(
      themeConfig.serverApi + '/api/personal/crear',
      {
        id_personal: respuesta.id_personal,
        primer_apellido: respuesta.primer_apellido,
        segundo_apellido: respuesta.segundo_apellido,
        primer_nombre: respuesta.primer_nombre,
        segundo_nombre: respuesta.segundo_nombre,
        cui: respuesta.cui,
        fecha_nacimiento: respuesta.fecha_nacimiento,
        direccion: respuesta.direccion,
        telefono: respuesta.telefono,
        id_users: respuesta.id_users
      },
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
      router.push('/perfiles/ver?id=' + data.id_personal)
    } else {
      setOpenAlert(!openAlert)
      setMensaje('Dato no pudo guardarse')
    }
  }

  const { id } = router.query
  useEffect(() => {
    setRequest({ ...respuesta, ['id_users']: id })
  }, [id])

  return (
    <Box>
      <Card>
        <CardContent>
          <Grid container spacing={7}>
            <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
              <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                <TextField
                  fullWidth
                  type='hidden'
                  id='id_users'
                  name='id_users'
                  value={respuesta.id_users}
                  onChange={handleChange('id_users')}
                />
                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <TextField
                    fullWidth
                    type='text'
                    id='primer_apellido'
                    name='primer_apellido'
                    label='Primer Apellido'
                    placeholder='Primer Apellido'
                    value={respuesta.primer_apellido}
                    onChange={handleChange('primer_apellido')}
                  />
                </Grid>

                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <TextField
                    fullWidth
                    type='text'
                    id='segundo_apellido'
                    name='segundo_apellido'
                    label='Segundo Apellido'
                    placeholder='Segundo Apellido'
                    value={respuesta.segundo_apellido}
                    onChange={handleChange('segundo_apellido')}
                  />
                </Grid>

                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <TextField
                    fullWidth
                    type='text'
                    id='primer_nombre'
                    name='primer_nombre'
                    label='Primer Nombre'
                    placeholder='Primer Nombre'
                    value={respuesta.primer_nombre}
                    onChange={handleChange('primer_nombre')}
                  />
                </Grid>

                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <TextField
                    fullWidth
                    type='text'
                    id='segundo_nombre'
                    name='segundo_nombre'
                    label='Segundo Nombre'
                    placeholder='Segundo Nombre'
                    value={respuesta.segundo_nombre}
                    onChange={handleChange('segundo_nombre')}
                  />
                </Grid>

                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <TextField
                    fullWidth
                    type='text'
                    id='cui'
                    name='cui'
                    placeholder='CUI/DPI'
                    label='CUI/DPI'
                    value={respuesta.cui}
                    onChange={handleChange('cui')}
                  />
                </Grid>

                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <TextField
                    fullWidth
                    type='text'
                    id='fecha_nacimiento'
                    name='fecha_nacimiento'
                    placeholder='Fecha de Nacimiento'
                    label='Fecha de nacimiento'
                    value={respuesta.fecha_nacimiento}
                    onChange={handleChange('fecha_nacimiento')}
                  />
                </Grid>

                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <TextField
                    fullWidth
                    type='text'
                    id='direccion'
                    name='direccion'
                    placeholder='Dirección'
                    label='Dirección'
                    value={respuesta.direccion}
                    onChange={handleChange('direccion')}
                  />
                </Grid>

                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <TextField
                    fullWidth
                    type='text'
                    id='telefono'
                    name='telefono'
                    placeholder='telefono'
                    label='Teléfono'
                    value={respuesta.telefono}
                    onChange={handleChange('telefono')}
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
