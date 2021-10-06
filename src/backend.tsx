export interface IDespesa {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export interface IUsuario {
  nome: string;
  email: string;
}

export function getDespesas(anoMes: string): Promise<IDespesa[]> {
  return fetch(`http://localhost:3001/despesas?mes=${anoMes}&_sort=dia`, {
    credentials: "include",
  }).then(trataResposta);
}

export function entrar(email: string, senha: string): Promise<IUsuario> {
  return fetch(`http://localhost:3001/sessao/criar`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      email: email,
      senha: senha,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(trataResposta);
}

export function obtemUsuario(): Promise<IUsuario> {
  return fetch(`http://localhost:3001/sessao/usuario`, {
    credentials: "include",
  }).then(trataResposta);
}

export function sair(): Promise<void> {
  return fetch(`http://localhost:3001/sessao/finalizar`, {
    method: "POST",
    credentials: "include",
  }).then(trataResposta);
}

function trataResposta(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}
