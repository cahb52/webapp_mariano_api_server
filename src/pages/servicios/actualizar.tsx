// ** React Imports
import { useState, useEffect, ChangeEvent } from 'react'
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
  id_servicio: string
  tipo_servicio: string
  descripcion: string
}

const ActualizarServicio = () => {
  const router = useRouter()
  verificarRol()

  //opciones globales
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [mensaje, setMensaje] = useState('Dato Guardado')
  const [respuesta, setRespuesta] = useState<Datos>({
    id_servicio: '',
    tipo_servicio: '',
    descripcion: ''
  })

  const handleChange = (prop: keyof Datos) => (event: ChangeEvent<HTMLInputElement>) => {
    setRespuesta({ ...respuesta, [prop]: event.target.value })
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
      url: themeConfig.serverApi + '/api/servicios/ver/' + id,
      headers: {
        Authorization: 'Bearer ' + miToken
      }
    }
    axios
      .request(config)
      .then((response: any) => {
        const respu = response.data
        setRespuesta(respu)

        //console.log(respuesta);
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
    setRespuesta(respuesta)
  }, [respuesta])

  //traemos los datos para actualizar

  //console.log(valores[0]+ valores[1]);

  //guardamos los datos
  const guardarDatos = async (e: MouseEvent) => {
    e.preventDefault()
    let miToken = ''
    try {
      miToken = localStorage.getItem('token') || ''
    } catch (error) {}
    const { data } = await axios.post(
      themeConfig.serverApi + '/api/servicios/actualizar/' + respuesta.id_servicio,
      { tipo_servicio: respuesta.tipo_servicio, descripcion: respuesta.descripcion },
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
      router.push('/servicios/ver?id=' + respuesta.id_servicio)
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
                    id='tipo_servicio'
                    name='tipo_servicio'
                    label='Tipo de Servicio'
                    placeholder='Tipo de servicio'
                    value={respuesta.tipo_servicio}
                    onChange={handleChange('tipo_servicio')}
                  />
                </Grid>
                {/* <Divider /> */}
                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <TextField
                    fullWidth
                    type='text'
                    id='descripcion'
                    name='descripcion'
                    label='Descripción'
                    placeholder='indica la descripción del servicio'
                    value={respuesta.descripcion}
                    onChange={handleChange('descripcion')}
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
