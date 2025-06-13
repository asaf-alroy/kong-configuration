# Kong Gateway Configuration Management: Local, Preprod, and Production

## Table of Contents
1. [Introduction](#introduction)
2. [Current Challenges](#current-challenges)
3. [Proposed Solution & Workflow](#proposed-solution--workflow)
    1. [Local Environment](#local-environment)
    2. [Preproduction Environment](#preproduction-environment)
    3. [Production Environment](#production-environment)
4. [GitOps Workflow](#gitops-workflow)
5. [Validation and Testing](#validation-and-testing)
6. [Rollback Strategy](#rollback-strategy)
7. [Configuration Management](#configuration-management)
8. [Documentation and Onboarding](#documentation-and-onboarding)
9. [Monitoring and Observability](#monitoring-and-observability)

---

## 1. Introduction
This repository is a proof of concept (POC) for a state-of-the-art, declarative configuration management solution for Kong Gateway. The goal is to modernize and automate the way we manage Kong's configuration across local, preproduction, and production environments.

## 2. Current Challenges
- **Manual Production Deployments:** Adding new Gateway Services and Routes currently requires manual entry via the Admin GUI in both preprod and production. This process is error-prone and can lead to misconfigurations.
- **Lack of Local Environment:** There is no local environment for safe experimentation. All changes are made directly in preprod, increasing risk and reducing developer confidence.

## 3. Proposed Solution & Workflow
We aim to address these challenges by adopting a declarative, DB-less approach for Kong configuration, supported by modern tooling and automation.

### 3.1 Local Environment
- **Stack:** Tilt, Docker Desktop, and Kong in DB-less mode.
- **Workflow:** Developers can edit modular config files in `kong-config/` locally. decK is used to assemble these files and provide live updates to the running Kong instance (via Admin API POST) for rapid feedback. This live reload is strictly for local development and is not used in preprod or prod.

### 3.2 Preproduction Environment
- **Purpose:** Safely test and validate configuration changes against real services in a preproduction Kubernetes cluster.
- **Deployment:** decK is used only to assemble a single `kong.yml` from modular files. This assembled file is deployed via ConfigMap or similar, and is the sole source of truth for Kong in preprod. No live reload or Admin API POSTs are performed in preprod.

### 3.3 Production Environment
- **Purpose:** Deploy only thoroughly tested and validated configuration changes to production, minimizing risk.
- **Deployment:** The same assembled `kong.yml` is deployed to production. No live reload or Admin API POSTs are performed in production.

## 4. GitOps Workflow
- **Repository:** All Kong configuration files reside in a dedicated `kong-gateway` GitLab repository (main branch).
- **Merge Requests:**
    - On MR creation to `main`, a pipeline assembles the modular config into a single `kong.yml` and deploys it to preproduction (manual activation required).
    - On merge to `main`, the assembled `kong.yml` is deployed to production (approval policy to be clarified).

## 5. Validation and Testing
- **Automated Validation:** All configuration changes are validated using `kong config parse kong.yml` in CI before deployment to preprod or prod.
- **Integration Testing:** Optionally, integration tests can be run against the local or preprod Kong instance to ensure new routes, services, and plugins work as expected.

## 6. Rollback Strategy
- **Process:** Rollback is performed by reverting to a previous commit in the `main` branch and redeploying using the pipeline if a deployment causes issues.

## 7. Configuration Management
- **Declarative, DB-less:** Kong is run in DB-less mode, with all configuration managed via version-controlled files.
- **Environment-Specific Configuration:** There will be no environment-specific configuration support, aside from minor ConfigMap changes.
- **Secret Management:** Sensitive values (API keys, credentials) are referenced from environment variables or Kubernetes secrets, not stored directly in `kong.yml`.
- **Plugin Management:** If custom plugins are needed, their build, versioning, and deployment will be documented as part of the workflow.
- **decK Usage:** decK is used for two purposes only:
    1. Local live updates (Admin API POST) for rapid feedback during development.
    2. Assembling a single `kong.yml` from modular files for deployment to preprod and prod. No live reload or Admin API POSTs are performed in preprod or prod.

## 8. Documentation and Onboarding
- A comprehensive "Getting Started" guide or section will be provided for onboarding new team members, covering local setup, Tilt usage, and contribution guidelines.

## 9. Monitoring and Observability
- Health checks, logging, and monitoring will be considered for Kong in each environment to ensure reliability and observability. 