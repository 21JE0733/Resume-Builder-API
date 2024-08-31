const form = document.getElementById('myForm');

// Function to be called on the click of submit button.
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Create an object from form entries with all key-value pairs.
    const formData = new FormData(form);
    const tempObject = Object.fromEntries(formData);
    tempObject.skills = formData.getAll('skills');
    tempObject.school_name = formData.getAll('school_name');
    tempObject.passing_year = formData.getAll('passing_year');
    tempObject.description = formData.getAll('description');
    tempObject.company_name = formData.getAll('company_name');
    tempObject.responsibilities = formData.getAll('responsibilities');
    tempObject.field = formData.getAll('field');
    tempObject.awards = formData.getAll('awards');

    // Call function getNewObject() to map key-value pairs in the required format of Resume Builder API.
    const newObject = getNewObject(tempObject);

    // Disable the form and add the spinner.
    const bg = document.getElementById('bg');
    bg.classList.add('spin');
    form.firstElementChild.disabled=true;
    form.classList.add('fade');
    bg.firstElementChild.classList.add('fade');

    // Call fetch function to hit the Resume Builder API.
    const url = 'http://localhost:3000/resume';
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/pdf",
        },
        body: JSON.stringify(newObject),
    };
    fetch(url, fetchOptions)

    // Display generated resume or error(if any).
    .then( res => res.blob())
    .then( blob => {
        bg.classList.remove('spin');
        form.firstElementChild.disabled=false;
        form.classList.remove('fade');
        bg.firstElementChild.classList.remove('fade');
        var file = window.URL.createObjectURL(blob);
        if(window.open(file)==null){
            alert('PopUp blocked by the browser\nPlease allow PopUp!')
        }  
    })
    .catch(error => {
        bg.classList.remove('spin');
        form.firstElementChild.disabled=false;
        form.classList.remove('fade');
        bg.firstElementChild.classList.remove('fade');
        alert('Caught ' + error);
    });
    
});

// Function to map key-value pairs in the required format of Resume Builder API.
function getNewObject(tempObject) {
    const personal_information = {
        name: tempObject.name,
        last_name: tempObject.last_name,
        email_address: tempObject.email_address,
        phone_number: tempObject.phone_number,
        linkedin_url: tempObject.linkedin_url
    };
    const education = [];
    for(let i=0; i<tempObject.school_name.length; i++) {
        const temp = {
            school_name: tempObject.school_name[i],
            passing_year: tempObject.passing_year[i],
            description: tempObject.description[i]
        };
        education.push(temp);
    }
    const experience = [];
    for(let i=0; i<tempObject.company_name.length; i++) {
        const temp = {
            company_name: tempObject.company_name[i],
            passing_year: tempObject.passing_year[tempObject.school_name.length+i],
            responsibilities: tempObject.responsibilities[i]
        };
        experience.push(temp);
    }
    const achievements = [];
    for(let i=0; i<tempObject.field.length; i++) {
        const temp = {
            field: tempObject.field[i],
            awards: tempObject.awards[i]
        };
        achievements.push(temp);
    }

    const newObject = {
        template_id: tempObject.template_id,
        personal_information: personal_information,
        job_title: tempObject.job_title,
        career_objective: tempObject.career_objective,
        skills: tempObject.skills,
        education: education,
        experience: experience,
        achievements: achievements
    };

    return newObject;
}