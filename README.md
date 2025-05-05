# deezer

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```


# Local Proxy for the Deezer API

If you don't want your Deezer API to go down using a public proxy, you can set up your own local proxy. Here are the steps:

## Steps to Set Up the Local Proxy

### 1. Clone the CORS Anywhere repository

First, clone the [CORS Anywhere](https://github.com/Rob--W/cors-anywhere.git) repository.

```bash
git clone https://github.com/Rob--W/cors-anywhere.git

cd cors-anywhere
npm install

node server.js

try {
  const response = await fetch(
    `http://localhost:8080/https://api.deezer.com/search?q=${searchQuery.value}`
  );
  if (!response.ok) throw new Error('Error fetching data');
  const data = await response.json();

  searchResults.value.songs = data.data; // Assign the song results
} catch (error) {
  console.error('Error:', error);
}
