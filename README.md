# PlanThech

## Descrição
Para eu não esquecer, o comando para começar o expo é 
$ npx expo start

## Instalação
Para executar o aplicativo PlanThech localmente em seu ambiente de desenvolvimento, siga estas etapas:

1. Certifique-se de ter o Node.js e o npm instalados em seu sistema.
2. Clone este repositório em sua máquina local usando o Git:
$ git clone https://github.com/seu-usuario/PlanThech.git

3. Navegue até o diretório do projeto:
```sh
$ cd PlanThech

4. Instale as dependências do projeto:
npm install

5. Execute o projeto usando Expo:
$ npx expo start

6. Abra o aplicativo Expo Go em seu dispositivo móvel e escaneie o código QR fornecido no terminal para visualizar o aplicativo PlanThech em seu dispositivo.

## Uso
Após instalar o aplicativo PlanThech, você pode começar a usá-lo para:

- Criar e gerenciar listas de tarefas.
- Agendar eventos e compromissos em um calendário.
- Definir metas e acompanhar seu progresso ao longo do tempo.

### Endpoints da API:

1. **/evapo/<current_date>/<idCultura>**:
   - **Descrição:** Calcula a evapotranspiração para uma determinada data (`current_date`) e um identificador de cultura (`idCultura`).
   - **Resposta:** Retorna um objeto com o valor da evapotranspiração (ETO) no formato: `{ETO: 3.86}`.

2. **/user**:
   - **Descrição:** Endpoint para cadastrar um novo usuário.
   - **Parâmetros:** Campos obrigatórios para o cadastro do usuário: `nameUser`, `emailUser`, `passUser`, `type_user`.
   - **Resposta:** Retorna uma mensagem indicando o sucesso do cadastro: `'mensagem': 'Usuário cadastrado com sucesso'`.

3. **/new_cultura/<user_id>**:
   - **Descrição:** Endpoint para cadastrar uma nova cultura associada a um usuário específico.
   - **Parâmetros:** O id do usuário (`user_id`) deve ser passado como parte da URL.
   - **Campos obrigatórios:** `nameCultura`, `qtdNitrogenio`, `qtdFosforo`, `qtdPotassio`, `necessidadeHidrica`, `latitude`, `longitude`.
   - **Resposta:** Retorna uma mensagem indicando o sucesso do cadastro da cultura e das coordenadas associadas: `'mensagem': 'Cultura e coordenadas inseridas com sucesso'`.

4. **/login**:
   - **Descrição:** Endpoint para realizar o login de um usuário.
   - **Resposta:** Retorna uma mensagem indicando o sucesso do login e o id do usuário logado: `'mensagem': 'Login bem-sucedido!', 'idUsuario': user_id`.

5. **/listCulturas/<user_id>**:
   - **Descrição:** Endpoint para listar as culturas associadas a um usuário específico.
   - **Parâmetros:** O id do usuário (`user_id`) deve ser passado como parte da URL.
   - **Resposta:** Retorna um JSON com os detalhes das culturas, incluindo o id da cultura (`idCultura`), o nome da cultura (`nomeCultura`), o id da coordenada (`idCoordenada`), a latitude (`latitude`) e a longitude (`longitude`).

6. **/dados/<idCultura>/<idCoordenada>/<current_date>/<end_date>**:
   - **Descrição:** Endpoint para mostrar os dados de uma cultura em uma determinada coordenada durante um período específico.
   - **Parâmetros:** `idCultura`, `idCoordenada`, `current_date` (data de início) e `end_date` (data de término) devem ser passados como parte da URL.
   - **Resposta:** Retorna um JSON com os dados da cultura, incluindo o id do dado do sensor (`idDadoSensor`), a data (`dataDado`), a hora (`horaDado`), a temperatura do solo (`tempSolo`), a umidade do solo (`umidadeSolo`), a temperatura máxima (`tempMax`), a temperatura mínima (`tempMin`), a umidade do ar (`umidadeAr`), o nitrogênio do solo (`nitrogenioSolo`), o fósforo do solo (`fosforoSolo`), o potássio do solo (`potassioSolo`) e a precipitação (`precipitacao`).

