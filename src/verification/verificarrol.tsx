import themeConfig from 'src/configs/themeConfig'
import axios from 'axios';
import { Router, useRouter } from 'next/router'


const verificarRol = async ()=>{
    const router = useRouter();
    let miToken
    try {
        miToken = localStorage.getItem("token") || ""
      } catch (error) {}

    if(miToken) {
        const {data, status} = await axios.post(
            themeConfig.serverApi+"/api/verificar",
            { token: miToken},
            {
            headers: {
                'Content-Type':'application/json',
                Accept: 'application/json',
                //Accept: '*/*',
            }
            }
        );
        
        if(data.rol){
              localStorage.setItem('rol', data.rol);
              
          } else {
            
         }
    } else {
        
        router.push('/pages/login')
    }
}
export default verificarRol