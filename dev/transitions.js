let previews = document.getElementsByClassName('preview');
let selectedPreviewElement = undefined;

function selectPreviewByIndex(index) {
    if (selectedPreviewElement != undefined) {
        selectedPreviewElement.classList.remove('show');
    }
    
    if (index == -1 || index >= previews.length) {
        selectedPreviewElement = undefined;
    } else {
        selectedPreviewElement = previews[index];
        selectedPreviewElement.classList.add('show');
    }
}