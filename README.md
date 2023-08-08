# Bitespeed Identity Reconciliation

The Bitespeed Identity Reconciliation web service helps identify and consolidate customer identities across multiple purchases on FluxKart.com.

## Overview

The Bitespeed Identity Reconciliation web service allows the consolidation of customer contact information from multiple purchases, linking primary and secondary contacts, and providing a personalized customer experience.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoint](#api-endpoint)

## Prerequisites

Before using this web service, ensure that you have the following prerequisites installed:

- Node.js (v14 or higher)
- PostgreSQL database (with correct credentials)

## Installation

```sh
git clone https://github.com/your-username/bitespeed-identity-reconciliation.git
cd bitespeed-identity-reconciliation
npm install
```

## Usage

1. Configure the PostgreSQL database connection in <code>src/app.ts</code> by updating the following line:

   ```typescript
   export const sequelize = new Sequelize("<db_name>", "your_db_user", "your_db_password", {
     host: "localhost",
     dialect: "postgres",
     port: 5432,
   });
   ```

To compile TypeScript files into JavaScript, run the "build" script
```bash
npm run build
```

start application using the "start" script
```bash
npm start
```

## API Endpoint

/identify (POST)

Request

```json
{
  "email": "customer@gmail.com",
  "phoneNumber": "123456789"
}
```

Response
```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["customer@gmail.com"],
    "phoneNumbers": ["123456789"],
    "secondaryContactIds": [2, 3]
  }
}
```

