import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export interface IDespesaCategoria {
  categoria: string;
  valor: number;
}

export default function TabelaDespesas(props: {
  despesas: IDespesaCategoria[];
}) {
  return (
    <TableContainer component="div">
      <Table aria-label="Despesas do mês">
        <TableHead>
          <TableRow>
            <TableCell>Categoria</TableCell>
            <TableCell align="right">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.despesas.map((despesa) => (
            <TableRow key={despesa.categoria}>
              <TableCell>{despesa.categoria}</TableCell>
              <TableCell align="right">
                {formataDinheiro(despesa.valor)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function formataDinheiro(valor: number) {
  return valor.toFixed(2);
}
