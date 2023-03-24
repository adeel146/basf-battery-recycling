const {override} = require('customize-cra');
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");


const cspConfigPolicy = {
    'default-src': ["'self'", "data:", "*.basf.com", "*.cookielaw.org", "https://optanon.blob.core.windows.net","https://cdn.cookielaw.org/scripttemplates/6.35.0/otBannerSdk.js"],
    'base-uri': ["'self'", "https://geolocation.onetrust.com/cookieconsentpub"],
    'object-src': "'self'",
    'connect-src': ["'self'", "*.aticdn.net", "*.cookielaw.org", "*.onetrust.com", "http://matomo.ilidigital-soft.com/matomo/matomo.php", "http://matomo.ilidigital-soft.com/matomo/matomo.js", "https://battery-recycle-dev-backend.ilidigital-soft.com","https://battery-recyc-backend-dev.basf.ilidigital-soft.com","https://battery-recyc-main-backend-dev.basf.ilidigital-soft.com"],
    'script-src': ["'self'", "'unsafe-hashes'", "https://cdn.cookielaw.org/scripttemplates/6.35.0/otBannerSdk.js", "*.aticdn.net", "*.cookielaw.org", "*.tiqcdn.com", "*.ilidigital-soft.com", "https://geolocation.onetrust.com", "https://cdn-ukwest.onetrust.com", "http://tags.tiqcdn.com/utag/tiqapp/utag.v.js", "https://battery-recycle-dev-backend.ilidigital-soft.com", "http://matomo.ilidigital-soft.com/matomo/matomo.js", "https://tags.tiqcdn.com/utag/basf/basf/dev/utag.js","https://battery-recyc-backend-dev.basf.ilidigital-soft.com", "'sha256-S1PJj6icSfPVOkKpgSaMVYacBRIbvzKS6IOCxdRsf+g='", "'sha256-gdT4h+VtB1aOlIerjqav4KHmmWEgHv0fjs9DnMEQONA='", "'sha256-ncvurXFpV7qCqmEU/iAuWHiZsVMjqWXqBEovKJqJrRA='", "'sha256-6cvnhubo+VW8G3nslAi44GnHEsEFe8kjUAt/w7FB6WQ='", "'sha256-qxkNJS3WSpzR82x/f1oQaFVC7KEwhdp4jo0lVpOZKeY='"],
    'style-src': [
        "'self'",
        "'unsafe-hashes'",
        "https://battery-recycle-dev.ilidigital-soft.com/",
        "https://battery-recyc-frontend-dev.basf.ilidigital-soft.com/",
        "https://battery-recycling-dev.basf.ilidigital-soft.com/",
        "https://battery-recycle-dev.ilidigital-soft.com/static/js/main.bb9949c0.js",
        "https://battery-recycling-dev.basf.ilidigital-soft.com/static/js/main.bb9949c0.js",
        "https://battery-recyc-frontend-dev.basf.ilidigital-soft.com/js/main.bb9949c0.js",
        "https://cdn.cookielaw.org/scripttemplates/6.35.0/otBannerSdk.js",
        "https://tags.tiqcdn.com/utag/basf/basf/dev/utag.js",
        "'sha256-YTEza4CA2qPCNGLfB6mKa5FjY8kjkO/K7nQxeJxVd9E='",
        "'sha256-BSTKIYoPCaklkJ9YS/ZVYuKW8e+DG8jZJCXznBzHjgg'",
        "'sha256-OuF9RFR/32ohpXhqL6SxTR+5R0A9mI6DOuaCU6X597Y='",
        "'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='",
        "'sha256-JN34oVk9jCYhnPdJff1gLu5SCQYQ7BbolG6xVY5GAus='",
        "'sha256-iclLUrGK6Mv3wqmNIUiMRraoqODO7QUe//27WX6FRXw='",
        "'sha256-5uk36WjL57yn/gCOTRgwWDNu9zeJD3SJ+B7Fnr9K2Sk='",
        "'sha256-PE8FLl/JGuIhTJiX0js8tm26INtJUsI8j++wPYR+rls='",
        "'sha256-f8HkaZCZ0EO8c2L1aX93F91VPVA+pqcWBfv18HB0CrQ='",
        "'sha256-biLFinpqYMtWHmXfkA1BPeCY0/fNt46SAZ+BBk5YUog='",
        "'sha256-IzH1TE1hIuammQ7isXFlSiBbwy78rz9p51uSKC/0Z0k='",
        "'sha256-P3rVX7TI+wuGSC1bDHP9DoBnylDrkk7cufNvt3EOMBs='",
        "'sha256-uDFAT3aQ+rBcqGTPiCxp+N4k+JaeM+nsgINLyCDOpiM='",
        "'sha256-YTEza4CA2qPCNGLfB6mKa5FjY8kjkO/K7nQxeJxVd9E='",
        "'sha256-IzH1TE1hIuammQ7isXFlSiBbwy78rz9p51uSKC/0Z0k='",
        "'sha256-/kXZODfqoc2myS1eI6wr0HH8lUt+vRhW8H/oL+YJcMg='",
        "'sha256-BSTKIYoPCaklkJ9YS/ZVYuKW8e+DG8jZJCXznBzHjgg='",
        "'sha256-JN34oVk9jCYhnPdJff1gLu5SCQYQ7BbolG6xVY5GAus='",
        "'sha256-iclLUrGK6Mv3wqmNIUiMRraoqODO7QUe//27WX6FRXw='",

        "'sha256-MBVp6JYxbC/wICelYC6eULCRpgi9kGezXXSaq/TS2+I='",

        "'sha256-7Ri/I+PfhgtpcL7hT4A0VJKI6g3pK0ZvIN09RQV4ZhI='",
        "'sha256-58jqDtherY9NOM+ziRgSqQY0078tAZ+qtTBjMgbM9po='",
        "'sha256-ZH/+PJIjvP1BctwYxclIuiMu1wItb0aasjpXYXOmU0Y='",
        "'sha256-SSIM0kI/u45y4gqkri9aH+la6wn2R+xtcBj3Lzh7qQo='",
        "'sha256-OpTmykz0m3o5HoX53cykwPhUeU4OECxHQlKXpB0QJPQ='",
        "'sha256-yOU6eaJ75xfag0gVFUvld5ipLRGUy94G17B1uL683EU='",
        "'sha256-QZ52fjvWgIOIOPr+gRIJZ7KjzNeTBm50Z+z9dH4N1/8='",
        "'sha256-13vrThxdyT64GcXoTNGVoRRoL0a7EGBmOJ+lemEWyws='",
        "'sha256-Nqnn8clbgv+5l0PgxcTOldg8mkMKrFn4TvPL+rYUUGg='",

        "'sha256-iclLUrGK6Mv3wqmNIUiMRraoqODO7QUe//27WX6FRXw='",
        "'sha256-JN34oVk9jCYhnPdJff1gLu5SCQYQ7BbolG6xVY5GAus='",

        "'sha256-tgqRTOzdn1WJ57+aluxU0DQ6zLFwzefotEZA/DJb/fs='",


        "'sha256-IhRWvVR86uL5NDz4xNlczyCsRg5DhbEEzbLZrDtyCJM='",
        "'sha256-R0klTX5m20z8hJr450JboXf9cEdBjcdDxtO9CPvL0FY='",
        "'sha256-1sNDuLCPmujH/2mzeL8q/gqrYyCtYPmK7gTvAukcTOg='",
        "'sha256-D0Tehw9bYSeG7lzEdcZDryMxU6+nsCO+lG4+Fx6yUfc='",
        "'sha256-Ep3sL2nYw7l3ogpruy+CJo8NqWyTs7fXp8AxJSXHfIU='",
        "'sha256-lHNeBlwDalixHjlr4JY0GnICIEO5AQPWS2rrmyYmV6k='",
        "'sha256-iJBW6CGoF3bPrTx3wc6F2CPfRjhS9RhU42FLIlmzo/s='",
        "'sha256-SCpRFUrm9GdAFRYhO1RPt3Y0LwFZRLAWT6zK5N1Ogt0='",
        "'sha256-K5Cc30Dio0X/h76aOqlStr9cBZ+xQWtyTnvZkjMjgIU='",


        "'sha256-1Zx3AkSurmoE8hahpqbWmw1hSs2xiQrXTYHWgxEwctk='",
        "'sha256-Qr86PHTMKmhhM5J8NBB04qybvsd4eEZuG/TWLhpj2aQ='",
        "'sha256-WF+X9dmNCYnvyWunpiHbQjBrm9nu+DWHDoakHCYQ53A='",
        "'sha256-BUutsg7UWq+0k1KYcCAdkJPEq1Uh/copPhPreZFOAZY='",
        "'sha256-4aMO7zzD5QVTpUi5Qk3c9vYibCyf7O6nyqkmXKB4XXY='",
        "'sha256-KdDp4AT89gj6B9YKoPivSCmIsWYuyAE7yeenR6W4wGo='",

        "'sha256-5kZQ56BtiEw/YBAU2rPtQ2rBakwbv/7TzSHcUu5ie2w='",
        "'sha256-5u4v6bxYLZT0tuNV/dMVZMHTz1dFqPD6icm3w2aMBHQ='",

        "'sha256-ZnnT62UFvN6IBI0uzId0xmf1hhiOFYS9Ds7YV/6jYe0='",
        "'sha256-wkL3O1ueb6pUf40xDM1a8fDAkT5Icm9KfXTXFiXvXxo='",
        "'sha256-ziaaOX+zhlQz57Zuw5A2GQQdqeIeVU9kjWO1o6ApSIU='",
        "'sha256-1ItnBlj5ZgB5ACl/01tp1EsUQKCjurFwcw4XgbF38uI='",
        "'sha256-Wegj2THZaG7s7z2temf7LqA8HgokdqcEswvPhnjTv2k='",


        "'sha256-D6zmPl9SPOA5yA8xbXKrLL0cVKn8FB4+jrOuJzlq4sI='",
        "'sha256-RMLuAlXIwRu2+YnnDVl5tzQPV2YlmPqSWSKEwJidCyc='",
        "'sha256-J0fb1cj+TvfbuwoWFcBRWXfZjjxyNBgv9RziegQUbxk='",
        "'sha256-+h218lrS+a9xO+7drwOfWjgpuVq/J66Fi1VVl/fnmSY='",
        "'sha256-JF2ZZih25/Azw82NhKNfoSE3DXw5WdRLp2cPKTjafK8='",
        "'sha256-s0lzfn3HBpRMt5HbKnDNav0wV6zideWFt0xDfqp8TZE='",
        "'sha256-utnI/KlqBOOScbQlBTVQQtgPIVXIU7omQ21W/YPa7t4='",
        "'sha256-VtxTmme3h7DLcSukaRVs8K1LKqwvoXROy+tCLLebOXQ='",


        "'sha256-iO7F2hy476ppWnd4pn3N47Ghu4N5JTJ6HwMLvn+hsuo='",
        "'sha256-S0YC/uXDAItX6fZw7W0jini2nSubFplw0SLxwxT5MIA='",
        "'sha256-qx1XQ+GlI0aMD9OqW5uo58Ffet1v0jpPP+PorKfz1zQ='",
        "'sha256-0nNLCNQNq3QyoAbmK1lw4ugKnHvcPqtz1MKCES7OT2g='",

        "'sha256-aKg8OcDUoESwbA+WqUcu4TkFP9Nhc8/dCcJnFslzyq0='",
        "'sha256-Dri+B39IxGXlVoITRX8DpsbLJYlQWBkyp1uPz8HIiwY='",
        "'sha256-gGYUn42W6OIstZAxeB04vA/DJ9nyGiw79ipWuOg+cRM='",
        "'sha256-9dQrAdaWSdKtaTxHh8eW8UPlSRjw4MGouCwjGcLnYZw='",
        "'sha256-MF4p0/o2QYZK5VXRpRneI5308JNaTa6ZEgZxIOGDcmA='"
    ]

};

function addCspHtmlWebpackPlugin(config) {
    //if(process.env.NODE_ENV === 'production') {
    //config.plugins.push(new cspHtmlWebpackPlugin(cspConfigPolicy));
    //}

    return config;
}

module.exports = {
    webpack: override(addCspHtmlWebpackPlugin),
};