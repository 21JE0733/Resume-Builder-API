// Import required libraries.
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const {
  ServicePrincipalCredentials,
  PDFServices,
  MimeType,
  DocumentMergeParams,
  OutputFormat,
  DocumentMergeJob,
  DocumentMergeResult,
  SDKError,
  ServiceUsageError,
  ServiceApiError
} = require("@adobe/pdfservices-node-sdk");
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;
const CREDENTIALS_FILE = './config/pdfservices-api-credentials.json';
const OUTPUT_PDF = './resume.pdf';

// Function to connect the server to port.
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Function to recieve client's request and send response or error(if any).
app.post('/resume', async (req, res) => {
  const newObject = req.body;

  // Call function getjsonObject() to map key-value pairs in the required format of Adobe Document Generation API.
  var jsonObject = {};
  try {
    jsonObject = getjsonObject(newObject);
  }
  catch(err) {
    let error= new Error (`400 Bad Request\n${err.message}`);
    error.statusCode =400;
    throw error;
  }

  if(Object.keys(jsonObject).length!=0) {
    // Call function getTemplate() to get the required template path.
    const TEMPLATE_FILE = getTemplate(newObject.template_id);
    if(!fs.existsSync(TEMPLATE_FILE)) {
    let error= new Error (`404 Template Not Found`);
    error.statusCode =404;
    throw error;
    }
    else {
      // Call function generateResume() to hit the Adobe Document Generation API.
      try {
        await generateResume(TEMPLATE_FILE, jsonObject, res);
      }
      catch(err) {
        let error= new Error (`500 Internal Server Error\n${err.message}`);
        error.statusCode =500;
        throw error;
      }
      
    }

  }
});

// Function to map key-value pairs in the required format of Adobe Document Generation API.
function getjsonObject(newObject) {
  const Education = [];
  for(let i=0; i<newObject.education.length; i++) {
    const temp = {
      SchoolName: newObject.education[i].school_name,
      Year: newObject.education[i].passing_year,
      Description: newObject.education[i].description
    };
    Education.push(temp);
  }
  const Experience = [];
  for(let i=0; i<newObject.experience.length; i++) {
    const temp = {
      CompanyName: newObject.experience[i].company_name,
      Year: newObject.experience[i].passing_year,
      Description: newObject.experience[i].responsibilities
    };
    Experience.push(temp);
  }
  const Achievements = [];
  for(let i=0; i<newObject.achievements.length; i++) {
    const temp = {
      Type: newObject.achievements[i].field,
      Description: newObject.achievements[i].awards
    };
    Achievements.push(temp);
  }

  const jsonObject = {
    Name: newObject.personal_information.name,
    LastName: newObject.personal_information.last_name,
    EmailAddress: newObject.personal_information.email_address,
    PhoneNumber: newObject.personal_information.phone_number,
    LinkedIn: newObject.personal_information.linkedin_url,
    JobTitle: newObject.job_title,
    Summary: newObject.career_objective,
    Skills: newObject.skills,
    Education: Education,
    Experience: Experience,
    Achievements: Achievements
  };

  return jsonObject;
}

// Function to get the required template path.
function getTemplate(t_id) {
  switch (t_id) {
    case "1":
      return './src/templates/template1.docx';
    case "2":
      return './src/templates/template2.docx';
    case "3":
      return './src/templates/template3.docx';
    default:
      return "";  
  }
}

// Function to hit the Adobe Document Generation API.
async function generateResume(TEMPLATE_FILE , jsonObject, res) {

  let readStream;
  try{
    // If our OUTPUT_PDF already exists, remove it so we can run the application again.
  if(fs.existsSync(OUTPUT_PDF))
    fs.unlinkSync(OUTPUT_PDF);

  // Read the CREDENTIALS_FILE.
  var CREDENTIALS_INPUT = fs.readFileSync(CREDENTIALS_FILE);
  CREDENTIALS_INPUT = JSON.parse(CREDENTIALS_INPUT);

  // Create Credentials instance.
  const credentials = new ServicePrincipalCredentials({
    clientId : CREDENTIALS_INPUT.client_credentials.client_id,
    clientSecret : CREDENTIALS_INPUT.client_credentials.client_secret
  });

  // Create an ExecutionContext using credentials.
  const pdfServices = new PDFServices({credentials});

  readStream = fs.createReadStream(TEMPLATE_FILE);
  const inputAsset = await pdfServices.upload({
      readStream,
      mimeType: MimeType.DOCX
  });
const params = new DocumentMergeParams({
  jsonDataForMerge : jsonObject,
  outputFormat: OutputFormat.PDF
  });

  const job = new DocumentMergeJob({inputAsset, params});

  const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: DocumentMergeResult
        });

        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        const outputStream = fs.createWriteStream(OUTPUT_PDF);
        streamAsset.readStream.pipe(outputStream).on('finish', () => {
          var file = fs.createReadStream(OUTPUT_PDF);
        res.setHeader('Content-Type', 'application/pdf');
        file.pipe(res);
        }).on('error', (err) => {
          res.status(500);
          res.send(`Error: 500 Internal Server Error\n${err.message}`);
          console.log(`Error: 500 Internal Server Error\n${err.message}`);
        });
  } catch(err) {
    if (err instanceof SDKError || err instanceof ServiceApiError || err instanceof ServiceUsageError) {
          res.status(401);
          res.send(`Error: 401 Unauthorized\n${err.message}`);
          console.log(`Error: 401 Unauthorized\n${err.message}`);
        }
        else {
          res.status(500);
          res.send(`Error: 500 Internal Server Error\n${err.message}`);
          console.log(`Error: 500 Internal Server Error\n${err.message}`);
        }
  } finally {
    readStream?.destroy();
  }
}