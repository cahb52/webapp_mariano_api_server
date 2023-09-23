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
  id_visita: string
  id_cliente: string
  id_servicio: string
  id_personal: string
  fecha: string
  hora_visita: string
  estado: string
  observaciones: string
  personal: {
    primer_apellido: string
    segundo_apellido: string
    primer_nombre: string
    segundo_nombre: string
  }
  cliente: {
    primer_apellido: string
    segundo_apellido: string
    primer_nombre: string
    segundo_nombre: string
  }
  servicio: {
    tipo_servicio: string
    descripcion: string
  }
}
const ActualizarServicio = () => {
  const acceso = [{ rol: 'admin' }, { rol: 'supervisor' }]
  const router = useRouter()
  if (typeof window !== 'undefined') {
    const role = localStorage.getItem('rol')
    const isFound = acceso.some(element => {
      if (element.rol === role) {
        return true
      }

      return false
    })
    if (!isFound) {
      return <>No autorizado</>
    }
  }

  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [mensaje, setMensaje] = useState('Dato Guardado')
  const [respuesta, setRespuesta] = useState<Datos>({
    id_visita: '',
    id_cliente: '',
    id_servicio: '',
    id_personal: '',
    fecha: '',
    hora_visita: '',
    estado: '',
    observaciones: '',
    personal: {
      primer_apellido: '',
      segundo_apellido: '',
      primer_nombre: '',
      segundo_nombre: ''
    },
    servicio: {
      tipo_servicio: '',
      descripcion: ''
    },
    cliente: {
      primer_apellido: '',
      segundo_apellido: '',
      primer_nombre: '',
      segundo_nombre: ''
    }
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
        id_cliente: respuesta.id_cliente,
        id_personal: respuesta.id_personal,
        fecha: respuesta.fecha,
        hora_visita: respuesta.hora_visita,
        estado: respuesta.estado,
        observaciones: respuesta.observaciones
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
