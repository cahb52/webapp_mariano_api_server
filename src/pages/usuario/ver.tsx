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
  const [respuestaDatos, setRespuesta] = useState<Datos>({
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
  const router = useRouter()
  const { id } = router.query
  const resultaDos = async (id: any) => {
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

        return respu
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  useEffect(() => {
    resultaDos(id)
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

  let roless: any = []
  try {
    roless = Object.values(respuestaDatos.role)

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
              <TableCell>{respuestaDatos.id_rol}</TableCell>
              <TableCell align='right'>{roless[1]}</TableCell>
              <TableCell align='right'>{respuestaDatos.users}</TableCell>

              <TableCell align='right'>{respuestaDatos.estado}</TableCell>
              <TableCell align='right'>{respuestaDatos.createdAt}</TableCell>
              <TableCell align='right'>{respuestaDatos.updatedAt}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default verUsuario
