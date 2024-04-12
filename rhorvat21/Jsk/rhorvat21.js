document.addEventListener('DOMContentLoaded', function() {
const cjenikTablica = document.getElementById('cjenik');

cjenikTablica.addEventListener('mouseover', prikaziCijeluTablicu);
cjenikTablica.addEventListener('mouseout', sakrijCijeluTablicu);

function prikaziCijeluTablicu() {
  if (window.innerWidth <= 480) {
    cjenikTablica.classList.remove("klasaTablice");
  }
}

function sakrijCijeluTablicu() {
  cjenikTablica.classList.remove('prikazi-sve-stupce');
}

  });


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('forma_sobe');
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    form.appendChild(errorMessage);
  

    const timeInput = form.querySelector('input[type="time"]');
    timeInput.disabled = true;
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      if (validateForm()) {

        form.submit();
      } else {
        const label = form.querySelector(`label[for="${input.id}"]`).textContent;
        errorMessage.push(`Please enter a valid value for ${label}`);
        input.classList.add('error-field');
      }
    });
  
    function validateForm() {
      const inputs = form.querySelectorAll('input, select');
      let isValid = true;
      let errorMessages = [];
  
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        const isValidInput = validateInput(input);
  
        if (!isValidInput) {
          isValid = false;
          const label = form.querySelector(`label[for="${input.id}"]`).textContent;
          errorMessages.push(`Unesite ispravnu vrijednost za "${label}"`);
          input.classList.add('error-field');
        } else {
          input.classList.remove('error-field');
        }
      }
  
      if (!isValid) {
        displayErrorMessage(errorMessages);
      } else {
        hideErrorMessage();
      }
  
      return isValid;
    }
  
    function validateInput(input) {
      const value = input.value.trim();
      const type = input.getAttribute('type');
  
      if (input.required && value === '') {
        return false;
      }
  
      if (type === 'text') {
        const pattern = /^[A-Za-z\s]*$/;
        return pattern.test(value);
      }
  
      if (type === 'tel') {
        const pattern = /^\d+$/; 
        return pattern.test(value);
      }
  
      if (type === 'number') {
        return !isNaN(value);
      }
  
      if (type === 'date') {
        const selectedDate = new Date(value);
        const currentDate = new Date();
  
        const isValidDate = selectedDate >= currentDate;
  
        const timeInput = form.querySelector('input[type="time"]');
        timeInput.disabled = !isValidDate;
  
        return isValidDate;
      }
  
      return true;
    }
  
    function displayErrorMessage(messages) {
      errorMessage.innerHTML = messages.join('<br>');
      errorMessage.style.display = 'block';
    }
  
    function hideErrorMessage() {
      errorMessage.style.display = 'none';
    }
  
    form.addEventListener('focusout', function(event) {
      const input = event.target;
      validateInput(input);
    });
  
    errorMessage.addEventListener('click', function() {
      hideErrorMessage();
    });
  });



document.addEventListener('DOMContentLoaded', function() {
try{
  let an1 = document.getElementById("rotacija");
  an1.addEventListener("click", AnimacijaRotacije);
  let an2 = document.getElementById("iksa");
  an2.addEventListener("mouseover", AnimacijeScale);
  let an3 = document.getElementById("Move");
  an3.addEventListener("click", AnimacijaMove);
}catch(err){}


var rotacija = 0;
var scale = 0;
var move = 0;
function AnimacijaRotacije()
{
  rotacija++;
  document.getElementById("rotacija").style.transform = "rotate(" + rotacija + "deg)";
  setTimeout(AnimacijaRotacije, 50);
}
function AnimacijeScale()
{
  var scaleFor= 0.03;
  if(scale > 0.1 && scaleFor > 0){ scaleFor = 0; }
  if(scale < 1.3){ scaleFor = 0.02; }
  scale += scaleFor;
  document.getElementById("iksa").style.transform = "scale(" + scale + ")";
  setTimeout(AnimacijeScale, 100);
}
function AnimacijaMove()
{
  var moveFor = 1;

  document.getElementById("Move").style.transform = "translateX(" + move + "%)";

  move += moveFor;

  setTimeout(AnimacijaMove, 1);
}});