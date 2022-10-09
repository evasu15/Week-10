class Member {
    constructor(name, membership) {
        this.name = name;
        this.membership = membership;
    }
}

class Membership {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.members = []
    }

    addMember(member) {
        this.members.push(member);
    }

    deleteMember(member) {
        let index = this.members.indexOf(member)
        this.members.splice(index, 1)
    }
}

let teams = []
let teamId = 0

onClick('new-team', () => {
    teams.push(new Membership(teamId++, getValue('new-team-name')));
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let teamDiv = document.getElementById('teams');
    clearElement(teamDiv);
    for (team of teams) {
        let table = creatTeamTable(team);
        let title = document.createElement('h2');
        title.innerHTML = team.name;
        title.appendChild(createDeleteTeamButton(team));
        teamDiv.appendChild(title);
        teamDiv.appendChild(table);
        for (member of team.members) {
            createMemberRow(team, table, member);
        }
    }
}

function createMemberRow(team, table, member) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = member.name;
    row.insertCell(1).innerHTML = member.membership;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(team, member));
}

function createDeleteRowButton(team, number) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = team.members.indexOf(member);
        team.members.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteTeamButton(team) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Membership';
    btn.onclick = () => {
        let index = teams.indexOf(team);
        teams.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewMemberButton(team) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        team.members. push(new Member(getValue(`name-input-${team.id}`), getValue(`membership-input-${team.id}`)));
        drawDOM();
    };
    return btn;
}

function creatTeamTable(){
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let membershipColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    membershipColumn.innerHTML = 'Membership';
    row.appendChild(nameColumn);
    row.appendChild(membershipColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let membershipTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('Input');
    nameInput.setAttribute('id', `name-input-${team.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let membershipInput = document.createElement('Input');
    membershipInput.setAttribute('id', `membership-input-${team.id}`);
    membershipInput.setAttribute('type', 'text');
    membershipInput.setAttribute('class', 'form-control');
    let newMemberButton = createNewMemberButton(team);
    nameTh.appendChild(nameInput);
   membershipTh.appendChild(membershipInput);
    createTh.appendChild(newMemberButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(membershipTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

