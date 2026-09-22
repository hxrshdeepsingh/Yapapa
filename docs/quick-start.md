---
title: Quick Start
description: A fast, simple guide to getting your first Yapapa page running.
---

# Quick Start

Let's create a small Yapapa page.

## 1. Create a page

Create:

```text
src/pages/index.yapapa
```

Add the following:

```html
<server>
  const name = "Yapapa"

  return {
    name
  }
</server>

<!DOCTYPE html>
<html>
  <head>
    <title>Yapapa</title>
  </head>

  <body>
    <h1>Hello {name} 👋</h1>

    <p>
      This page was rendered on the server.
    </p>
  </body>
</html>
```

## 2. Start Yapapa

Run the development server:

```bash
yapapa dev
```

Yapapa will load your page and start the server.

## 3. Open the page

Open the URL shown in your terminal.

Your browser receives the rendered HTML:

```html
<h1>Hello Yapapa 👋</h1>

<p>
  This page was rendered on the server.
</p>
```

The value of `{name}` was resolved on the server before the HTML was sent to the browser.

## What's happening?

The flow is simple:

```text
index.yapapa
     ↓
Server code executes
     ↓
Template is rendered
     ↓
HTML is generated
     ↓
Browser receives HTML
```

You write the page.

Yapapa does the server-side work.

The browser receives the result.

## Next steps

Once you're comfortable with a basic page, you can start using:

* Server-side data fetching
* Conditional rendering
* Loops
* HTMX
* Server-rendered components
* Layouts

These features let you build complete applications while keeping the rendering process server-first.
