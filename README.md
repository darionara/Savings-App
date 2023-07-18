# About the project
The project was created as a part of the React Challenge v2 conducted by Dare IT - an organization supporting women to start career in the IT industry :cherry_blossom:

Saving App is an application enabling users to control their home budgets. It provides inputs for by adding incomes and spendings on their daily basis and visualize the balance between them, using charts.

The goal of the challenge was to create a react app using some popular libraries, workshops, design and testing tools and communicate with the server using REST API.

<img src='client/public/ledger.png' >

## Built with
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)][React-url]
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
[![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)][React-Query-url]
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)][React-Router-url]
[![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)][React-Hook-Form-url]
[![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)][MUI-url]
[![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)][Storybook-url]
[![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)][ChartJS-url]
[![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)][Cypress-url]
[![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)][Swagger-url]
[![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)][VSC-url]
[![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)][Figma-url]
[![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)][Git-url]


# Getting started

## Installation of npm packages

From the root of the react-challenge repository, launch a terminal and then run the following command

        npm i

⏳ installation may took some time ⏳

Pay attention to `[install:client]` and `[install:server]`, two applications are being installed at the same time - the client, where tasks will be performed, and the server, which will supply the front-end application with data.


## 🏃 Launching the application

### 🔗 Client and Server always together

The repository is constructed in such a way that the client application and the server application are run simultaneously. This is required because one without the other will not function properly.

From the root of your repository, launch a terminal and execute the command:

        npm run start

This command will launch 2 applications which will be available at the following addresses:
- client - front-end application - http://localhost:3000
- server - back-end application - http://localhost:4320
    - API documentation is available at http://localhost:4320/swagger

### Storybook

Storybook is for working on components in isolation. If you want to make changes to the appearance or functioning of individual components, you must edit the corresponding files in the `client/src/ui` directory.

To run the storybook, run the following command from the root of your repository:

        npm run storybook


This command will launch the Storybook application, which will be available at http://localhost:6006

## 🏃 Starting automatic tests

To run the tests, start the client and the server as before, run the command from the root directory:

        npm run cypress:open

This command will launch the Cypress panel where you can run all or selected tests.

# FAQ

## How to add new npm package?
Launch a terminal, go to the `/client` directory and type `npm i :package-name`


<!-- MARKDOWN LINKS & IMAGES -->

[React-url]: https://reactjs.org/
[React-Query-url]: https://tanstack.com/query/v3/
[React-Router-url]: https://reactrouter.com/en/main
[React-Hook-Form-url]: https://react-hook-form.com/
[MUI-url]: https://mui.com/material-ui/
[Storybook-url]: https://storybook.js.org/
[ChartJS-url]: https://react-chartjs-2.js.org/
[Cypress-url]: https://www.cypress.io/
[Swagger-url]: https://swagger.io/tools/swagger-ui/
[VSC-url]: https://code.visualstudio.com/
[Figma-url]: https://www.figma.com/
[Git-url]: https://git-scm.com/
