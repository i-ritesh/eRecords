let name = document.getElementById('name')
let employeeID = document.getElementById('employeeID')
let department = document.getElementById('department')
let exp = document.getElementById('exp')
let email = document.getElementById('email')
let mbl = document.getElementById('mbl')
let btn = document.getElementById('btn')
let tbody = document.querySelector('tbody')

const storedData = JSON.parse(localStorage.getItem('employeeData')) || []

storedData.forEach(data => {
  const { name, employeeID, department, exp, email, mbl, newExp } = data
  const newRow = document.createElement('tr')
  newRow.innerHTML = `
    <td>${name}</td>
    <td>${employeeID}</td>
    <td>${department}</td>
    <td>${exp}</td>
    <td>${email}</td>
    <td>${mbl}</td>
    <td>${newExp}</td>
    <td><button class="removeBtn">Remove</button></td>
  `
  tbody.appendChild(newRow)
})

btn.addEventListener('click', (e) => {
  e.preventDefault()

  if (name.value && employeeID.value && department.value && exp.value && email.value && mbl.value) {
    let newExpText = ""
    if (exp.value > 5) {
      newExpText = "Senior"
    } else if (exp.value > 2 && exp.value <= 5) {
      newExpText = "Junior"
    } else if (exp.value <= 1) {
      newExpText = "Fresher"
    }

    const newRow = document.createElement('tr')
    newRow.innerHTML = `
      <td>${name.value}</td>
      <td>${employeeID.value}</td>
      <td>${department.value}</td>
      <td>${exp.value}</td>
      <td>${email.value}</td>
      <td>${mbl.value}</td>
      <td>${newExpText}</td>
      <td><button class="removeBtn">Remove</button></td>
    `

    const removeButton = newRow.querySelector('.removeBtn')
    removeButton.addEventListener('click', () => {
      newRow.remove()
      const index = storedData.findIndex(data => data.employeeID === employeeID.value)
      if (index !== -1) {
        storedData.splice(index, 1)
        localStorage.setItem('employeeData', JSON.stringify(storedData))
      }
    })

    tbody.appendChild(newRow)

    const newData = {
      name: name.value,
      employeeID: employeeID.value,
      department: department.value,
      exp: exp.value,
      email: email.value,
      mbl: mbl.value,
      newExp: newExpText
    }
    storedData.push(newData)
    localStorage.setItem('employeeData', JSON.stringify(storedData))

    name.value = ''
    employeeID.value = ''
    department.value = ''
    exp.value = ''
    email.value = ''
    mbl.value = ''
  }
})
