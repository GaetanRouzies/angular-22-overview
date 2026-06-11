# Angular 22 Overview

This project showcases all the new features introduced in Angular 22. Each feature is demonstrated in its own dedicated folder within the `src/app` directory.

## Overview

This is an interactive demonstration application that presents the latest Angular 22 features through practical examples. Navigate through the application to explore each feature in detail.

## Angular 22 New Features

Each feature is organized in its own numbered folder for easy navigation:

1. **@Service Decorator** (`1-service-decorator/`) - New @Service decorator for injectable services
2. **injectAsync** (`2-inject-async/`) - Lazy service injection with prefetch strategies
3. **HTTP Fetch** (`3-http-fetch/`) - Fetch API as the default HttpClient backend
4. **Template Improvements** (`4-template-improvements/`) - New template syntax capabilities
5. **Debounced Signals** (`5-debounced-signal/`) - New debounced() signal primitive
6. **Resources** (`6-resources/`) - resource, rxResource & httpResource APIs
7. **WebMCP & AI** (`7-webmcp-ai/`) - WebMCP tools to expose the app to AI assistants
8. **OnPush by Default** (`8-onpush-default/`) - OnPush change detection as the default strategy
9. **Signal Forms** (`9-signal-forms/`) - Signal-based forms (experimental)

## Project Structure

```
src/app/
├── 1-service-decorator/    # @Service decorator
├── 2-inject-async/         # injectAsync lazy injection
├── 3-http-fetch/           # Fetch-based HttpClient
├── 4-template-improvements/  # Template improvements
├── 5-debounced-signal/     # debounced() signals
├── 6-resources/            # resource & httpResource
├── 7-webmcp-ai/            # WebMCP & AI
├── 8-onpush-default/       # OnPush by default
├── 9-signal-forms/         # Signal-based forms
├── navbar/                 # Navigation component
└── shared/                 # Shared utilities
```

Each numbered folder contains a standalone component demonstrating its respective Angular 22 feature.
