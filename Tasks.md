# Tasks for Achieving Local Environment Goals

This document breaks down the steps required to achieve a fully functional local Kong Gateway environment as described in Planning.md. Each task is atomic and actionable, covering everything from initial setup to live reload and developer experience.

---

## 1. Repository & Tooling Setup
- [x] Initialize the project repository (if not already done)
- [x] Add a `.gitignore` for common artifacts (Docker, Kubernetes, Tilt, etc.)
- [x] Ensure Docker Desktop is installed and running
- [x] Ensure Kubernetes is enabled in Docker Desktop
- [x] Install Tilt
- [x] Install kubectl (Kubernetes CLI)

## 2. Kong Configuration
- [ ] Create a base `kong.yml` declarative config file
- [ ] Add example Service, Route, and Plugin definitions to `kong.yml`
- [ ] Document the structure and purpose of `kong.yml`

## 3. Docker & Image Management
- [ ] Write a `Dockerfile` for Kong (if custom image is needed)
- [ ] Build the Kong image locally (e.g., `kong:local-dev`)
- [ ] Push or load the image into the local Kubernetes cluster (handled by Tilt)

## 4. Kubernetes Manifests
- [ ] Create a `k8s/` directory for manifests
- [ ] Write a `Deployment` manifest for Kong in DB-less mode
- [ ] Write a `Service` manifest to expose Kong proxy and admin ports (NodePort for local access)
- [ ] Create a `ConfigMap` manifest to mount the local `kong.yml` into the Kong pod
- [ ] Ensure manifests are parameterized for local development

## 5. Tilt Integration
- [ ] Create a `Tiltfile` to:
    - [ ] Build the Kong image
    - [ ] Apply Kubernetes manifests
    - [ ] Sync local `kong.yml` changes into the cluster (via ConfigMap regeneration or file sync)
    - [ ] (Optional) Automate live reload by POSTing config to the Admin API on file change
- [ ] Document how to use Tilt for local development

## 6. Live Reload / Developer Experience
- [ ] Implement a mechanism to detect changes in `kong.yml` and reload config in the running Kong pod (e.g., via Tilt local_resource or file watcher script)
- [ ] Validate that live reload works as expected (edit `kong.yml`, see changes reflected without pod restart)
- [ ] Add clear error messages/logging for failed reloads

## 7. Validation & Testing
- [ ] Add a script or Tilt step to validate `kong.yml` with `kong config parse` before applying changes
- [ ] Test the local environment by adding/removing services/routes/plugins and verifying via Kong Admin API and proxy

## 8. Documentation
- [ ] Write a "Getting Started" section in the README for local setup
- [ ] Document the live reload workflow and troubleshooting steps
- [ ] Add usage examples for common tasks (adding a service, route, plugin)

## 9. Optional Enhancements
- [ ] Add integration tests for local Kong instance
- [ ] Add health checks and basic monitoring/logging for the local environment
- [ ] Provide a script to clean up all local resources (pods, images, configs)

---

**By completing these tasks, you will have a robust, developer-friendly local Kong Gateway environment with live reload, matching the goals set out in Planning.md.** 