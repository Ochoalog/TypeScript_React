import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { entrar, IUsuario } from "./backend";

export default function TelaLogin(props: {
  onLogin: (usuario: IUsuario) => void;
}) {
  const [email, setEmail] = useState("usuario@email.com");
  const [senha, setSenha] = useState("1234");
  const [erro, setErro] = useState("");

  return (
    <div>
      <h1>Despesas</h1>
      <p>Digite e-mail e senha para entrar no sistema.</p>
      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          label="E-mail"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <TextField
          fullWidth
          type="password"
          label="Senha"
          value={senha}
          onChange={(evt) => setSenha(evt.target.value)}
        />
        {erro && <div>{erro}</div>}
        <div>
          <Button type="submit" variant="contained" color="primary">
            Entrar
          </Button>
        </div>
      </form>
    </div>
  );

  function onSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setErro("");
    entrar(email, senha).then(props.onLogin, (erro) => {
      setErro("E-mail ou senha incorretos.");
    });
  }
}
