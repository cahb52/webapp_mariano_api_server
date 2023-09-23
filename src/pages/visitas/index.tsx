// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import {
  CardContent,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Link,
  Grid
} from '@mui/material'
import axios from 'axios'
import { Delete, Update } from 'mdi-material-ui'

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
const ServiciosSettings = () => {
  const [error, setError] = useState(false)
  const [state, setState] = useState('')
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

  const acceso = [{ rol: 'admin' }, { rol: 'supervisor' }]

  useEffect(() => {
    setState('loading')
    let miToken
    try {
      miToken = localStorage.getItem('token') || ''
    } catch (error) {}

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: themeConfig.serverApi + '/api/visitas/listar',
      headers: {
        Authorization: 'Bearer ' + miToken
      }
    }
    axios
      .request(config)
      .then((response: any) => {
        setRespuesta(response.data)
        setState('success')
      })
      .catch((error: any) => {
        console.log(error)
        setState('error')
        setError(error)
      })
  }, [])
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

  let rows

  try {
    rows = Object.values(respuesta)
  } catch (error) {
    console.log('aún no hay objetos')
  }

  if (state === 'error') {
    return <h1>{error.toString()}</h1>
  } else if (state === 'loading') {
    return <h1>Cargando...</h1>
  } else if (state === 'success') {
    return (
      <Card>
        <CardContent>
          <Link href='/visitas/crear' variant='button'>
            + Crear Visita
          </Link>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align='right'>Cliente</TableCell>
                  <TableCell align='right'>Servicio</TableCell>
                  <TableCell align='right'>Personal</TableCell>
                  <TableCell align='right'>Fecha</TableCell>
                  <TableCell align='right'>Hora</TableCell>
                  <TableCell align='right'>Dirección</TableCell>
                  <TableCell align='right'>Estado</TableCell>
                  <TableCell align='right'>Observaciones</TableCell>
                  <TableCell align='right'>Longitud</TableCell>
                  <TableCell align='right'>Latitud</TableCell>
                  <TableCell align='right'>Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row, index) => (
                  <TableRow key={index} sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }}>
                    <TableCell component='th' scope='row'>
                      <Link href={'/perfiles/ver?id=' + row.id_personal} underline='none'>
                        {row.id_personal}
                      </Link>
                    </TableCell>
                    <TableCell align='right'>
                      {row.cliente.primer_apellido +
                        ' ' +
                        row.cliente.segundo_apellido +
                        ' ' +
                        row.cliente.primer_nombre +
                        ' ' +
                        row.cliente.segundo_nombre}
                    </TableCell>
                    <TableCell align='right'>{row.servicio.tipo_servicio}</TableCell>
                    <TableCell align='right'>
                      {row.personal.primer_apellido +
                        ' ' +
                        row.personal.segundo_apellido +
                        ' ' +
                        row.personal.primer_nombre +
                        ' ' +
                        row.personal.segundo_nombre}
                    </TableCell>
                    <TableCell align='right'>{row.fecha}</TableCell>
                    <TableCell align='right'>{row.hora_visita}</TableCell>
                    <TableCell align='right'>{row.cliente.direccion}</TableCell>
                    <TableCell align='right'>{row.estado}</TableCell>
                    <TableCell align='right'>{row.observaciones}</TableCell>
                    <TableCell align='right'>{row.cliente.longitud}</TableCell>
                    <TableCell align='right'>{row.cliente.latitud}</TableCell>

                    <TableCell align='right'>
                      <Grid item xs={4}>
                        <Link href={'/visitas/borrar?id=' + row.id_visita} underline='none'>
                          <Delete />
                        </Link>
                      </Grid>
                      <Grid item xs={4}>
                        <Link href={'/visitas/actualizar?id=' + row.id_visita} underline='none'>
                          <Update />
                        </Link>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    )
  }

  return <h1>Mensaje</h1>
}

export default ServiciosSettings
