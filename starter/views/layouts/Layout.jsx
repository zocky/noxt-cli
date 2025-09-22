export default function Layout({ body }, { slot, Header }) {

  const scripts = slot('script').map(makeScriptTag).join('\n');
  const styles = slot('style').map(makeStyleTag).join('\n');
  const inlineJS = slot('js').map(c => `<script>${c}</script>`).join('\n');
  const inlineCSS = slot('css').map(c => `<style>${c}</style>`).join('\n');
  const title=slot('title').join (' | ');

  return (<>
    {{ html: `<!DOCTYPE html>` }}
    <html>
      <head>
        <meta charset="utf-8" />
        <title>{title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght,GRAD@8..144,25..151,100..1000,-200..150&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="icon" href="/img/favicon.png" />
        {{ html: styles }}
        {{ html: scripts }}
        <script type="module" src="/js/main.js"></script>
        {{ html: inlineCSS }}
      </head>
      <body>
        <Header title={title}/>
        <div class="skin layout">
          {{ html: body }}
        </div>
        {{ html: inlineJS }}
      </body>
    </html>
  </>);
}

function makeScriptTag(entry) {
  if (typeof entry === 'string') return `<script type="module" src="${entry}"></script>`;
  if (entry && typeof entry === 'object') {
    const attrs = Object.entries(entry).map(([k, v]) => ` ${k}="${v}"`).join('');
    return `<script${attrs}></script>`;
  }
  return '';
}

function makeStyleTag(entry) {
  if (typeof entry === 'string') return `<link rel="stylesheet" href="${entry}">`;
  if (entry && typeof entry === 'object') {
    const attrs = Object.entries(entry).map(([k, v]) => ` ${k}="${v}"`).join('');
    return `<link rel="stylesheet"${attrs}>`;
  }
  return '';
}