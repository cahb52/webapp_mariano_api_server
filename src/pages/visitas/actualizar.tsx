// ** React Imports
import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

// ** Third Party Styles Imports

import {
  Alert,
  AlertTitle,
  Button,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Typography,
  InputLabel
} from '@mui/material'
import Close from 'mdi-material-ui/Close'
import axios from 'axios'
import themeConfig from 'src/configs/themeConfig'
import 'react-datepicker/dist/react-datepicker.css'

interface DatosConsulta {
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

interface ServiciosD {
  id_servicio: string
  tipo_servicio: string
}

interface DatosClientes {
  id_cliente: string
  primer_apellido: string
  segundo_apellido: string
  primer_nombre: string
  segundo_nombre: string
}

interface Datos {
  id_visita: string
  id_cliente: string
  id_servicio: string
  id_personal: string
  fecha: string
  hora_visita: string
  estado: string
  observaciones: string
}

interface DatosPersonal {
  id_personal: string
  primer_apellido: string
  segundo_apellido: string
  primer_nombre: string
  segundo_nombre: string
}
const CrearVisita = () => {
  const router = useRouter()

  //creamos todos los estados para verificar que las respuestas de datos de los menus selectivos sean cargados
  const [statusPersonal, setStatusPersonal] = useState(false)
  const [statusClientel, setStatusCliente] = useState(false)
  const [statusServicio, setStatusServicio] = useState(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [error, setError] = useState(false)
  const [state, setState] = useState('')

  //mostramos el mensaje para cuando se crea un registro
  const [mensaje, setMensaje] = useState('Dato Guardado')

  //creamos los states vacios para esperar las respuestas de los selectivos
  const [datosPersonal, setDatosPersonal] = useState<DatosPersonal>({
    id_personal: '',
    primer_apellido: '',
    segundo_apellido: '',
    primer_nombre: '',
    segundo_nombre: ''
  })

  const [respuesta, setRequest] = useState<Datos>({
    id_visita: '',
    id_cliente: '',
    id_servicio: '',
    id_personal: '',
    fecha: '',
    hora_visita: '',
    estado: '',
    observaciones: ''
  })

  const [respuestaServicios, setRespuestaServicios] = useState<ServiciosD>({
    id_servicio: '',
    tipo_servicio: ''
  })

  const [respuestaCliente, setRespuestaCliente] = useState<DatosClientes>({
    id_cliente: '',
    primer_apellido: '',
    segundo_apellido: '',
    primer_nombre: '',
    segundo_nombre: ''
  })

  //cargamos los datos a los respectivos objetos
  const { id } = router.query
  useEffect(() => {
    let miToken
    try {
      miToken = localStorage.getItem('token') || ''
    } catch (error) {}

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: themeConfig.serverApi + '/api/servicios/listar',
      headers: {
        Authorization: 'Bearer ' + miToken
      }
    }
    axios
      .request(config)
      .then((response: any) => {
        setRespuestaServicios(response.data)
        setStatusServicio(true)

        //console.log(respuesta);
      })
      .catch((error: any) => {
        console.log(error)
      })

    //cargando cliente
    const configCliente = {
      method: 'get',
      maxBodyLength: Infinity,
      url: themeConfig.serverApi + '/api/clientes/listar',
      headers: {
        Authorization: 'Bearer ' + miToken
      }
    }
    axios
      .request(configCliente)
      .then((response: any) => {
        setRespuestaCliente(response.data)
        setStatusCliente(true)
      })
      .catch((error: any) => {
        console.log(error)
      })

    //viendo lo de personal
    const configPersonal = {
      method: 'get',
      maxBodyLength: Infinity,
      url: themeConfig.serverApi + '/api/personal/listar',
      headers: {
        Authorization: 'Bearer ' + miToken
      }
    }
    axios
      .request(configPersonal)
      .then((response: any) => {
        setDatosPersonal(response.data)
        setStatusPersonal(true)
      })
      .catch((error: any) => {
        console.log(error)
      })

    //cargando datos iniciales
    const configConsulta = {
      method: 'get',
      maxBodyLength: Infinity,
      url: themeConfig.serverApi + '/api/visitas/ver/' + id,
      headers: {
        Authorization: 'Bearer ' + miToken
      }
    }
    axios
      .request(configConsulta)
      .then((response: any) => {
        setRequest(response.data)
        setState('success')
      })
      .catch((error: any) => {
        console.log(error)
        setState('error')
        setError(error)
      })
  }, [id])
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
  const handleChange = (prop: keyof Datos) => (event: ChangeEvent<HTMLInputElement>) => {
    setRequest({ ...respuesta, [prop]: event.target.value })
  }

  const guardarDatos = async (e: MouseEvent) => {
    e.preventDefault()
    let miToken = ''
    try {
      miToken = localStorage.getItem('token') || ''
    } catch (error) {}
    await axios
      .post(
        themeConfig.serverApi + '/api/visitas/actualizar/' + id,
        {
          id_cliente: respuesta.id_cliente,
          id_servicio: respuesta.id_servicio,
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
      .then(data => {
        setOpenAlert(!openAlert)
        setMensaje('Dato Guardado')

        router.push('/visitas/ver?id=' + respuesta.id_visita)
        console.log(data.data.id_visita)
      })
      .catch(error => {
        console.log(error)
        setOpenAlert(!openAlert)
        setMensaje('Dato no pudo guardarse')
      })
  }

  const estados = [
    { id: 1, descripcion: 'Abierta' },
    { id: 2, descripcion: 'Cerrada' },
    { id: 3, descripcion: 'Pendiente' },
    { id: 4, descripcion: 'En Espera' }
  ]
  if (statusPersonal && statusClientel && statusServicio) {
    const listaClientes = Object.values(respuestaCliente)
    const listaServicios = Object.values(respuestaServicios)
    const listaPersonal = Object.values(datosPersonal)

    return (
      <Card>
        <CardContent>
          <Grid container spacing={7}>
            <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
              <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <Typography sx={{ mr: 2 }}>Cliente</Typography>
                  <Select
                    id='id_cliente'
                    label='id_cliente'
                    value={respuesta.id_cliente}
                    onChange={e => setRequest({ ...respuesta, ['id_cliente']: e.target.value || '' })}
                  >
                    {listaClientes?.map((row, id) => (
                      <MenuItem key={id} value={row.id_cliente}>
                        {row.primer_nombre +
                          ' ' +
                          row.segundo_nombre +
                          ' ' +
                          row.primer_apellido +
                          ' ' +
                          row.segundo_apellido}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <Typography sx={{ mr: 2 }}>Tipo de servicio</Typography>
                  <Select
                    id='id_servicio'
                    label='id_servicio'
                    value={respuesta.id_servicio}
                    onChange={e => setRequest({ ...respuesta, ['id_servicio']: e.target.value || '' })}
                  >
                    {listaServicios?.map((row, id) => (
                      <MenuItem key={id} value={row.id_servicio}>
                        {row.tipo_servicio}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <Typography sx={{ mr: 2 }}>Personal encargado</Typography>
                  <Select
                    id='id_personal'
                    label='id_personal'
                    value={respuesta.id_personal}
                    onChange={e => setRequest({ ...respuesta, ['id_personal']: e.target.value || '' })}
                  >
                    {listaPersonal?.map((row, id) => (
                      <MenuItem key={id} value={row.id_personal}>
                        {row.primer_nombre +
                          ' ' +
                          row.segundo_nombre +
                          ' ' +
                          row.primer_apellido +
                          ' ' +
                          row.segundo_apellido}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <InputLabel>Fecha</InputLabel>
                  <TextField
                    fullWidth
                    type='date'
                    id='fecha'
                    name='fecha'
                    value={respuesta.fecha}
                    onChange={handleChange('fecha')}
                  />
                  {console.log(respuesta.fecha)}
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <Typography sx={{ mr: 2 }}>Hora</Typography>
                  <TextField
                    fullWidth
                    type='time'
                    id='hora_visita'
                    name='hora_visita'
                    value={respuesta.hora_visita}
                    onChange={handleChange('hora_visita')}
                  />
                </Grid>

                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <Typography sx={{ mr: 2 }}>Estado</Typography>
                  <Select
                    id='id'
                    label='estado'
                    value={respuesta.estado}
                    onChange={e => setRequest({ ...respuesta, ['estado']: e.target.value || '' })}
                  >
                    {console.log(respuesta)}
                    {estados.map((row, id) => (
                      <MenuItem key={id} value={row.id}>
                        {row.descripcion}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={12} sx={{ marginBottom: 4.8 }}>
                  <Typography sx={{ mr: 2 }}>Observaciones</Typography>
                  <TextField
                    fullWidth
                    type='text'
                    id='observaciones'
                    name='observaciones'
                    value={respuesta.observaciones}
                    onChange={handleChange('observaciones')}
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
    )
  }

  return <h1>Cargando...</h1>
}

module.exports = CrearVisita
