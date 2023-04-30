const form = document.querySelector('.email-form');
const firstName = document.querySelector('.form-firstname');
const surName = document.querySelector('.form-surname');
const email = document.querySelector('.form-email');
const button = document.querySelector('.form-button');
const errorMessage = document.querySelector('.email-error-message')

let userEmail = '';

const handleFirstName = (e) => {
    e.preventDefault();
}
const handleSurname = (e) => {
    e.preventDefault();
}
const handleEmail = (e) => {
    e.preventDefault();
    userEmail = e.target.value;
}

const isEmailValid = async (email) => {
    const res = await fetch ('https://webservices.data-8.co.uk/EmailValidation/IsValid.json?key=',
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
    console.log(e.target)
    const res = await isEmailValid(userEmail)
    if (res.Result === 'Valid'){
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