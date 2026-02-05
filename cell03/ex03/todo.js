const ft_list = document.getElementById('ft_list');
const newBtn = document.getElementById('newBtn');


window.onload = function() {
    const cookieData = getCookie("ft_list");
    if (cookieData) {
        const todos = JSON.parse(cookieData);
        todos.reverse().forEach(todoText => {
            createTodo(todoText);
        });
    }
};

newBtn.addEventListener('click', () => {
    const text = prompt("Please enter a new TO DO:");
    if (text && text.trim() !== "") {
        createTodo(text);
        saveToCookie();
    }
});

function createTodo(text) {
    const div = document.createElement('div');
    div.className = 'todo-item';
    div.textContent = text;

    div.onclick = function() {
        if (confirm("Do you really want to delete this task?")) {
            div.remove();
            saveToCookie();
        }
    };

    ft_list.prepend(div);
}

function saveToCookie() {
    const todos = [];
    const children = ft_list.children;
    for (let i = 0; i < children.length; i++) {
        todos.push(children[i].textContent);
    }
    const jsonStr = JSON.stringify(todos);
    const d = new Date();
    d.setTime(d.getTime() + (365*24*60*60*1000));
    const expires = "expires=" + d.toUTCString();
    
    document.cookie = "ft_list=" + encodeURIComponent(jsonStr) + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
    }
    return null;
}