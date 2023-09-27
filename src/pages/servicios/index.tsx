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
import Paper from '@mui/material/Paper'

import { useRouter } from 'next/router'
import themeConfig from 'src/configs/themeConfig'
import axios from 'axios'
import { Delete, Update } from 'mdi-material-ui'

interface Datos {
  id_servicio: string
  tipo_servicio: string
  descripcion: string
}
const ServiciosSettings = () => {
  const [respuesta, setRespuesta] = useState<Datos>({
    id_servicio: '',
    tipo_servicio: '',
    descripcion: ''
  })

  const resultados = async () => {
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
        const respu = response.data
        setRespuesta(respu)

        //console.log(respuesta);
        return respu
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
  useEffect(() => {
    resultados()
  }, [])

  const rows = Object.values(respuesta)
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

  return (
    <Card>
      <CardContent>
        <Button onClick={() => router.push('/servicios/crear')}>+ Crear Servicio</Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align='right'>Tipo Servicio</TableCell>
                <TableCell align='right'>Descripción</TableCell>
                <TableCell align='right'>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, id) => (
                <TableRow key={id} sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    <Link href={'/servicios/ver?id=' + row.id_servicio} underline='none'>
                      {row.id_servicio}
                    </Link>
                  </TableCell>
                  <TableCell align='right'>{row.tipo_servicio}</TableCell>
                  <TableCell align='right'>{row.descripcion}</TableCell>
                  <TableCell align='right'>
                    <Grid item xs={4}>
                      <Link href={'/servicios/borrar?id=' + row.id_servicio} underline='none'>
                        <Delete />
                      </Link>
                    </Grid>
                    <Grid item xs={4}>
                      <Link href={'/servicios/actualizar?id=' + row.id_servicio} underline='none'>
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
