# MeetApp

App agregador de eventos para desenvolvedores

## Telas

### Web

[Imgur](https://i.imgur.com/7O4zi8Z.png)


## Inicialização

### Backend

Criar banco de dados postgres:
```
docker run --name databaseChallenge -e POSTGRES_PASSWORD=suasenha -p 5432:5432 -d postgres
```
Criar banco de dados redis:
```
docker run --name redismeet -p 6379:6379 -d -t redis:alpine
```
Iniciar banco postgres:
```
docker start databaseChallenge
```
Iniciar banco redis:
```
docker start redismeet
```
Criar arquivo **.env** de acordo com o arquivo **.env.example**

Migrar tabelas para postgres:
```
**yarn sequelize db:migrate
```
Instalar dependências:
```
yarn
```
Rodar projeto:
```
yarn dev
```
Rodar fila:
```
yarn queue
```

### Frontend

Instalar dependências:
```
yarn
```
Rodar projeto:
```
yarn start
```

### Mobile

#### Android

Instalar dependências:
```
yarn
```
Instalar app no dispositivo:
```
yarn android
```
Rodar projeto:
```
yarn start
```

#### IOS

Instalar dependências:
```
yarn
```
Dentro da pasta ios para instalar dependências:
```
pod install
```
Instalar app no dispositivo:
```
react-native run-ios
```
Rodar projeto:
```
yarn start
```
