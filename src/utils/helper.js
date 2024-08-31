// Function to create an input element with given attributes.
function inputNode(type,name,id,placeholder,autofocus,required) {
    var input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.id = id;
    input.placeholder = placeholder;
    input.autofocus = autofocus;
    input.required = required;

    return input;
}

// Function to create a button element with given attributes.
function buttonNode(type,id,textContent) {
    var deleteBtn = document.createElement("button");
    deleteBtn.type = type;
    deleteBtn.id = id;
    deleteBtn.textContent = textContent;

    return deleteBtn;
}

// Function to add a new Skill input field.
function addSkill() {
    var container = document.getElementById("skills_div");
    var div = document.createElement("div");
    div.classList.add("skill_1");

    var input = inputNode("text","skills","skills","",false,true);
    var deleteBtn = buttonNode("button","skill_del","Delete");
    deleteBtn.onclick = function() {
        removeSkill(this);
    };
    
    div.appendChild(document.createElement("br"));
    div.appendChild(input);
    div.appendChild(deleteBtn);

    container.appendChild(div);
}

// Function to delete a particular Skill field.
function removeSkill(button) {
    var div = button.parentNode;
    div.parentNode.removeChild(div);  
}

// Function to add a new Education input field.
function addEducation() {
    var container = document.getElementById("education_div");
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var div = document.createElement("div");
    div1.classList.add("edu");
    div2.classList.add("edu");
    
    var input1 = inputNode("text","school_name","school_name","School Name",true,true);
    var input2 = inputNode("text","passing_year","passing_year","Passing Year",true,true);
    var input3 = inputNode("text","description","desc","Description",true,true);
    var deleteBtn = buttonNode("button","edu_del","Delete");
    deleteBtn.onclick = function() {
        removeEducation(this);
    };

    div1.appendChild(input1);
    div1.appendChild(document.createElement("br"));
    div1.appendChild(input2);
    div2.appendChild(input3);
    div2.appendChild(document.createElement("br"));
    div2.appendChild(deleteBtn);

    div.appendChild(document.createElement("br"));
    div.appendChild(div1);
    div.appendChild(div2);

    container.appendChild(div);
}

// Function to delete a particular Education field.
function removeEducation(button) {
    var div = button.parentNode;
    div = div.parentNode;
    div.parentNode.removeChild(div);
}

// Function to add a new Experience input field.
function addExperience() {
    var container = document.getElementById("experience_div");
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var div = document.createElement("div");
    div1.classList.add("exp");
    div2.classList.add("exp");

    var input1 = inputNode("text","company_name","company_name","Company Name",true,true);
    var input2 = inputNode("text","passing_year","passing_year","Passing Year",true,true);
    var input3 = inputNode("text","responsibilities","res","Responsibilities",true,true);
    var deleteBtn = buttonNode("button","exp_del","Delete");
    deleteBtn.onclick = function() {
        removeExperience(this);
    };

    div1.appendChild(input1);
    div1.appendChild(document.createElement("br"));
    div1.appendChild(input2);
    div2.appendChild(input3);
    div2.appendChild(document.createElement("br"));
    div2.appendChild(deleteBtn);

    div.appendChild(document.createElement("br"));
    div.appendChild(div1);
    div.appendChild(div2);

    container.appendChild(div);
}

// Function to delete a particular Experience field.
function removeExperience(button) {
    var div = button.parentNode;
    div = div.parentNode;
    div.parentNode.removeChild(div);
}

// Function to add a new Achievement input field.
function addAchievement() {
    var container = document.getElementById("achievements_div");
    var div = document.createElement("div");
    div.classList.add("ach");

    var input1 = inputNode("text","field","field","Field",true,true);
    var input2 = inputNode("text","awards","awards","Awards",true,true);
    var deleteBtn = buttonNode("button","ach_del","Delete");
    deleteBtn.onclick = function() {
        removeAchievement(this);
    };

    div.appendChild(document.createElement("br"));
    div.appendChild(input1);
    div.appendChild(document.createElement("br"));
    div.appendChild(input2);
    div.appendChild(deleteBtn);

    container.appendChild(div);
}

// Function to delete a particular Achievement field.
function removeAchievement(button) {
    var div = button.parentNode;
    div.parentNode.removeChild(div);
}