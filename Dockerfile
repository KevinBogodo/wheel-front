# Étape 1 : Build de l'application
FROM node:20 AS builder

WORKDIR /app

# Copier les fichiers nécessaires pour installer les dépendances
COPY package.json yarn.lock ./
RUN yarn install

# Copier tout le reste du projet
COPY . .

# Compiler le projet (Vite va créer le dossier /dist à la racine)
RUN yarn build

# Étape 2 : Utiliser Nginx pour servir l'app
FROM nginx:alpine

# Copier le contenu du dossier dist (à la racine) dans le répertoire public de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Optionnel : config personnalisée Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]