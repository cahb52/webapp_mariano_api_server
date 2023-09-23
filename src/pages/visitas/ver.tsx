'use client'

// ** React Imports
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import themeConfig from 'src/configs/themeConfig'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import verificarRol from '../../verification/verificarrol'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box, Button } from '@mui/material'
import axios from 'axios'

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

const verUsuario = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [respuesta, setRespuesta] = useState<Datos>({
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
        setRespuesta(respu)

        // console.log('soy el rspu')
        // console.log(respu)

        return respu
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
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
              <TableCell align='right'>CUI/DPI</TableCell>
              <TableCell align='right'>Dirección</TableCell>
              <TableCell align='right'>Fecha de Nacimiento</TableCell>
              <TableCell align='right'>Teléfono</TableCell>
              <TableCell align='right'>Usuario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }}>
              <TableCell>{respuesta.id_personal}</TableCell>
              <TableCell align='right'>{respuesta.primer_apellido}</TableCell>
              <TableCell align='right'>{respuesta.segundo_apellido}</TableCell>
              <TableCell align='right'>{respuesta.primer_nombre}</TableCell>
              <TableCell align='right'>{respuesta.segundo_nombre}</TableCell>
              <TableCell align='right'>{respuesta.cui}</TableCell>
              <TableCell align='right'>{respuesta.direccion}</TableCell>
              <TableCell align='right'>{respuesta.fecha_nacimiento}</TableCell>
              <TableCell align='right'>{respuesta.telefono}</TableCell>
              <TableCell align='right'>
                {
                  <Button onClick={() => router.push('/usuario/ver?id=' + respuesta.id_users)}>
                    Ver Usuario Asignado
                  </Button>
                }
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default verUsuario
