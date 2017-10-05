//Styles
import  "./styles/default.less";
import  "./styles/toast.less";

//Templates
import moduleTemplate from "./templates/toast.html";
import toastContainerTemplate from "./templates/toastContainer.html";

//JS
import DomHelper from "customExtensions/dom";

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


    var toastNode = DomHelper.getDomNode(moduleTemplate(options));
    oThis.toastCloseNode = toastNode.find(".close", 0);

    oThis.toastCloseNode.on("click", function () {
        toastNode.remove();
    });

    oThis.toastContainerNode.prependDOM(toastNode);
    removeAfter(toastNode, options.timeout);
}

function render() {
    this.containerNode = DomHelper.getDomNode(this.getModuleContainer());

    this.containerNode.setHtml(toastContainerTemplate());
    this.toastContainerNode = DomHelper.getDomNode(this.getModuleContainer()).find('.toast-container');
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
