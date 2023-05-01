const form = document.querySelector('.email-form');
const firstName = document.querySelector('.form-firstname');
const surName = document.querySelector('.form-surname');
const email = document.querySelector('.form-email');
const button = document.querySelector('.form-button');
const errorMessage = document.querySelector('.email-error-message')

let user = {
    firstname: '',
    surname: '',
    email: '',
}

const handleFirstName = (e) => {
    e.preventDefault();
    user.firstname = e.target.value
}
const handleSurname = (e) => {
    e.preventDefault();
    user.surname = e.target.value
}
const handleEmail = (e) => {
    e.preventDefault();
    user.email = e.target.value;
}

const isEmailValid = async (email) => {
    const res = await fetch (`https://webservices.data-8.co.uk/EmailValidation/IsValid.json?key=NHWE-QAUR-DUI4-S3S6`,
    {method: 'POST',
    body: JSON.stringify(
        {
            "email": `${email}`,
            "level": "Address",
          }
    )
    });
    const data = await res.json();
    return data;
}

const checkEmail = async (e) => {
    errorMessage.textContent = '';
    e.preventDefault()
    const res = await isEmailValid(user.email)
    if (res.Result === 'Valid'){
        // form submit here
        console.log("Valid")
       firstName.value = ''
       surName.value = ''
       email.value = ''
    } else {
        console.log("InValid")
        errorMessage.textContent = 'Please enter a valid email address'
    }
}

firstName.addEventListener('change', handleFirstName);
surName.addEventListener('change', handleSurname);
email.addEventListener('change', handleEmail);
button.addEventListener('click', checkEmail);