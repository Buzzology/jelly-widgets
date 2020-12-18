import { MessageTypes } from "./Constants";
import { createMessage, requestMessageDelete, updateMessage } from "../redux/message/actions";
import store from '../redux/index'


/* https://gist.github.com/hagemann/382adfc57adbd5af078dc93feef01fe1 */
export const Slugify = (input) => {

    if(!input) return "";

    const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
    const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
    const p = new RegExp(a.split('').join('|'), 'g')

    // eslint-disable-next-line
    var slugifiedString = input.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        // eslint-disable-next-line
        .replace(/&/g, '-and-') // Replace & with 'and'
        // eslint-disable-next-line
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        // eslint-disable-next-line
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text

    if (slugifiedString.length > 50) return slugifiedString.substring(0, 50);
    return slugifiedString;
}


/* Returns field props for a formik form so that they can be spread across an input */
export const getFormikFieldProps = (props, fieldName, displayName) => {

    var baseProps = {
        id: fieldName,
        value: props.values[fieldName],
        error: false,
        helperText: null,
        placeholder: displayName,
        label: displayName,
    };

    if (props.touched[fieldName] && props.errors[fieldName]) {
        baseProps = {
            ...baseProps,
            helperText: props.errors[fieldName],
            error: true,
        };
    }

    return baseProps;
}


/* Removes unwanted params from request body */
export const PrepareBody = body => {

    if(!body) return null;

    for(var key of Object.keys(body)){
        if(!body[key]){
            delete body[key];
        }
    }

    return JSON.stringify(body);
}


/* Removes underscores and capitalizes words: https://stackoverflow.com/a/21792507/522859 */
export const HumanizeString = (str) => {

    if (!str) return "";

    var frags = str.split('_');
    for (var i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1).toLowerCase();
    }
    return frags.join(' ');
}


export const DeHumanizeString = (str) => {
    return ToTitleCase(Slugify(str).replace(/-/g, " ")).replace(/\s/g, "");
}


/* https://stackoverflow.com/a/196991/522859 */
export function ToTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}


/* Get parameters from hash: https://gist.github.com/miohtama/1570295/289d5a82e65663c9b515c88186a268c6dd1fddb7 */
export const ParseHashArgs = (aURL) => {

    aURL = aURL || window.location.href;

    var vars = {};
    var hashes = aURL.slice(aURL.indexOf('#') + 1).split('&');

    for (var i = 0; i < hashes.length; i++) {
        var hash = hashes[i].split('=');

        if (hash.length > 1) {
            vars[hash[0]] = hash[1];
        } else {
            vars[hash[0]] = null;
        }
    }

    return vars;
}


export const SetLocalStorageItem = (key, value) => {

    var objectToStore = {
        storedAt: new Date(),
        data: value
    };

    localStorage.setItem(key, JSON.stringify(objectToStore));
}


/* IMPORTANT: do not use for anything but auth, there is a 4k limit */
export const SetDomainSharedCookie = (key, value) => {
    document.cookie = `${key}=${value};path=/;domain=${window.location.hostname}`;
}


export const GetLocalStorageItem = (key) => {

    var data = localStorage.getItem(key);
    if (data) {
        var retrievedObject = JSON.parse(data);
        return retrievedObject ? retrievedObject.data : retrievedObject;
    }

    return null;
}


/* A wrapper for showing an error message */
export const ShowError = (text) => {
    return ShowMessage(text, MessageTypes.ERROR);
}


/* Wrapper for calling create message */
export const ShowMessage = (text, type, duration = 15000, autoClose = true) => {
    return store.dispatch(createMessage(text, type, duration, autoClose));
}


/* Wrapper for deleting a message */
export const RemoveMessage = (message) => {
    return store.dispatch(requestMessageDelete(message));
}


/* Get query string parameter value: https://stackoverflow.com/a/901144/522859 */
export const GetQueryStringValue = (name, url) => {
    const urlParams = new URLSearchParams(url);
    return urlParams.get(name);
}


/* Wrapper for updating a message */
export const UpdateMessage = (message, text, type, duration, autoClose) => {
    message.created = new Date();
    message.text = text || message.text;
    message.type = type || message.type;
    message.duration = duration || message.duration || 15000;
    message.autoClose = autoClose || message.autoClose;

    return store.dispatch(updateMessage(message))
}


/* Read cookie value: https://stackoverflow.com/a/25490531/522859 */
export const GetCookieValue = (a) => {
    var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}


/* https://stackoverflow.com/a/2117523/522859 */
export const Guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });
}


/* Used for converting base64 string to blob (uploading files): https://stackoverflow.com/a/30407840/522859 */
export function DataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
