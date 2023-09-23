/* eslint-disable react-hooks/rules-of-hooks */
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
const verServicio = () => {
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

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: themeConfig.serverApi + '/api/personal/eliminar/' + id,
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
          router.push('/perfiles/')
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  //console.log(respuesta)
  const resp = Object.entries(respuesta)
  console.log(resp)

  return <Box>{respuesta.type}</Box>
}

export default verServicio
