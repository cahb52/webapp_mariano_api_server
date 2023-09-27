// ** React Imports
import { useState, useEffect, ChangeEvent } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import { Alert, AlertTitle, Button, CardContent, Grid, IconButton, TextField } from '@mui/material'
import Close from 'mdi-material-ui/Close'
import axios from 'axios'
import themeConfig from 'src/configs/themeConfig'

interface Datos {
  id_cliente: string
  primer_apellido: string
  segundo_apellido: string
  primer_nombre: string
  segundo_nombre: string
  entidad: string
  direccion: string
  telefono: string
  nit: string
  correo: string
  latitud: string
  longitud: string
}

const ActualizarServicio = () => {
  //opciones globales
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [mensaje, setMensaje] = useState('Dato Guardado')
  const [respuesta, setRequest] = useState<Datos>({
    id_cliente: '',
    primer_apellido: '',
    segundo_apellido: '',
    primer_nombre: '',
    segundo_nombre: '',
    entidad: '',
    direccion: '',
    telefono: '',
    nit: '',
    correo: '',
    latitud: '',
    longitud: ''
  })

  //determinamos los permisos de acceso

  const router = useRouter()

  //terminamos de definir los permisos de acceso

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
      url: themeConfig.serverApi + '/api/clientes/ver/' + id,
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

  const acceso = [{ rol: 'admin' }, { rol: 'supervisor' }]
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

  //guardamos los datos
  const guardarDatos = async (e: MouseEvent) => {
    e.preventDefault()
    let miToken = ''
    try {
      miToken = localStorage.getItem('token') || ''
    } catch (error) {}
    const { data } = await axios.post(
      themeConfig.serverApi + '/api/clientes/actualizar/' + id,
      {
        id_cliente: respuesta.id_cliente,
        primer_apellido: respuesta.primer_apellido,
        segundo_apellido: respuesta.segundo_apellido,
        primer_nombre: respuesta.primer_nombre,
        segundo_nombre: respuesta.segundo_nombre,
        entidad: respuesta.entidad,
        direccion: respuesta.direccion,
        telefono: respuesta.telefono,
        nit: respuesta.nit,
        correo: respuesta.correo,
        latitud: respuesta.latitud,
        longitud: respuesta.longitud
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
      router.push('/clientes/ver?id=' + id)
    } else {
      setOpenAlert(!openAlert)
      setMensaje('Dato no pudo guardarse')
    }
  }

  return (
    <Box>
      <Card>
        <CardContent>
          <Grid container spacing={7}>
            <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
              <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
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
                    id='entidad'
                    name='entidad'
                    placeholder='Entidad'
                    label='entidad'
                    value={respuesta.entidad}
                    onChange={handleChange('entidad')}
                  />
                </Grid>

                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <TextField
                    fullWidth
                    type='text'
                    id='direccion'
                    name='direccion'
                    placeholder='Direcccion'
                    label='direccion'
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
                    placeholder='Telefono'
                    label='telefono'
                    value={respuesta.telefono}
                    onChange={handleChange('telefono')}
                  />
                </Grid>

                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <TextField
                    fullWidth
                    type='text'
                    id='nit'
                    name='nit'
                    placeholder='nit'
                    label='nit'
                    value={respuesta.nit}
                    onChange={handleChange('nit')}
                  />
                </Grid>

                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <TextField
                    fullWidth
                    type='email'
                    id='correo'
                    name='correo'
                    placeholder='Correo'
                    label='correo'
                    value={respuesta.correo}
                    onChange={handleChange('correo')}
                  />
                </Grid>

                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <TextField
                    fullWidth
                    type='text'
                    id='latitud'
                    name='latitud'
                    placeholder='Latitud'
                    label='latitud'
                    value={respuesta.latitud}
                    onChange={handleChange('latitud')}
                  />
                </Grid>

                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <TextField
                    fullWidth
                    type='text'
                    id='longitud'
                    name='longitud'
                    placeholder='Longitud'
                    label='Longitud'
                    value={respuesta.longitud}
                    onChange={handleChange('longitud')}
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
