let projects = document.getElementsByClassName('project');
let main = document.getElementsByTagName('main');
let selectedProjectElement = undefined;

function preview(index) {
    if (main[0].classList.contains('project-view')) {
        return;
    }

    if (selectedProjectElement != undefined) {
        selectedProjectElement.classList.remove('show');
    }

    if (index < 0 || index >= projects.length) {
        selectedProjectElement = undefined;
    } else {
        selectedProjectElement = projects[index];
        selectedProjectElement.classList.add('show');
    }
}

function view() {
    main[0].classList.add('project-view');
    selectedProjectElement.classList.add('project-view');
}