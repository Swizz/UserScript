// ==UserScript==
// @name Forum-messagerie
// @namespace Forum
// @author Gideon
// @date 27/02/2011
// @version 1.0
// @description Ajoute DC Weather à l'aitl.
// @license WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include http://www.dreadcast.net/Forum/1-21-Messagerie
// @include http://www.dreadcast.net/Forum
// @include http://www.dreadcast.net/Forum#
// @compat Firefox, Chrome
// ==/UserScript==
/* A LIRE :
 Le script utilise simplement les requêtes standard tout reste dans le serveur de MS pixel.
 Il n'y a donc pas à avoir de crainte sur la possible lecture de vos messages par un tier.
 Une fois installé rendez vous à l'adresse contenu dans @include pour lire vos nouveaux mps */


 
function getElementsByRegExpId(p_regexp, p_element, p_tagName) {
	p_element = p_element === undefined ? document : p_element;
	p_tagName = p_tagName === undefined ? '*' : p_tagName;
	var v_return = [];
	var v_inc = 0;
	for(var v_i = 0, v_il = p_element.getElementsByTagName(p_tagName).length; v_i < v_il; v_i++) {
		if(p_element.getElementsByTagName(p_tagName).item(v_i).id && p_element.getElementsByTagName(p_tagName).item(v_i).id.match(p_regexp)) {
			v_return[v_inc] = p_element.getElementsByTagName(p_tagName).item(v_i);
			v_inc++;
		}
	}
	return v_return;
}

if (location.pathname == "/Forum") {


var newLink = document.createElement('a');
newLink.href = "http://www.dreadcast.net/Forum/1-21-Messagerie";
newLink.className = "sous_forum peut_voir"
var sujet = "<h3>Messagerie</h3>";
	sujet +=  "<p class='forum_description'>Votre messagerie InGame</p>";
	sujet += "<div class='info_vu'></div>";

newLink.innerHTML = sujet;
document.getElementById('liste_forums').insertBefore(newLink,document.getElementById('liste_forums').lastChild.previousSibling);
}

else if (location.pathname == "/Forum/1-21-Messagerie") {

function ouvrir(id, sujet, auteur) {
 	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://www.dreadcast.net/Menu/Messaging/action=view&idconv='+id);
	xhr.send(null);
	xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) { 
    	var titre='';
    	
    	value = xhr.responseText;
	value = value.replace(/\s\s+/g, ' ');
	value = value.replace(/\n/g, '');
	/<div class="texte"> (.+) <\/div> <\/div> <div class="repondre link"/.test(value);
    	
	var texte="Message de : " +auteur+ "<br/>" + "Objet : " + sujet + "<br/><br/>" + RegExp.$1;
	
	var formulaire={
       	   type:'textArea',
      	   id:"nm_texte",
      	   lien:"http://www.dreadcast.net/Menu/Messaging/Send",
       	   parametres:{
       	   	nm_cible:auteur,
       	   	nm_idConvers:id,
       	   	nm_sujet:sujet
       	   	}}
       	   
	var lb=new LightBox(null,0,titre,texte,{},formulaire);
	lb.display();
    }
};
}

var jsScript = document.createElement('script');
jsScript.innerHTML = ouvrir.toString();
document.head.appendChild(jsScript);


document.getElementById('header_accueil').innerHTML = "<h1><a href='http://www.dreadcast.net/Forum'>Forum Extra</a> <span style='color:#000;'>»</span> <span style='color:#444;'>Messagerie</span></h1><p class='forum_description'>Votre messagerie InGame</p><a class='retour' href='http://www.dreadcast.net/Forum'></a>"

var zone_de_messages = document.getElementById('liste_forums')
zone_de_messages.innerHTML = '';
zone_de_messages.id = "liste_sujets"

function xrhRequest(id) {
var value = "";
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://www.dreadcast.net/Menu/Messaging/action=update&folder=nouveaux_messages&page=' + id);
xhr.send(null);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) { 
    
value = xhr.responseText;

//Premier formatage ID - Nom - Sujet - Date - heure
value = value.replace(/\s\s+/g, ' ');
value = value.replace(/\n/g, '');
value = value.replace(/<div id="message_list_/g, '\n');
value = value.replace(/" title="Cliquez pour ouvrir" class="message_list link info1" /g, '-');
value = value.replace(/onclick="\$\(this\)\.toggleClass\('opened'\)\.find\('\.loader'\)\.show\(\);/g, '');
value = value.replace(/if \(\$\('#db_message_\d+'\)\.length\) \$\('#db_message_\d+'\)\.remove\(\); else engine\.openDataBox\('Menu\/Messaging\/action=view&amp;idconv=\d+', null, '\$\(\\'#message_list_\d+ \.loader\\'\)\.hide\(\);'\);">/g, '');
value = value.replace(/<div class="loader"><\/div>/g, '');
value = value.replace(/<div class="auteur">\[([^\]]+)\]<\/div>/g, '$1');
value = value.replace(/ <div class="sujet">/g, '-');
value = value.replace(/<\/div> <div class="date1">/g, '-');
value = value.replace(/<\/div> <div class="date2">/g,'-');
value = value.replace(/<\/div> ?/g,'');
value = value.replace(/-  /g,'-');
value = value.replace(/<div id="messages_options">.+">(\d*)<\/span>\s*$/,'\n?$1');

//Dernier formatage pour affichage
value = value.replace(/(\d+)-(.+)-(.*)-(\d{2}\/\d{2}\/\d{4})-(\d{2}:\d{2})/g,"<a id=\"$1\" href=\"\#\" class=\"sujet sf21 peut_voir\" onclick=\"ouvrir($1, '$3', '$2'); return false;\"><div class=\"icon\"></div><h3><span class=\"nom_sujet\">$2</span> <span class=\"info_nb_messages\">$3</span></h3><div class=\"info_vu\"></div><div class=\"info_last_modification\">$4 $5</div></a>");
zone_de_messages.innerHTML += value.replace(/\?\d*$/,'');
zone_de_messages.innerHTML = zone_de_messages.innerHTML.replace(/<div id="messages_options">.+$/,'');
if (/\?(\d*)$/.test(value))
	{
		if (id<parseInt(RegExp.$1)) { xrhRequest(id+1) };
    }
}
};
}

xrhRequest(1);

var newMess = document.createElement('div');
newMess.id = "message";
newMess.style.marginLeft ='290px';
document.getElementById('main_content').appendChild(newMess);



/**/

}
