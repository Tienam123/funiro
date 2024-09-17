🚀 Features

    📦 Pack your SVG files in one (spritemap) file
    ✨ Use your SVG in an <svg> or <img> tags and also directly in your CSS/SCSS/Stylus/Less
    🍕 Import SVG fragment as VueJS component
    🔥 HMR support
    🚮 Includes Html pages

## 🧠 Installation

1. **Clone the repository:**

    ```bash
    git clone <URL-repository>
    cd <project-name>
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

   или

    ```bash
    yarn
    ```
3. **Deploy**


   To set up the correct URL for deploying to GitHub Pages in your project, you need to replace {username} and {repo-name} with your own values. Here's how:

```
"homepage": "https://{username}.github.io/{repo-name}/",
```


4. **Development**

To run the project in development mode, use the following command::

```bash
npm run dev или yarn dev
```

To deploy the project, use
```bash
npm run build
```

SVG

```<svg>
  <use xlink:href="/__spritemap#sprite-spiriit"></use>
</svg>
```

Img

You need to add the suffix -view to access to the fragment.

```javascript
<img src="/__spritemap#sprite-spiriit-view" />
```


```javascript
// main.scss
@import './spritemap.scss';
```

Use for backend integration

ViteJS allows to be use to serve assets. So, you can connect ViteJS with Wordpress, Drupal or any kind of backend.

Important

To make vite-plugin-svg-spritemap works with this kind of environnment, you will need to handle the right url inside your backend if you are on dev or build.

For example, with <use> on dev, using direcly the id of the svg (with the injectSVGOnDev option).

```javascript
<svg>
  <use xlink:href="#sprite-spiriit"></use>
</svg>
```

And in prod, by putting the correct URL manually thanks to the manifest.json file information :

<svg>
  <use xlink:href="https://my-cool-website.com/dist/assets/spritemap.95b4c41a.svg#sprite-spiriit"></use>
</svg>