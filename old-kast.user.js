// ==UserScript==
// @name 			OLD - Wikast
// @namespace 		DreadCast
// @include 		http://www.dreadcast.net/Forum/*
// @include 		http://www.dreadcast.net/Forum
// @grant 			none
// @author 			Gideon
// @date 			19/04/2014
// @version 		1.1
// @description 	Remet l'ancien CSS sur le Wikast
// @compat 			Firefox, Chrome
// @require      	http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==

$("head > link[rel=stylesheet]").attr("href", "http://www.dreadcast.net/static/forum.min.3.5.14.css")
