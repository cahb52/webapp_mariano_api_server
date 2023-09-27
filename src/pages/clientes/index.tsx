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

import themeConfig from 'src/configs/themeConfig'
import axios from 'axios'
import { Delete, Update } from 'mdi-material-ui'
import { useRouter } from 'next/router'

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
const ServiciosSettings = () => {
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
      return <>No autorizado</>
    }
  }

  //terminamos de definir los permisos de acceso

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

  const resultados = async () => {
    let miToken
    try {
      miToken = localStorage.getItem('token') || ''
    } catch (error) {}

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: themeConfig.serverApi + '/api/clientes/listar',
      headers: {
        Authorization: 'Bearer ' + miToken
      }
    }
    axios
      .request(config)
      .then((response: any) => {
        const respu = response.data
        setRespuesta(respu)

        // console.log('soy respu ')
        // console.log(response.data)

        return respu
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
  useEffect(() => {
    resultados()
  }, [])

  // console.log('soy la respuesta')
  // console.log(respuesta)
  let rows
  try {
    rows = Object.values(respuesta)
  } catch (error) {
    rows = []
  }

  return (
    <Card>
      <CardContent>
        <Button onClick={() => router.push('/clientes/crear')}>+ Crear cliente</Button>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
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
                <TableCell align='right'>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index} sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    <Link href={'/clientes/ver?id=' + row.id_cliente} underline='none'>
                      {row.id_cliente}
                    </Link>
                  </TableCell>
                  <TableCell align='right'>{row.primer_apellido}</TableCell>
                  <TableCell align='right'>{row.segundo_apellido}</TableCell>
                  <TableCell align='right'>{row.primer_nombre}</TableCell>
                  <TableCell align='right'>{row.segundo_nombre}</TableCell>
                  <TableCell align='right'>{row.entidad}</TableCell>
                  <TableCell align='right'>{row.direccion}</TableCell>
                  <TableCell align='right'>{row.telefono}</TableCell>
                  <TableCell align='right'>{row.nit}</TableCell>
                  <TableCell align='right'>{row.correo}</TableCell>
                  <TableCell align='right'>{row.latitud}</TableCell>
                  <TableCell align='right'>{row.longitud}</TableCell>

                  <TableCell align='right'>
                    <Grid item xs={4}>
                      <Link href={'/clientes/borrar?id=' + row.id_cliente} underline='none'>
                        <Delete />
                      </Link>
                    </Grid>
                    <Grid item xs={4}>
                      <Link href={'/clientes/actualizar?id=' + row.id_cliente} underline='none'>
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
