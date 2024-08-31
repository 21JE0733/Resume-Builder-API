# Resume Builder API using NodeJS
This project aims to create a Resume Builder API that uses the Adobe Document Generation API to dynamically create PDF resumes from DOCX based templates

## Description
A Resume Builder API is a tool that allows users to create professional resumes quickly and easily. The API uses pre-built templates and dynamically generates the resume content based on the user's input data, such as personal information, skills, experiences, and education. This reduces the manual effort required to create and format a resume. 

## Prerequisites
The sample application has the following requirements:
* Node.js : Version 14.0 or above. Node installation instructions can be found 
[here](https://nodejs.org/en/download/).

## Authentication Setup

The credentials file for the project is `pdfservices-api-credentials.json`. For running this project, replace `pdfservices-api-credentials.json` file in the `config/` directory from the downloaded zip file at the end of creation of credentials via Get Started [Get Started](https://www.adobe.io/apis/documentcloud/dcsdk/gettingstarted.html?ref=getStartedWithServicesSdk) workflow.

## Build with npm

Run the following command to build the project.
```$xslt
npm init -y
```

Install the Adobe PDF Services Node.js SDK by typing following command.
```$xslt
npm install @adobe/pdfservices-node-sdk
```

Install express and cors libraries as dependencies using following command.

```$xslt
npm install express cors
```

## Running the Project

The following sub-sections describe how to run the project. First check that the configuration file is set up as described above and that the project has been built.
The code is available under the `src` folder. The `src` folder has two main child folders, `client` for client side codes and `server` for server side codes.
Test docs templates used by the project can be found in the `src/template` folder. When executed, it creates output file `resume.pdf` in the project root directory.

### Server Side

To start the server at the backend, use the following command from the root directory in the CLI.

```$xslt
node src/server/server.js
```

NOTE: Once the user will hit the created Resume Builder API (either through web browser or curl command), this API will perform the required json data mapping and will internally hit the Adobe Document Generation API to generate the resume.

### Client Side

- Open website via `index.html` file from the path `/src/client/index.html` in the browser.
- The user will choose one of the resume template and then will input data, such as personal information, skills, education, etc. 
- Click on the submit button after providing all the details.
- Wait for around 10 seconds until the pdf generation is in process.
- There will be an Alert for allowing pop up in your browser to view the resume. 
- Now you can view the generated resume in pdf format and download it as well.

NOTE: The `resume.pdf` will be auto downloaded in root directory as well.

### Error Handling

* 400 - Bad Request
  - The request object sent from the client side is incorrect (syntax error in json keys, missing json object, etc.).
  - The `Content-type` is not specified in the request header correctly.

* 401 - Unauthorized
  - The creadentials (i.e. `client_id` or `client_secret`) for Adobe Document Generation API is not set correctly.
 
* 404 - Template Not Found
  - Value of `template_id` key is incorrect in the request object.
  - Key `template_id` is missing in the request object.

* 500 - Internal Server Errror
  - There is any error on the server side while sending response to the Client.
  - An error occurred while sending request to the Adobe Document Generation API, etc.
  

NOTE: Rest of the errors will be caugth by catch block and Alert message will be displayed in the dialogue box.

### Licensing

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more information
