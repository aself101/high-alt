/* Helper functions */
export function reset() {
  document.getElementById("userName").value = "";
  document.getElementById("hireDate").value = "";
  document.getElementById("physicalDate").value = "";
  document.getElementById("birthDate").value = "";
}

// Sets the value of the TO BE DELETED user after clicking a slot on the autocomplete list
export function setValue(e) {
  let toDelete = e.target.id;
  document.getElementById('userDelete').value = toDelete;
  return;
}

// Lowercase
export function lc (x) { return x.toLowerCase() }

// Compute age  **Deprecated
export function computeAge(id) {
  // Current date info
  let today = new Date();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let date = today.getDate();

  // Birthdate info
  try {
    let b = document.getElementById(id).value;
    let birthDate = new Date(b);
    let age = today.getFullYear() - birthdate.getFullYear();

    let m = today.getMonth() - birthdate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }

    return age;

  } catch (e) {}
}

export function computeNextPhysical(age, id) {
  let dPhysical = document.getElementById(id).value;
  dPhysical = dPhysical.split('-');

  const dYear = parseInt(dPhysical[0]);
  const dMonth = dPhysical[1];
  const dDate = dPhysical[2];

  let nextPhysicalYear = 0;
  let nextDate;

  switch (true) {
    case (age <= 30):
      nextPhysicalYear = dYear + 5;
      nextDate = nextPhysicalYear + '-' + dMonth + '-' + dDate;
      return nextDate;
      break;
    case (age > 30 && age <= 40):
      nextPhysicalYear = dYear + 3;
      nextDate = nextPhysicalYear + '-' + dMonth + '-' + dDate;
      return nextDate;
      break;
    case (age > 40 && age <= 50):
      nextPhysicalYear = dYear + 2;
      nextDate = nextPhysicalYear + '-' + dMonth + '-' + dDate;
      return nextDate;
      break;
    case (age > 50):
      nextPhysicalYear = dYear + 1;
      nextDate = nextPhysicalYear + '-' + dMonth + '-' + dDate;
      return nextDate;
      break;
    default:
      //console.log("How did you end up here");
      return;
  }
}

// Date Format YYYY-MM-DD
/*
export function computeAge_test(date) {
  if (date === '') return;
  // Current date info
  let d = new Date();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  let date = d.getDate();

  // Birthdate info
  try {
    let b = document.getElementById(id).value;
    b = b.split('-');
    let bYear = parseInt(b[0]);
    let bMonth = parseInt(b[1]);
    let bDate = parseInt(b[2]);

    let age = year - bYear - 1;
    let dec = Math.abs(month - bMonth);

    if (month > bMonth && date > bDate) {
      age++;
    } else if (month === bMonth && date === bDate) {
      age++;
    }

    return age;

  } catch (e) {}
}
*/



















/* END */
