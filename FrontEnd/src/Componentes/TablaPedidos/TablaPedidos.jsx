import * as React from "react";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const estados = {
    "Pendiente":"#CE93D8",
    "En Camino":"#ffcc00",
    "Entregado":"#29B6F6",
    "Terminado":"#10d21b",
    "En Cocina":"#FFA000"
  }

    

export const TablaPedidos = (props) => {
  const { columns, rows } = props;

  const navigate = useNavigate();

  function redirect(id, estado){
    // console.log(id + " - " + estado)

    let ruta = `${id}/${encodeURI(estado)}`
    navigate(ruta)
}

  return (
    <TableContainer component={Paper} sx={{maxHeight: '80vh', overflow: 'auto'}}>
      <Table stickyHeader sx={{ minWidth: 700 }}>
        <TableHead >
          <TableRow bgcolor="#fff">
            {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align="center"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id} onClick={(event) => redirect(row.id, row.estado)}
                sx={{
                    '&:hover': {
                        backgroundColor: '#ebcabd',
                    } 
                }}>
                <StyledTableCell align="center">{row.restaurante}</StyledTableCell>
                <StyledTableCell align="center">{row.repartidor}</StyledTableCell>
                <StyledTableCell align="center">{row.direccion}</StyledTableCell>
                <StyledTableCell align="center">${row.costo}</StyledTableCell>
                <StyledTableCell align="center">{row.fecha}</StyledTableCell>
                <StyledTableCell align="center">
                    <Box
                        sx={{
                            backgroundColor: estados[row.estado],
                            height: 30,
                            borderRadius: '1em 1em 1em 1em',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {row.estado}
                    </Box>
                </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
