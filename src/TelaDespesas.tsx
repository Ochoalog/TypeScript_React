import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { useEffect, useState, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getDespesas, IDespesa } from "./backend";
import TabelaDespesas from "./TabelaDespesas";
import TabelaResumo, { IDespesaCategoria } from "./TabelaResumo";

const anos = ["2020", "2021"];

const meses = [
  { valor: "01", nome: "Janeiro" },
  { valor: "02", nome: "Fevereiro" },
  { valor: "03", nome: "Março" },
  { valor: "04", nome: "Abril" },
  { valor: "05", nome: "Maio" },
  { valor: "06", nome: "Junho" },
  { valor: "07", nome: "Julho" },
  { valor: "08", nome: "Agosto" },
  { valor: "09", nome: "Setembro" },
  { valor: "10", nome: "Outubro" },
  { valor: "11", nome: "Novembro" },
  { valor: "12", nome: "Dezembro" },
];

function useDespesas(mes: string) {
  const [despesas, setDespesas] = useState<IDespesa[]>([]);
  const despesaTotal = calculaTotal(despesas);
  const despesasPorCategoria = useMemo(() => {
    return agrupaPorCategoria(despesas);
  }, [despesas]);

  useEffect(() => {
    getDespesas(mes).then(setDespesas);
  }, [mes]);

  return {
    despesas,
    despesaTotal,
    despesasPorCategoria,
  };
}

export default function TelaDespesas(props: {}) {
  const params = useParams<{ mes: string }>();
  const history = useHistory();

  const { despesas, despesaTotal, despesasPorCategoria } = useDespesas(
    params.mes
  );
  const [aba, setAba] = useState(0);

  const [ano, mes] = params.mes.split("-");

  function mudaAnoMes(ano: string, mes: string) {
    history.push(`/despesas/${ano}-${mes}`);
  }

  return (
    <div>
      <Box display="flex" padding="16px" alignItems="center">
        <FormControl>
          <InputLabel id="label-ano">Ano</InputLabel>
          <Select
            labelId="label-ano"
            value={ano}
            onChange={(evt) => mudaAnoMes(evt.target.value as string, mes)}
          >
            {anos.map((ano) => (
              <MenuItem key={ano} value={ano}>
                {ano}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="label-mes">Mês</InputLabel>
          <Select
            labelId="label-mes"
            value={mes}
            onChange={(evt) => mudaAnoMes(ano, evt.target.value as string)}
          >
            {meses.map((mes) => (
              <MenuItem key={mes.valor} value={mes.valor}>
                {mes.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box flex="1" />
        <div>
          Despesa total: <strong>R$ {formataDinheiro(despesaTotal)}</strong>
        </div>
      </Box>

      <Tabs
        value={aba}
        onChange={(evt, novaAba) => setAba(novaAba)}
        aria-label="simple tabs example"
      >
        <Tab label="Resumo" />
        <Tab label="Detalhes" />
      </Tabs>

      {aba == 0 ? (
        <TabelaResumo despesas={despesasPorCategoria} />
      ) : (
        <TabelaDespesas despesas={despesas} />
      )}
    </div>
  );
}

function calculaTotal(despesas: IDespesa[]): number {
  let total = 0;
  for (let despesa of despesas) {
    total += despesa.valor;
  }
  return total;
}

function agrupaPorCategoria(despesas: IDespesa[]): IDespesaCategoria[] {
  console.log("agrupaPorCategoria");
  const map = new Map<string, number>();
  for (const despesa of despesas) {
    if (map.has(despesa.categoria)) {
      map.set(despesa.categoria, map.get(despesa.categoria)! + despesa.valor);
    } else {
      map.set(despesa.categoria, despesa.valor);
    }
  }
  const resultados: IDespesaCategoria[] = [];
  for (const entry of Array.from(map.entries())) {
    resultados.push({ categoria: entry[0], valor: entry[1] });
  }
  resultados.sort((a, b) => b.valor - a.valor);

  return resultados;
}

function formataDinheiro(valor: number) {
  return valor.toFixed(2);
}
