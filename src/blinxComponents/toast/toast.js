//Styles
import  "./styles/default.css";

//Templates
import moduleTemplate from "./templates/toast.html";
import toastContainerTemplate from "./templates/toastContainer.html";



function removeAfter(toastNode, time) {
    time = (time != null) ? time : 30000;

    setTimeout(function () {
        toastNode.animate({
            opacity: 0
        }, function () {
            toastNode.remove();
        });
    }, time);
}

function addToast(oThis, options) {
    options.typeClass = options.type;
    options.showClose = options.showClose ? options.showClose : true;

    var toastNode = document.querySelector(".toast-container");
    toastNode.innerHTML = moduleTemplate(options);
    setTimeout(function () {
        toastNode.innerHTML = ""
    }, 2000);
    //oThis.toastCloseNode = toastNode.find(".close", 0);

    //oThis.toastCloseNode.on("click", function () {
    //    toastNode.remove();
    //});

    //oThis.toastContainerNode.prependDOM(toastNode);
    
}

function render() {
    this.containerNode = document.querySelector(this.getModuleContainer());

    this.containerNode.innerHTML = toastContainerTemplate();
    this.toastContainerNode = document.querySelector('.toast-container');
}

function showError(data) {
    data.type = "error";
    addToast(this, data);
}

function showSuccess(data) {
    data.type = "success";
    addToast(this, data);
}

function showInfo(data) {
    data.type = "info";
    addToast(this, data);
}

export default {
    render: render,
    showSuccess: showSuccess,
    showError: showError,
    showInfo: showInfo,

    hasModuleConfig: false
};
