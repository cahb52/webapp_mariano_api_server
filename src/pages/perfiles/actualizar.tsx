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

  //opciones globales
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
      url: themeConfig.serverApi + '/api/personal/ver/' + id,
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
      themeConfig.serverApi + '/api/personal/actualizar/' + id,
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
      router.push('/perfiles/ver?id=' + id)
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
                    label='CUI/DPI'
                    value={respuesta.cui}
                    onChange={handleChange('cui')}
                  />
                </Grid>

                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <TextField
                    fullWidth
                    type='date'
                    id='fecha_nacimiento'
                    name='fecha_nacimiento'
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
