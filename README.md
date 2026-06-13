# Angular 22 Overview

This project showcases all the new features introduced in Angular 22. Each feature is demonstrated in its own dedicated folder within the `src/app` directory.

## Overview

This is an interactive demonstration application that presents the latest Angular 22 features through practical examples. Navigate through the application to explore each feature in detail.

## Starting the app

Run both commands in separate terminals to start the frontend and the backend.

```
npm run start
npm run server
```

## Angular 22 New Features

Each feature is organized in its own numbered folder for easy navigation:

1. **@Service Decorator** (`1-service-decorator/`) - New @Service decorator for injectable services
2. **injectAsync** (`2-inject-async/`) - Lazy service injection with prefetch strategies
3. **Signal Forms** (`3-signal-forms/`) - Signal-based forms
4. **Agent Skills** (`4-agent-skills/`) - Official Agent Skills for AI coding agents
5. **Template Improvements** (`5-template-improvements/`) - New template syntax capabilities
6. **Debounced Signals** (`6-debounced-signal/`) - New debounced() signal primitive
7. **Resources** (`7-resources/`) - resource, rxResource & httpResource APIs
8. **HTTP Fetch** (`8-http-fetch-vs-xhr/`) - Fetch API as the default HttpClient backend
9. **OnPush by Default** (`9-onpush-default/`) - OnPush change detection as the default strategy

## Project Structure

```
src/app/
├── 1-service-decorator/    # @Service decorator
├── 2-inject-async/         # injectAsync lazy injection
├── 3-signal-forms/         # Signal-based forms
├── 4-agent-skills/         # Agent Skills
├── 5-template-improvements/  # Template improvements
├── 6-debounced-signal/     # debounced() signals
├── 7-resources/            # resource & httpResource
├── 8-http-fetch-vs-xhr/    # Fetch-based HttpClient
├── 9-onpush-default/       # OnPush by default
└── navbar/                 # Navigation component
```

Each numbered folder contains a standalone component demonstrating its respective Angular 22 feature.
