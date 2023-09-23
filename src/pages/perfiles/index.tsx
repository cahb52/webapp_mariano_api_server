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
  Grid,
  Button
} from '@mui/material'
import axios from 'axios'
import { Delete, Update } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import themeConfig from 'src/configs/themeConfig'

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
const ServiciosSettings = () => {
  const [status, setStatus] = useState('')
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

  const acceso = [{ rol: 'admin' }, { rol: 'supervisor' }]
  const router = useRouter()

  useEffect(() => {
    let miToken
    try {
      miToken = localStorage.getItem('token') || ''
    } catch (error) {}

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: themeConfig.serverApi + '/api/personal/listar',
      headers: {
        Authorization: 'Bearer ' + miToken
      }
    }
    axios
      .request(config)
      .then((response: any) => {
        setRespuesta(response.data)
        setStatus('success')

        // console.log('soy respu ')
        console.log(response.data)
      })
      .catch((error: any) => {
        console.log(error)
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

  // console.log('soy la respuesta')
  // console.log(respuesta)
  let rows
  try {
    rows = Object.values(respuesta)
  } catch (error) {
    rows = []
  }
  if (status !== 'success') {
    return <h1>Cargando</h1>
  }

  return (
    <Card>
      <CardContent>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
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
                <TableCell align='right'>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index} sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    <Link href={'/perfiles/ver?id=' + row.id_personal} underline='none'>
                      {row.id_personal}
                    </Link>
                  </TableCell>
                  <TableCell align='right'>{row.primer_apellido}</TableCell>
                  <TableCell align='right'>{row.segundo_apellido}</TableCell>
                  <TableCell align='right'>{row.primer_nombre}</TableCell>
                  <TableCell align='right'>{row.segundo_nombre}</TableCell>
                  <TableCell align='right'>{row.cui}</TableCell>
                  <TableCell align='right'>{row.fecha_nacimiento}</TableCell>
                  <TableCell align='right'>{row.direccion}</TableCell>
                  <TableCell align='right'>{row.telefono}</TableCell>
                  <TableCell align='right'>
                    {<Button onClick={() => router.push('/usuario/ver?id=' + row.id_users)}>Ver Usuario</Button>}
                  </TableCell>

                  <TableCell align='right'>
                    <Grid item xs={4}>
                      <Link href={'/perfiles/borrar?id=' + row.id_personal} underline='none'>
                        <Delete />
                      </Link>
                    </Grid>
                    <Grid item xs={4}>
                      <Link href={'/perfiles/actualizar?id=' + row.id_personal} underline='none'>
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

export default ServiciosSettings
