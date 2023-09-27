'use client'

// ** React Imports
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import themeConfig from 'src/configs/themeConfig'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material'
import axios from 'axios'

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
const VerCliente = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  //determinamos los permisos de acceso
  const acceso = [{ rol: 'admin' }, { rol: 'supervisor' }, { rol: 'tecnico' }]
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
      router.push('/pages/login')
    }
  }

  //terminamos de definir los permisos de acceso

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [respuesta, setRespuesta] = useState<Datos>({
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
        setRespuesta(respu)

        // console.log('soy el rspu')
        // console.log(respu)

        return respu
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  useEffect(() => {
    resultados(id)
  }, [id])

  // console.log(respuesta)
  // const resp = Object.entries(respuesta)
  // console.log(resp)

  //console.log('soy el rol ')
  //console.log(respuesta)

  return (
    <Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align='right'>Primer Apellido</TableCell>
              <TableCell align='right'>Segundo Apellido</TableCell>
              <TableCell align='right'>Primer Nombre</TableCell>
              <TableCell align='right'>Segundo Nombre</TableCell>
              <TableCell align='right'>Entidad</TableCell>
              <TableCell align='right'>Dirección</TableCell>
              <TableCell align='right'>Teléfono</TableCell>
              <TableCell align='right'>Nit</TableCell>
              <TableCell align='right'>Correo</TableCell>
              <TableCell align='right'>Latitud</TableCell>
              <TableCell align='right'>Longitud</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }}>
              <TableCell>{respuesta.id_cliente}</TableCell>
              <TableCell align='right'>{respuesta.primer_apellido}</TableCell>
              <TableCell align='right'>{respuesta.segundo_apellido}</TableCell>
              <TableCell align='right'>{respuesta.primer_nombre}</TableCell>
              <TableCell align='right'>{respuesta.segundo_nombre}</TableCell>
              <TableCell align='right'>{respuesta.entidad}</TableCell>
              <TableCell align='right'>{respuesta.direccion}</TableCell>
              <TableCell align='right'>{respuesta.telefono}</TableCell>
              <TableCell align='right'>{respuesta.nit}</TableCell>
              <TableCell align='right'>{respuesta.correo}</TableCell>
              <TableCell align='right'>{respuesta.latitud}</TableCell>
              <TableCell align='right'>{respuesta.longitud}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default VerCliente
