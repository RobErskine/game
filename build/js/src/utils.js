'use strict';

/**
 * Decodes an encoded url
 * 
 * @param {string} url 
 * @returns decoded url
 */
export const urldecode = (url) => {
    return decodeURIComponent(url.replace(/\+/g, ' '));
};

/**
 * Grabs query params that match the param
 * 
 * @param {string} param 
 * @returns string of all query params seperated by commas
 */
export const $_GET = (param) => {
    let query = window.location.search.substring(1);
    let lets = query.split('&');
    let values = [];
    for (let i = 0; i < lets.length; i++) {
        let pair = lets[i].split('=');
        if (urldecode(pair[0]) === param) {
            values.push(urldecode(pair[1]));
        }
    }
    return values.join(',');
};


export default () => {

    // 
    // jQuery PLUGIN
    //
    $.fn.extend({
        exists: function() {
            return this.length !== 0;
        }
    });



    //
    // Cookies
    //
;


    /**
     * Used by TWIG templates onload event
     * 
     * @param {any} image 
     */
    function insertImages(image) {
        let $image = $(image);
        $image.addClass('image-loaded');
    }

    window.insertImages = insertImages;

};