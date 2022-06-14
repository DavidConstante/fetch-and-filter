
const $input = document.querySelector('#input')
const $olUsers = document.querySelector('#olUsers')

let searchName;
let names;


window.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchUsers();
    const users = data.data
    names = getNames(users);
    renderUsers(names)
})


$input.addEventListener('keyup', (e) => {
    searchName = (e.target.value).toUpperCase();;

    const similarNames = names.filter((name) => {
        return name.toUpperCase().includes(searchName)
    })
    renderUsers(similarNames)
})


const renderUsers = (names) => {
    const listItems = createUseritems(names)
    $olUsers.innerHTML = listItems
}

const getNames = (users) => {
    let names = []

    for (const user of users) {
        const name = `${user.firstname} ${user.lastname}`
        names.push(name)
    }

    return names
}

const createUseritems = (names) => names.map(name => `<li>${name} </li> `).join(' ')


const fetchUsers = async () => {
    const rta = await fetch('https://fakerapi.it/api/v1/users?_quantity=1000&_gender=male')
    const data = rta.json()
    return data;
}
