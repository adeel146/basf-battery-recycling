export const setCustomVariable = (index,category,name,scope) => {
    window._paq.push(['setCustomVariable', index, category, name, scope]);
    var u = '//matomo.ilidigital-soft.com/matomo/';
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
};
