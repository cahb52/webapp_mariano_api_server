"use client";
// ** React Imports
import { SyntheticEvent, useEffect, useState } from 'react'
import {useRouter} from 'next/router';

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import themeConfig from 'src/configs/themeConfig'


// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import verificarRol from '../../verification/verificarrol'
import { CardContent, Grid, TextField, Button, Alert, IconButton, AlertTitle, Link, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import axios from 'axios';

const verServicio =  () => {
  const router = useRouter();
      verificarRol();
      
      const [respuesta, setRespuesta] = useState({});
      const {id} = router.query;
      const resultados = async (id:any)=>{ 
        let miToken
        try {
          miToken = localStorage.getItem("token") || ""
        } catch (error) {}

        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: themeConfig.serverApi+'/api/servicios/ver/'+id,
          headers: { 
            'Authorization': 'Bearer '+ miToken
          }
        };
        axios.request(config)
        .then((response:any) => {
          let respu = response.data;
          setRespuesta(respu);
          //console.log(respuesta);
          return respu;
        })
        .catch((error:any) => {
          console.log(error);
        });
      }
      useEffect(()=>{
        resultados(id);
      },[id])
     
      //console.log(respuesta)
      const resp = Object.entries(respuesta);
      console.log(resp); 
      const createData = (id: string, tipo_servicio: string, descripcion: string) => {
        return { id, tipo_servicio, descripcion }
      }
      const rows = [
        
      ];
     
 return (
    <Box>
        <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>ID servicio</TableCell>
            <TableCell align='right'>Servicio</TableCell>
            <TableCell align='right'>Descripción</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              {
                Object.values(respuesta).map((value, index)=>{
                  return (<TableCell key={index}>{value}</TableCell>)
                })
              }
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
 );  
}

export default  verServicio