'use client'
// ** React Imports
import { SyntheticEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import themeConfig from 'src/configs/themeConfig'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import verificarRol from '../../verification/verificarrol'
import {
  CardContent,
  Grid,
  TextField,
  Button,
  Alert,
  IconButton,
  AlertTitle,
  Link,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material'
import axios from 'axios'
interface Datos {
  message: string
  type: string
}
const verServicio = () => {
  const router = useRouter()
  verificarRol()

  const [respuesta, setRespuesta] = useState<Datos>({
    message: '',
    type: ''
  })
  const { id } = router.query
  const resultados = async (id: any) => {
    let miToken
    try {
      miToken = localStorage.getItem('token') || ''
    } catch (error) {}

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: themeConfig.serverApi + '/api/servicios/eliminar/' + id,
      headers: {
        Authorization: 'Bearer ' + miToken
      }
    }
    axios
      .request(config)
      .then((response: any) => {
        let respu = response.data
        setRespuesta(respu)
        if (respu.message == 'ok') {
          router.push('/servicios/')
        }
        //console.log(respuesta);
        return respu
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
  useEffect(() => {
    resultados(id)
  }, [id])

  //console.log(respuesta)
  const resp = Object.entries(respuesta)
  console.log(resp)

  return <Box>{respuesta.type}</Box>
}

export default verServicio
