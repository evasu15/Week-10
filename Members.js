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

let memberships = []
let membershipId = 0

onClick('new-membership', () => {
    memberships.push(new Membership(membershipId++, getValue('new-membership-name')));
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
    let membershipDiv = document.getElementById('memberships');
    clearElement(membershipDiv);
    for (membership of memberships) {
        let table = creatMembershipTable(membership);
        let title = document.createElement('h2');
        title.innerHTML = membership.name;
        title.appendChild(createDeleteMembershipButton(membership));
        membershipDiv.appendChild(title);
        membershipDiv.appendChild(table);
        for (member of membership.members) {
            createMemberRow(membership, table, member);
        }
    }
}

function createMemberRow(membership, table, member) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = member.name;
    row.insertCell(1).innerHTML = member.membership;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(membership, member));
}

function createDeleteRowButton(membership, number) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = membership.members.indexOf(member);
        membership.members.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteMembershipButton(membership) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Membership';
    btn.onclick = () => {
        let index = memberships.indexOf(membership);
        memberships.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewMemberButton(membership) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        membership.members. push(new Member(getValue(`name-input-${membership.id}`), getValue(`membership-input-${membership.id}`)));
        drawDOM();
    };
    return btn;
}

function creatMembershipTable(){
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
    nameInput.setAttribute('id', `name-input-${membership.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let membershipInput = document.createElement('Input');
    membershipInput.setAttribute('id', `membership-input-${membership.id}`);
    membershipInput.setAttribute('type', 'text');
    membershipInput.setAttribute('class', 'form-control');
    let newMemberButton = createNewMemberButton(membership);
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

