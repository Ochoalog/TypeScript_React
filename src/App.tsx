import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import { IUsuario, obtemUsuario, sair } from "./backend";
import TelaDespesas from "./TelaDespesas";
import TelaLogin from "./TelaLogin";
import Button from "@material-ui/core/Button";

function App() {
  const [usuario, setUsuario] = useState<IUsuario | null>(null);

  useEffect(() => {
    obtemUsuario().then(setUsuario, (erro) => {
      setUsuario(null);
    });
  }, []);

  return (
    <div>
      {usuario ? (
        <BrowserRouter>
          <Switch>
            <Route path="/despesas/:mes">
              <div>
                Olá {usuario.nome}
                <Button onClick={onSair}>Sair</Button>
              </div>
              <TelaDespesas />
            </Route>
            <Redirect to={{ pathname: "/despesas/2021-06" }} />
          </Switch>
        </BrowserRouter>
      ) : (
        <TelaLogin onLogin={setUsuario} />
      )}
    </div>
  );

  function onSair() {
    sair().then(() => {
      setUsuario(null);
    });
  }
}

export default App;
