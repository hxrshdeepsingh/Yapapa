---
title: Installation
description: Install Yapapa using your preferred package manager.
---

## Requirements

Before installing Yapapa, make sure you have one of the supported runtimes installed:

* Node.js
* Bun

## Install Yapapa

Install Yapapa in your project using your preferred package manager:

```bash
npm install yapapa
```

Or with pnpm:

```bash
pnpm add yapapa
```

Or with Bun:

```bash
bun add yapapa
```

## Create a project

Create a project and configure Yapapa according to your preferred runtime.

A basic Yapapa application contains your pages inside the pages directory:

```text
my-app/
├── src/
│   └── pages/
│       └── index.yapapa
├── yapapa.config.ts
└── package.json
```

## Run the development server

Start Yapapa in development mode:

```bash
yapapa dev
```

Yapapa will generate the required route information, load your pages, and start the development server.

Open the local URL shown in your terminal.

## Build your application

When you are ready to build:

```bash
yapapa build
```

This generates the route information needed by your application.

You can then start the built application with:

```bash
yapapa start
```

> **Note:** Yapapa is actively evolving. Some project setup and configuration details may change as the framework develops.
