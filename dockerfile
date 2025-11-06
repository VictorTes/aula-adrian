FROM node:18

WORKDIR /usr/src/app

# Copia apenas os manifests primeiro
COPY package*.json ./

# Instala dependências (sem bcrypt nativo)
RUN npm install

# Copia o restante do código
COPY . .

EXPOSE 3000

CMD ["node", "app.js"]