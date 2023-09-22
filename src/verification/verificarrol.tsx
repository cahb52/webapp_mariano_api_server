'use client'
import themeConfig from 'src/configs/themeConfig'
import axios from 'axios'
import router from 'next/router'

const verificarRol = async () => {
  let miToken
  try {
    miToken = localStorage.getItem('token')
  } catch (error) {}

  if (miToken) {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: themeConfig.serverApi + '/api/verificar/' + miToken,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data))
      })
      .catch(error => {
        console.log(error)
        router.push('/page/login')
      })
  } else {
  }
}
export default verificarRol
