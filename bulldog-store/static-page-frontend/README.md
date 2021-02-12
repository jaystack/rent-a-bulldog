## Create a next.config.js file in the root folder with the following content:

module.exports = {
  env: {
    contentfulSpace: your contentful space,
    contentfulAccessToken: your contentful acces id,
  },
  publicRuntimeConfig: {
    baseUrl: 'http://localhost:3000',
  },
};

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

