'use client'

// ** React Imports
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import themeConfig from 'src/configs/themeConfig'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import axios from 'axios'

interface Datos {
  message: string
  type: string
}
const BorrarServicio = () => {
  const router = useRouter()

  const [respuesta, setRespuesta] = useState<Datos>({
    message: '',
    type: ''
  })
  const { id } = router.query

  useEffect(() => {
    let miToken
    try {
      miToken = localStorage.getItem('token') || ''
    } catch (error) {}

    const config = {
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
        const respu = response.data
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
  }, [id, router])

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

  //console.log(respuesta)
  const resp = Object.entries(respuesta)
  console.log(resp)

  return <Box>{respuesta.type}</Box>
}

export default BorrarServicio
