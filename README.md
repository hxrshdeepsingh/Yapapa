# Yapapa

**HTML in, HTML out.**

*Write server code. Ship plain HTML.*

Yapapa is a simple server rendered web framework for JavaScript and TypeScript.

You write `.yapapa` pages that fetch data and run logic on the server. Yapapa renders the page and sends the generated HTML straight to the browser.

**No client bundle, no hydration, no framework runtime. Just fast, simple pages powered by HTMX.**

## Features

* 🧩 Simple `.yapapa` pages
* 🖥️ Server-side rendering
* ⚡ HTML-first architecture
* 🔄 HTMX integration
* 📦 Folder based routing
* 🧱 Server-rendered components
* 🚫 No client-side framework runtime
* 🌐 Runtime independent
* 🟢 Node.js and Bun support

## Example

```html
<server>
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
  const user = await response.json()

  return {
    name: user.name,
    email: user.email
  }
</server>

<h1>Hello {name}</h1>
<p>{email}</p>
```

Yapapa executes the server code, renders the page, and sends the resulting HTML to the browser.

## Status

+ Yapapa is currently under active development.

## HTMX

HTMX is a core part of Yapapa's philosophy.

Instead of sending JavaScript applications to the browser, Yapapa can respond to HTMX requests with rendered HTML.

```text
Browser
   │
   │ HTMX request
   ▼
Yapapa
   │
   │ Server renders
   ▼
HTML
   │
   ▼
Browser
```

This keeps the client simple while still allowing dynamic web applications.

## Documentation

For installation, project setup, configuration, CLI commands, components, HTMX usage, and everything else:

**[Read the Yapapa Documentation](https://yapapa.mintlify.app/)**

## License

MIT
