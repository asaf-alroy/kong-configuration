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
- **Workflow:** Developers can edit `kong.yml` locally and see changes reflected in a local Kubernetes cluster with live reload.

### 3.2 Preproduction Environment
- **Purpose:** Safely test and validate configuration changes against real services in a preproduction Kubernetes cluster.
- **Deployment:** Changes are deployed to preprod via a controlled pipeline after local validation.

### 3.3 Production Environment
- **Purpose:** Deploy only thoroughly tested and validated configuration changes to production, minimizing risk.
- **Deployment:** Changes are promoted to production only after successful preprod validation.

## 4. GitOps Workflow
- **Repository:** All Kong configuration files reside in a dedicated `kong-gateway` GitLab repository which would have a `main` branch.
- **Merge Requests:**
    - On MR creation to `main`, a pipeline deploys the new configuration to preproduction (manual activation required).
    - On merge to `main`, a pipeline deploys the configuration to production (approval policy to be clarified).

## 5. Validation and Testing
- **Automated Validation:** All configuration changes are validated using `kong config parse kong.yml` in CI before deployment to preprod or prod.

## 6. Rollback Strategy
- **Process:** Rollback is performed by reverting to a previous commit in the `main` branch and redeploying using the pipeline if a deployment causes issues.

## 7. Configuration Management
- **Declarative, DB-less:** Kong is run in DB-less mode, with all configuration managed via version-controlled files.
- **Environment-Specific Configuration:** There will be no environment-specific configuration support, aside from minor ConfigMap changes.
- **Plugin Management:** If custom plugins are needed, their build, versioning, and deployment will be documented as part of the workflow.

## 8. Documentation and Onboarding
- A comprehensive "Getting Started" guide or section will be provided for onboarding new team members, covering local setup, Tilt usage, and contribution guidelines.

## 9. Monitoring and Observability
- Health checks, logging, and monitoring will be considered for Kong in each environment to ensure reliability and observability.