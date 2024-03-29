# Jelly Widgets
This project was used to get familiar with Azure and AKS when starting a new role. The idea was to build upon a blog post I made a _long_ time ago: https://whatibroke.com/2013/07/24/tfn-generator/

The blog post provided viewers with a tax file number generator that seems to have become pretty popular with business analysts in Australia and NZ. This project's intent was to provide users with customisable dashboards which could each hold any number of "widgets" to generate test data. Payments are handled using Stripe.

## Provided widgets
- Australian Business Number Generator
- Australian Business Number Validator
- Australian Company Number Generator
- Australian Company Number Validator
- Australian Medicare Number Generator
- Australian Medicare Number Validator
- Australian Tax File Number Generator
- Australian Tax File Number Validator
- New Zealand IRD Generator
- New Zealand IRD Validator

## Architecture
https://miro.com/app/board/o9J_lDVjzL8=/
![image](https://user-images.githubusercontent.com/27006526/119087869-21f5c300-ba4b-11eb-9146-49ebd5763908.png)

### Technology Used

#### Front End
- ReactJS
- TypeScript
- Stripe (payments)
- Redux
- Azure MSAL
- Material UI
- Yup/Formik
- ADB2C (authentication)
- Static storage/CDN

#### Backend
- C#/.NET Core
- gRPC
- Stripe (payments)
- PostgreSQL
- MongoDB
- Docker
- Entity Framework
- ADB2C  (authentication)

#### Infrastructure
- Azure DevOps Pipelines
- AKS
- Key Vaults
- Bicep
- Virtual Machines x 2
- Azure Container Registry

## Screenshots of app
The SPA is built with ReactJS, Redux and TypeScript. It does not currently have any branding but the styling is heavily inspired by Slack.

### Login page
![image](https://user-images.githubusercontent.com/27006526/119087423-764c7300-ba4a-11eb-8368-a71c267a337b.png)

### Loader
![image](https://user-images.githubusercontent.com/27006526/119119475-91c97500-ba6e-11eb-96d7-d534bafcbc26.png)

### Tours
![image](https://user-images.githubusercontent.com/27006526/119119545-a148be00-ba6e-11eb-8df4-953368176127.png)

### Forms
![image](https://user-images.githubusercontent.com/27006526/119119803-e53bc300-ba6e-11eb-84d4-d18ee978c3b3.png)

## State
Currently on hold while I investigate other tech that has become more relevant.

## Remaining work
- Finish deployment to AKS
- Apply branding to SPA
- Setup testing


