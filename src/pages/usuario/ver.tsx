'use client'

// ** React Imports
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import themeConfig from 'src/configs/themeConfig'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import verificarRol from '../../verification/verificarrol'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material'
import axios from 'axios'

interface Datos {
  id_users: string
  id_rol: string
  users: string
  estado: string
  createdAt: string
  updatedAt: string
  role: {
    rol: string
  }
}
const verUsuario = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  verificarRol()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [respuesta, setRespuesta] = useState<Datos>({
    id_users: '',
    id_rol: '',
    users: '',
    estado: '',
    createdAt: '',
    updatedAt: '',
    role: {
      rol: ''
    }
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
      url: themeConfig.serverApi + '/api/usuarioadmin/' + id,
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
  let roless: any = []
  try {
    roless = Object.values(respuesta.role)

    //console.log(roless)
  } catch (error) {}

  return (
    <Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align='right'>Rol</TableCell>
              <TableCell align='right'>Usuario</TableCell>
              <TableCell align='right'>Estado</TableCell>
              <TableCell align='right'>Fecha de Creación</TableCell>
              <TableCell align='right'>Fecha de Actualización</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }}>
              <TableCell>{respuesta.id_rol}</TableCell>
              <TableCell align='right'>{roless[1]}</TableCell>
              <TableCell align='right'>{respuesta.users}</TableCell>

              <TableCell align='right'>{respuesta.estado}</TableCell>
              <TableCell align='right'>{respuesta.createdAt}</TableCell>
              <TableCell align='right'>{respuesta.updatedAt}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default verUsuario
