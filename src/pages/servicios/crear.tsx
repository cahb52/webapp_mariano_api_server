// ** React Imports
import { useState } from 'react'
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

const ActualizarServicio = () => {
  const router = useRouter()
  verificarRol()

  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [tipoServicio, setTipoServicio] = useState('')
  const [descripcionS, setDescripcionS] = useState('')
  const [mensaje, setMensaje] = useState('Dato Guardado')
  const guardarDatos = async (e: MouseEvent) => {
    e.preventDefault()
    let miToken = ''
    try {
      miToken = localStorage.getItem('token') || ''
    } catch (error) {}
    const { data } = await axios.post(
      themeConfig.serverApi + '/api/servicios/crear',
      { tipo_servicio: tipoServicio, descripcion: descripcionS },
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
      router.push('/servicios/ver?id=' + data.id_servicio)
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
                    defaultValue='servicio'
                    onChange={e => setTipoServicio(e.target.value)}
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
                    defaultValue='descipcion'
                    onChange={e => setDescripcionS(e.target.value)}
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
