let header = undefined;
let content = undefined;
let sidebar = undefined;
let projects = undefined;
let selectedProject = undefined;

window.onload = function(event) {
    header = document.getElementById('header');
    content = document.getElementById('content');
    sidebar = document.getElementById('sidebar');
    projects = document.getElementsByTagName('gcm-project');
}

function preview(index) {
    // If the selected project is not undefined, a project is currently selected
    if (selectedProject != undefined) {
        // If the currently selected project contains the view class, do not change anything
        // We want to continue to display the project
        // if (selectedProject.classList.contains('view')) {
        //     return;
        // }

        removeClass(selectedProject, 'preview');
    }

    // If a valid index was given, select that project
    if (index < 0 || index >= projects.length) {
        selectedProject = undefined;
    } else {
        selectedProject = projects[index];
        addClass(selectedProject, 'preview');
    }
}

function view() {
    // Make sure the selected project is visible and all other projects are hidden
    // for (let i = 0; i < projects.length; i++) {
    //     if (projects[i] == selectedProject) {
    //         addClass(projects[i], 'view');
    //     } else {
    //         addClass(projects[i], 'none');
    //     }
    // }

    // addClass(header, 'view');
    // addClass(content, 'view');
    // addClass(sidebar, 'view');
    // removeClass(selectedProject, 'preview');
}

function home() {
    // Make sure all project visiblity is reset
    // for (let i = 0; i < projects.length; i++) {
    //     if (projects[i] == selectedProject) {
    //         removeClass(projects[i], 'view');
    //     } else {
    //         removeClass(projects[i], 'none');
    //     }
    // }

    // removeClass(header, 'view');
    // removeClass(content, 'view');
    // removeClass(sidebar, 'view');
    // content.scrollTop = 0;
}

function addClass(element, className) {
    element.classList.add(className);
}

function removeClass(element, className) {
    element.classList.remove(className);
}