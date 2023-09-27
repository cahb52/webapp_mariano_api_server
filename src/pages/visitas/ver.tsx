'use client'

// ** React Imports
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import themeConfig from 'src/configs/themeConfig'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { TableContainer, TableHead, TableRow, TableCell, TableBody, Box, Link } from '@mui/material'
import axios from 'axios'

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
    direccion: string
    latitud: string
    longitud: string
  }
  servicio: {
    tipo_servicio: string
    descripcion: string
  }
}

const VerVisita = () => {
  const router = useRouter()
  const { id } = router.query
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const acceso = [{ rol: 'admin' }, { rol: 'supervisor' }]
  const [mirol, setMiRol] = useState('ningino')

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [estado, setEstado] = useState(false)
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
      segundo_nombre: '',
      direccion: '',
      longitud: '',
      latitud: ''
    }
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const role = localStorage.getItem('rol') || 'ninguno'
    setMiRol(role)
    let miToken
    try {
      miToken = localStorage.getItem('token') || ''
    } catch (error) {}

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: themeConfig.serverApi + '/api/visitas/ver/' + id,
      headers: {
        Authorization: 'Bearer ' + miToken
      }
    }
    axios
      .request(config)
      .then((response: any) => {
        if (response.data.message != 'error') {
          setRespuesta(response.data)
          setEstado(true)
          console.log(response)
        }

        // console.log('soy el rspu')
        // console.log(respu)
      })
      .catch((error: any) => {
        console.log(error)
        setEstado(false)
      })
  }, [id])

  if (typeof window !== null) {
    const isFound = acceso.some(element => {
      if (element.rol === mirol) {
        return true
      }

      return false
    })
    if (!isFound) {
      return <>No autorizado</>
    }
  }

  console.log(respuesta)
  if (estado || respuesta !== null) {
    return (
      <Box>
        <TableContainer>
          <TableContainer sx={{ minWidth: 650 }} aria-label='simple table'>
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
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  <Link href={'/visitas/ver?id=' + respuesta.id_visita} underline='none'>
                    {respuesta.id_visita}
                  </Link>
                </TableCell>
                <TableCell align='right'>
                  {respuesta.cliente.primer_apellido +
                    ' ' +
                    respuesta.cliente.segundo_apellido +
                    ' ' +
                    respuesta.cliente.primer_nombre +
                    ' ' +
                    respuesta.cliente.segundo_nombre}
                </TableCell>
                <TableCell align='right'>{respuesta.servicio.tipo_servicio}</TableCell>
                <TableCell align='right'>
                  {respuesta.personal.primer_apellido +
                    ' ' +
                    respuesta.personal.segundo_apellido +
                    ' ' +
                    respuesta.personal.primer_nombre +
                    ' ' +
                    respuesta.personal.segundo_nombre}
                </TableCell>
                <TableCell align='right'>{respuesta.fecha}</TableCell>
                <TableCell align='right'>{respuesta.hora_visita}</TableCell>
                <TableCell align='right'>{respuesta.cliente.direccion}</TableCell>
                <TableCell align='right'>{respuesta.estado}</TableCell>
                <TableCell align='right'>{respuesta.observaciones}</TableCell>
                <TableCell align='right'>{respuesta.cliente.longitud}</TableCell>
                <TableCell align='right'>{respuesta.cliente.latitud}</TableCell>
              </TableRow>
            </TableBody>
          </TableContainer>
        </TableContainer>
      </Box>
    )
  }

  return <h1>Cargando...</h1>
}

export default VerVisita
