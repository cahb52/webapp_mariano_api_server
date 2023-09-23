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
  Grid,
  Button,
  Link
} from '@mui/material'
import themeConfig from 'src/configs/themeConfig'
import axios from 'axios'
import { Delete, FaceManProfile, Update } from 'mdi-material-ui'
import { useRouter } from 'next/router'

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
const ServiciosSettings = () => {
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

  const resultados = async () => {
    let miToken
    try {
      miToken = localStorage.getItem('token') || ''
    } catch (error) {}

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: themeConfig.serverApi + '/api/listarusuarios',
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
    resultados()
  }, [])

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

  // console.log('soy la respuesta')
  // console.log(respuesta)
  let rows
  try {
    rows = Object.values(respuesta)
  } catch (error) {
    rows = []
  }
  const roles = ['sin asignar', 'admin', 'supervisor', 'tecnico']

  // /console.log(rows)

  return (
    <Card>
      <CardContent>
        <Button onClick={() => router.push('/usuario/crear')}>+ Crear usuario</Button>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>

                <TableCell align='right'>Usuario</TableCell>
                <TableCell align='right'>Rol</TableCell>
                <TableCell align='right'>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index} sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    <Link href={'/usuario/ver?id=' + row.id_users} underline='none'>
                      {row.id_users}
                    </Link>
                  </TableCell>
                  <TableCell align='right'>{row.users}</TableCell>

                  <TableCell align='right'>{roles[row.id_rol]}</TableCell>

                  <TableCell align='right'>{row.estado}</TableCell>
                  <TableCell align='right'>
                    <Grid item xs={4}>
                      <Link href={'/usuario/eliminar?id=' + row.id_users} underline='none'>
                        <Delete />
                      </Link>
                    </Grid>
                    <Grid item xs={4}>
                      <Link href={'/usuario/actualizar?id=' + row.id_users} underline='none'>
                        <Update />
                      </Link>
                    </Grid>
                    <Grid item xs={4}>
                      <Link href={'/perfiles/crear?id=' + row?.id_users} underline='none'>
                        <FaceManProfile />
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

export default ServiciosSettings
