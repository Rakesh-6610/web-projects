const MAILCHIMP_API_KEY = "f1b04cc670f762dedae2337d926ea3db-us9";
const MAILCHIMP_SERVER_PREFIX = "us9";
const MAILCHIMP_LIST_ID = "3126c4f861";


console.log("hello");

document.querySelector(".submit").addEventListener("click", () => {
    const firstName = document.querySelector("input[name='firstName']").value;
    const lastName = document.querySelector("input[name='lastName']").value;
    const facebookLink = document.querySelector("input[name='facebookLink']").value;
    const email = document.querySelector("input[name='email']").value;
    const phoneNumber = document.querySelector("input[name='phoneNumber']").value;

    const subscriber = {
        email_address: email,
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
            FBLINK: facebookLink,
            PHONE: phoneNumber
        }
    }

    const subscriberHash = CryptoJS.MD5(subscriber.email_address.toLowerCase()).toString();

    fetch(`https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${subscriberHash}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Basic ${btoa('subscriber' + MAILCHIMP_API_KEY)}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscriber)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'subscribed') {
            console.log('Subscriber added successfully:', data);
        } else {
            console.error('Error adding subscriber:', data);
        }
    })
    .catch(error => console.error('Error:', error));

})