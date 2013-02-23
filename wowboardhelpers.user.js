/*
// ==UserScript==
// @name WoW Board Helpers
// @description UserScript for the official WoW forum
// @match http://eu.battle.net/wow/fr/forum/*
// @match http://eu.battle.net/wow/en/forum/*
// @match http://us.battle.net/wow/en/forum/*
// @author Tel
// @version 1.9.1
// ==/UserScript==
 * changelog
 * 1.9.1
 *  Perf improvements
 * 1.9
 *  Fixed a capturing bug with autolink
 *  Fixed a bug, probably creating another one, when the user does not
 *   have enough chars to get the "extended select menu"
 *  Added "HF" link in context links
 * 1.8
 *  Added the CheatSheet
 * 1.7.1
 *  Now the "other characters" list is hidden if bigger than post
 * 1.7
 *  Added `j` as a hotkey for "jump to unread" in topic
 *  Now display recognized alts of people ! (displays link)
 *  Split ALL the code !
 * 1.6.5
 *  post preview is now autolinked too
 *  extended autotitleing to everything in blizzard.net
 *   (everything out is prohibited because of xdomain policy)
 * 1.6.4
 *  Better french headers in ADV mode (takes less space)
 *  Fixed a bug when visiting a thread with #[0-9]+ in the url
 * 1.6.3
 *  Added a fix for blizzard's menu thinking JS has autovivification and shit
 *  Tweaked autolink for accents
 *  Changed ADV styling to please Lord Dryaan (jk he preps in rogue duels)
 * 1.6.2
 *  Now display forum links by their titles rather than their URL
 *  Now display characters by their realm/pseudo rather than their URL
 * 1.6.1
 *  Autolink now works against images too
 *  Rendering should be faster
 * 1.6.0
 *  Added relative time (updated every 10 seconds, should try to calculate when date will be stale)
 *  Make sure we aren't overriding a text in reply rememberer
 *  Checking for updates every 15s
 * 1.5.0
 *  Added the memebox, allowing you to select memes
 * 1.4.0
 *  Added autolink handling edge cases
 *   Also links youtube videos (iframe embedding)
 * 1.3.0
 *  Added `r` as hotkey for "quickquote"
 * 1.2.2
 *  Better handling of CMs
 * 1.2.1
 *  Redirects are moved at the end (before hidden topics)
 * 1.2
 *  Now allows to hide topics (not stickies),
 *   they'll just get moved to the bottom
 * 1.1
 *  Now automatically saves your textarea on input
 *   and clears saved data on submit
 *  Added an "X" button to clear textarea (+ saved data)
 *  Keeps css formatting, just in case
 * 1.0.1
 *  Now includes jade o/
 * 1.0.0
 *  Made it to the userscript build!
 * 0.8.1
 *  Made it work on chrome, won't override stuff etc
 *  Now uses localStorage for settings (instead of cookies)
 * 0.8
 *  Ability to Mark all as read
 *  Now compares last poster if post-count is somehow wrong
 *  Time is now simplified in ADV mode
 * 0.7
 *  Now hides stickies by default - togglable (stores user pref through cookie)
 * 0.6.2
 *  Disinlined
 *  Bold last poster's name, underline if us
 * 0.6.1
 *  Disabled blizzard's marking
 * 0.6
 *  Finally fixed the bug of "wrong count with deleted posts"
 *   the working solution is just to use .post-lastPost a[href] (ie blabla#354)
 *   This is still not working as intended when there's deleted posts (but that's definitely blizz's fault)
 *  Also splits correctly depending on the language used
 * 0.5
 *  Now adds annotations : [!] for new, [ASCII:check] for read and [?] for never went
 * 0.4
 *  Now works with advanced mode
 *  Fix a bug when logged off
 *
 * REMOVED
 *  Inline character links (1.7.0)
*/
var w;
w = typeof unsafeWindow != 'undefined' && unsafeWindow !== null ? unsafeWindow : window;
'use strict';

w.Cms || ( //let's detect this, 'tis something comin' from Blizzard Forums
  unsafeWindow = w = w.unsafeWindow = (function() {
    var el = document.createElement('p');
    el.setAttribute('onclick', 'return window;');
    return el.onclick();
  }())
);

console.time('wowboardhelpers');
(function () {
var c$ = function (text){
    if (Array.isArray(text)) {
      return join$.call(text, " ");
    }
    switch (text) {
    case null:
    case void 8:
      return '';
    case true:
    case false:
      return '\u0093' + text;
    default:
      return text;
    }
  }
var templates = {};
templates.author = templates['forum-topics/author'] = function(context) {
  return (function() {
    var $c, $o;
    $c = c$;
    $o = [];
    $o.push("<span class='" + ($c(["poster", this.own ? "own-poster" : void 0, this.cm ? "type-blizzard" : void 0])) + "'>");
    $o.push("" + $c(this.name));
    if (this.cm) {
      $o.push("<img src='/wow/static/images/layout/cms/icon_blizzard.gif' alt='' />");
    }
    $o.push("</span>");
    return $o.join("").replace(/\s(\w+)='true'/mg, " $1='$1'").replace(/\s(\w+)='false'/mg, '').replace(/\s(?:id|class)=(['"])(\1)/mg, "");
  }).call(context);
};
templates.defaultPagination = templates['forum-topics/default-pagination'] = function(context) {
  return (function() {
    var $c, $o;
    $c = c$;
    $o = [];
    $o.push("<ul class='ui-pagination'>\n<li>\n<a data-pagenum='" + ($c(1)) + "' rel='np' href='" + ($c(this.href)) + "'>1</a>\n</li>\n</ul>");
    return $o.join("").replace(/\s(\w+)='true'/mg, " $1='$1'").replace(/\s(\w+)='false'/mg, '').replace(/\s(?:id|class)=(['"])(\1)/mg, "");
  }).call(context);
};
templates.hideTopic = templates['forum-topics/hide-topic'] = function(context) {
  return (function() {
    var $o;
    $o = [];
    if (this.hidden) {
      $o.push("<a class='last-read show-topic'>✓</a>");
    } else {
      $o.push("<a class='hide-topic last-read'>X</a>");
    }
    return $o.join("").replace(/\s(?:id|class)=(['"])(\1)/mg, "");
  }).call(context);
};
templates.ttLastUpdated = templates['forum-topics/tt-last-updated'] = function(context) {
  return (function() {
    var $c, $o;
    $c = c$;
    $o = [];
    $o.push("<div class='tt-last-updated'>\n<br />");
    $o.push("" + $c(this.text));
    $o.push("</div>");
    return $o.join("").replace(/\s(\w+)='true'/mg, " $1='$1'").replace(/\s(\w+)='false'/mg, '').replace(/\s(?:id|class)=(['"])(\1)/mg, "");
  }).call(context);
};
templates.cheatsheet = templates['modules/cheatsheet'] = function(context) {
  return (function() {
    var $c, $o, key, val, _ref;
    $c = c$;
    $o = [];
    $o.push("<div id='cheatsheet-container'>\n<!-- that's meh but ... -->\n<span class='clear'></span>\n<div id='cheatsheet'>\n<!-- what's wrong with you blizz ? -->\n<a class='button1 toggler ui-button'>\n<span>\n<span>" + ($c(lang.cheatsheet)) + "</span>\n</span>\n</a>\n<ul>");
    _ref = this.cheatsheet;
    for (key in _ref) {
      val = _ref[key];
      $o.push("<li>\n<b>" + ($c(key.toUpperCase())) + "</b>\n: " + val + "\n</li>");
    }
    $o.push("</ul>\n</div>\n</div>");
    return $o.join("").replace(/\s(\w+)='true'/mg, " $1='$1'").replace(/\s(\w+)='false'/mg, '').replace(/\s(?:id|class)=(['"])(\1)/mg, "");
  }).call(context);
};
templates.clearTextarea = templates['reply/clear-textarea'] = function(context) {
  return (function() {
    var $o;
    $o = [];
    $o.push("<div class='clear-textarea'>X</div>");
    return $o.join("").replace(/\s(?:id|class)=(['"])(\1)/mg, "");
  }).call(context);
};
templates.memebox = templates['reply/memebox'] = function(context) {
  return (function() {
    var $c, $o;
    $c = c$;
    $o = [];
    $o.push("<div id='memebox'>\n<h1>	MemeBox</h1>\n<br />\n<input id='meme-search' placeholder='meme' autocomplete='off' size='" + ($c(15)) + "' />\n<ul id='memes'></ul>\n</div>");
    return $o.join("").replace(/\s(\w+)='true'/mg, " $1='$1'").replace(/\s(\w+)='false'/mg, '').replace(/\s(?:id|class)=(['"])(\1)/mg, "");
  }).call(context);
};
templates.contextLinks = templates['topic-characters/context-links'] = function(context) {
  return (function() {
    var $c, $o;
    $c = c$;
    $o = [];
    $o.push("<span class='extra-links'>\n<a class='extra-link link-first' href='" + ($c(this.link + 'achievement')) + "'>HF</a>\n<a class='extra-link link-first' href='" + ($c(this.link + 'statistic#21:152')) + "'>PvP</a>\n</span>");
    return $o.join("").replace(/\s(\w+)='true'/mg, " $1='$1'").replace(/\s(\w+)='false'/mg, '').replace(/\s(?:id|class)=(['"])(\1)/mg, "");
  }).call(context);
};
templates.multiChars = templates['topic-characters/multi-chars'] = function(context) {
  return (function() {
    var $c, $o, character, _i, _len, _ref;
    $c = c$;
    $o = [];
    $o.push("<div id='account-characters'>\n<h1 class='toggle'>");
    $o.push("" + $c(lang('otherCharacters')));
    if (this.toggle) {
      $o.push("<span class='toggler'>" + ($c(' [+]')) + "</span>");
    }
    $o.push("</h1>\n<br />\n<ul>");
    _ref = this.characters;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      character = _ref[_i];
      if (character !== this.current) {
        $o.push("<li style='" + ($c([this.toggle ? "display: none" : void 0])) + "'>" + ($c(character)) + "</li>");
      }
    }
    $o.push("</ul>\n</div>");
    return $o.join("").replace(/\s(\w+)='true'/mg, " $1='$1'").replace(/\s(\w+)='false'/mg, '').replace(/\s(?:id|class)=(['"])(\1)/mg, "");
  }).call(context);
};
var out$ = typeof exports != 'undefined' && exports || this, replace$ = ''.replace, split$ = ''.split, join$ = [].join, slice$ = [].slice;
(function(){
  var cheatsheet, bindKey;
  out$.cheatsheet = cheatsheet = {};
  out$.bindKey = bindKey = function(bind, langKey, cb){
    cheatsheet[bind] = lang(langKey);
    bind = bind.toUpperCase().charCodeAt();
    document.addEventListener('keydown', function(it){
      if (bind !== it.keyCode) {
        return;
      }
      if (it.target !== QS('html')) {
        return;
      }
      it.preventDefault();
      cb();
    });
  };
}.call(this));
(function(){
  function node(tag, props){
    props == null && (props = {});
    return import$(document.createElement(tag), props);
  }
  function replaceWith(fromNode, newNode){
    var parent, that;
    parent = fromNode.parentNode;
    if (that = fromNode.nextSibling) {
      parent.removeChild(fromNode);
      return parent.insertBefore(newNode, that);
    } else {
      parent.removeChild(fromNode);
      return parent.appendChild(newNode);
    }
  }
  /**
   * processes a template
   * and returns 
   */
  function template(name, locals){
    var innerHTML;
    name = name.replace(/-([a-z])/g, function(it){
      return it[1].toUpperCase();
    });
    innerHTML = templates[name](locals);
    return node('div', {
      innerHTML: innerHTML
    }).firstElementChild;
  }
  /**
   * fetches nextElementSibling
   */
  function fetchSiblings(elem, arg$){
    var slice, ref$, indexBy, results$ = {};
    slice = (ref$ = arg$.slice) != null ? ref$ : 0, indexBy = (ref$ = arg$.indexBy) != null ? ref$ : 'className';
    while (elem != null && (elem = elem.nextElementSibling)) {
      results$[elem[indexBy].slice(slice)] = elem;
    }
    return results$;
  }
  function QSA(it){
    return document.querySelectorAll(it);
  }
  function QS(it){
    return document.querySelector(it);
  }
  out$.node = node;
  out$.replaceWith = replaceWith;
  out$.template = template;
  out$.QSA = QSA;
  out$.QS = QS;
  out$.fetchSiblings = fetchSiblings;
}.call(this));
(function(){
  var forumOptions, topic, x$, topicUrl, ref$, textarea, forum, tbodyRegular;
  forumOptions = QS('.forum-options');
  if (topic = document.getElementById('thread')) {
    x$ = topic.dataset;
    x$.url = topicUrl = replace$.call((split$.call(document.location, '?'))[0], /#[0-9]+/, '');
    x$.id = (ref$ = split$.call(x$.url, '/'))[ref$.length - 1];
    x$.page = ((ref$ = /\?page=([0-9]+)/.exec(document.location)) != null ? ref$[1] : void 8) || 1;
    out$.textarea = textarea = QS('#post-edit textarea');
  }
  if (forum = document.getElementById('posts')) {
    forum.dataset.id = (split$.call((ref$ = split$.call(document.location, '/'))[ref$.length - 2], '?'))[0];
    out$.tbodyRegular = tbodyRegular = QS('tbody.regular');
  }
  out$.topic = topic;
  out$.forum = forum;
  out$.forumOptions = forumOptions;
  console.log('Ahhhh…greetings ! Want to help on this ? Head over to http://github.com/Nami-Doc/wowboardhelpers !');
}.call(this));
(function(){
  var style;
  style = node('style', {
    type: 'text/css',
    innerHTML: '	/*slake:build#compile-ls embeds css*/\n	#forum-actions-top h1 {\n  text-align: center;\n  margin-left: 200px;\n}\n.forum .forum-actions {\n  padding: 0px;\n}\n.forum .actions-panel {\n  margin-right: 15px;\n}\n.forum .forum-options {\n  float: right;\n  right: auto;\n  position: relative;\n  margin-top: 25px;\n  margin-right: 15px;\n}\n.poster {\n  font-weight: bold;\n}\n.own-poster {\n  text-decoration: underline;\n}\na.show-topic {\n  cursor: pointer;\n  color: #008000;\n}\na.show-topic:hover {\n  color: #008000 !important;\n}\na.hide-topic {\n  cursor: pointer;\n  color: #f00;\n}\na.hide-topic:hover {\n  color: #f00 !important;\n}\n.last-read {\n  opacity: 0;\n}\ntr:hover .last-read {\n  opacity: 1;\n}\n.post-pages .last-read {\n  background-image: none !important;\n  background: none !important;\n}\ntr:not(.stickied) a[data-tooltip] {\n  display: inline !important;\n}\n#posts.advanced .tt-last-updated {\n  display: none;\n}\n#posts.advanced .post-author {\n  width: 15px;\n}\n#posts.advanced .post-views {\n  width: 15px;\n}\n#posts.advanced .post-lastPost {\n  width: 90px;\n  text-align: center;\n}\n#posts.advanced .post-lastPost .more-arrow {\n  display: none;\n}\n#posts.advanced .post-th .replies {\n  padding-right: 2px;\n  text-align: center;\n}\n#posts.advanced .post-th .poster {\n  text-align: right;\n  font-weight: normal;\n  padding-right: 5px;\n}\n#posts.advanced .post-th .last-post-th {\n  text-align: left;\n}\n#posts.advanced .post-last-updated {\n  width: 70px;\n}\n#posts.advanced .post-replies {\n  width: 10px;\n  text-align: right;\n  padding-right: 10px;\n}\n#posts.simple .tt-last-updated {\n  display: inline;\n}\n#posts.simple .last-post-th {\n  display: none;\n}\n#posts.simple .post-last-updated {\n  display: none;\n}\n.clear-textarea {\n  display: block;\n  margin: 1px 0 1px 553px;\n  font-weight: bold;\n  font-size: 2em;\n  position: absolute;\n  z-index: 2;\n  cursor: pointer;\n}\n#memebox {\n  position: relative;\n  float: right;\n  width: 150px;\n  top: 5px;\n}\n#memebox h1 {\n  font-size: 1.8em;\n  display: inline;\n}\n#memebox .hider {\n  color: #f00;\n  display: none;\n}\n#memebox:hover .hider {\n  display: inline;\n}\n#memebox .unhider {\n  color: #008000;\n  display: none;\n}\n#memebox:hover .unhider {\n  display: inline;\n}\n#memebox ul#memes {\n  margin-top: 10px;\n  margin-left: 30px;\n  list-style-type: circle;\n}\n#memebox li {\n  font-weight: bold;\n  color: link;\n  text-decoration: underline;\n}\n.context-links .extra-link {\n  background-image: none !important;\n  padding-left: 8px !important;\n  border-top-left-radius: 0px !important;\n  border-bottom-left-radius: 0px !important;\n}\n.ui-context {\n  width: 230px !important;\n}\n.karma {\n  white-space: normal !important;\n}\n.post-user .avatar {\n  top: 27px !important;\n}\n#account-characters {\n  margin-left: 30px;\n}\n#account-characters h1 {\n  display: inline;\n}\n#account-characters ul {\n  list-style: circle;\n  margin-left: 20px;\n}\n#account-characters a {\n  font-weight: bold;\n}\nimg.autolink {\n  border: 5px solid #000;\n  max-width: 540px;\n  max-height: 500px;\n}\n'
  });
  document.head.appendChild(style);
}.call(this));
(function(){
  var l, langs, lang, timeTable;
  l = (split$.call(document.location, '/'))[4];
  langs = {
    fr: {
      timeIndex: 3,
      timeOutdex: 0,
      toggleSticky: 'Afficher/Cacher les post-its',
      mar: 'Tout marquer comme lu',
      newMessages: 'Il y a des nouveau(x) message(s)',
      checkingNew: 'Vérification des nouveaux messages ...',
      noNew: 'Pas de nouveau message.',
      fewSecondsAgo: 'il y a quelques secondes',
      seconde: 'second',
      second: 'seconde',
      heure: 'hour',
      hour: 'heure',
      jour: 'day',
      day: 'jour',
      few: 'quelques',
      lastMessage: 'Message',
      htmlOverrides: {
        '.replies': 'REPS',
        '.poster': 'Dernier'
      },
      otherCharacters: 'Autres personnages',
      cheatsheet: 'Raccourcis',
      jumpToLastRead: 'Aller au dernier message lu',
      quickQuote: 'Citer le bout de message sélectionné',
      pageTop: 'Haut de page',
      pageBottom: 'Bas de page'
    },
    en: {
      timeIndex: 0,
      timeOutdex: -1,
      lastMessage: 'Last',
      toggleSticky: 'Show/Hide stickies',
      mar: 'Mark all as read',
      fewSecondsAgo: 'few seconds ago',
      newMessages: 'There are new message(s)',
      checkingNew: 'Checking new messages ...',
      noNew: 'No new message.',
      otherCharacters: 'Other characters',
      cheatsheet: 'Cheatsheet',
      jumpToLastRead: 'Jump to last read message',
      quickQuote: 'Quote the selected part',
      pageTop: 'Go to top',
      pageBottom: 'Go to bottom'
    }
  };
  out$.lang = lang = (function(){
    lang.displayName = 'lang';
    var ref$, prototype = lang.prototype, constructor = lang;
    import$(lang, (ref$ = langs[l]) != null
      ? ref$
      : langs.en);
    function lang(it){
      var ref$;
      return (ref$ = lang[it]) != null
        ? ref$
        : (ref$ = lang[it.toCamelCase()]) != null ? ref$ : it;
    }
    lang.pluralize == null && (lang.pluralize = function(count, key){
      return Math.round(count) + " " + lang(key) + [count > 1.5 ? 's' : void 8];
    });
    lang.singularize == null && (lang.singularize = function(it){
      if (it[it.length - 1] === 's') {
        return it.slice(0, -1);
      } else {
        return it;
      }
    });
    return lang;
  }());
  timeTable = [['heures', 'h'], ['heure', 'h'], ['houres', 'h'], ['hour', 'h'], ['minutes', 'm'], ['minute', 'm'], ['jours', 'j'], ['jour', 'j'], ['days', 'd'], ['day', 'd'], ['secondes', 's'], ['seconds', 's'], ['second', 's']];
  /**
   * simplifies time based on table replacement
   */
  out$.simplifyTime = simplifyTime;
  function simplifyTime(it){
    var i$, ref$, len$, ref1$, convertFrom, convertTo;
    for (i$ = 0, len$ = (ref$ = timeTable).length; i$ < len$; ++i$) {
      ref1$ = ref$[i$], convertFrom = ref1$[0], convertTo = ref1$[1];
      it = it.replace(convertFrom, convertTo);
    }
    return it;
  }
}.call(this));
(function(){
  var content;
  content = QS('#content');
  content.className = (function(){
    switch (false) {
    case !topic:
      return "topic";
    case !forum:
      return "forum";
    default:
      return "";
    }
  }());
}.call(this));
(function(){
  var ajax;
  out$.ajax = ajax = (function(){
    ajax.displayName = 'ajax';
    var prototype = ajax.prototype, constructor = ajax;
    ajax.get = function(url, success){
      var x$;
      x$ = new XMLHttpRequest;
      x$.open('GET', url);
      x$.onload = success;
      x$.send();
      return x$;
    };
    function ajax(){}
    return ajax;
  }());
}.call(this));
(function(){
  Date.prototype.relativeTime = function(){
    var days, diff, hours, minutes, seconds;
    if ((days = (diff = Date.now() - this.getTime()) / 86400000) > 1) {
      return lang.pluralize(days, 'day');
    } else if ((hours = days * 24) > 1) {
      return lang.pluralize(hours, 'hour');
    } else if ((minutes = hours * 60) > 1) {
      return lang.pluralize(minutes, 'minute');
    } else if ((seconds = minutes * 60) >= 1) {
      return lang.pluralize(seconds, 'second');
    } else {
      return lang.fewSecondsAgo;
    }
  };
}.call(this));
(function(){
  String.prototype.pad = function(len, str){
    if (this.length >= len) {
      return;
    }
    return this + repeatString$(str + "", len - this.length);
  };
  String.prototype.toCamelCase = function(){
    return this.replace(/[_-]([a-z])/g, function(it){
      return it[1].toUpperCase();
    });
  };
}.call(this));
(function(){
  if (!topic) {
    return;
  }
  bindKey('t', 'page-top', function(){
    QS('#logo').scrollIntoView();
  });
}.call(this));
(function(){
  var extensions, rules;
  extensions = '(?:com|net|org|eu|fr|jp|us|co.uk|me)';
  rules = [[/(?:https?:\/\/)?(?:(?:www|m)\.)?(youtu\.be\/([\w\-_]+)(\?[&=\w\-_;\#]*)?|youtube\.com\/watch\?([&=\w\-_;\.\?\#\%]*)v=([\w\-_]+)([&=\w\-\._;\?\#\%]*))/g, '<iframe class="youtube-player" type="text/html" width="640" height="385" src="http://www.youtube.com/embed/$2$5" frameborder="0"></iframe>'], [/\((https?:\/\/)([^<\s\)]+)\)/g, '(<a class="external" rel="noreferrer" href="$1$2" title="$1$2" data-autolink="paren-specialcase" target="_blank">$2</a>)'], [RegExp('(^|>|;|\\s)(?:https?:\\/\\/)?([\\w\\.\\-]+\\.' + extensions + '(/[^<\\s]*)?(?=[\\s<]|$))', 'g'), '$1<a class="external" rel="noreferrer" href="http://$2" data-autolink="protocol-specialcase" title="$2" target="_blank">$2</a>'], [/([^"'\/]|^)(https?:\/\/)(?![a-z]{2}\.battle\.net)([^<\s\)]+)/g, '$1<a class="external" rel="noreferrer" href="$2$3" title="$2$3" data-autolink="quote-specialcase" target="_blank">$3</a>'], [RegExp('(^|>|;|\\s)((?!(?:www\\.)?dropbox)[\\w\\.\\-]+\\.' + extensions + '(/[^.<\\s]*)\\.(jpg|png|gif|jpeg)(?=[\\s<]|$)|puu\\.sh/[a-zA-Z0-9]+)', 'g'), '$1<img src="http://$2" alt="$2" class="autolink" />']];
  out$.autolink = autolink;
  function autolink(it){
    var i$, ref$, len$, ref1$, pattern, replacement;
    for (i$ = 0, len$ = (ref$ = rules).length; i$ < len$; ++i$) {
      ref1$ = ref$[i$], pattern = ref1$[0], replacement = ref1$[1];
      it = it.replace(pattern, replacement);
    }
    return it;
  }
  out$.elAutolink = elAutolink;
  function elAutolink(el){
    var h, r, ref$, url, e;
    try {
      h = autolink(el.innerHTML);
      r = /\>((?:http:\/\/)?[a-z]{2}\.battle\.net\/[^<\s.]*)/g;
      while ((ref$ = r.exec(h)) != null && (url = ref$[1], ref$)) {
        (fn$.call(this, url, el));
      }
      return el.innerHTML = h;
    } catch (e$) {
      e = e$;
      return console.log("Unable to generate valid HTML : " + h + " (" + e + ")");
    }
    function fn$(url, el){
      var fullUrl;
      fullUrl = ~url.indexOf('http://')
        ? url
        : "http://" + url;
      ajax.get(fullUrl, function(){
        var that;
        if (that = /<title>(.+)<\/title>/.exec(this.response)) {
          el.innerHTML = el.innerHTML.replace(">" + url, ">" + (replace$.call(that[1], " - World of Warcraft", '')));
        }
      });
    }
  }
}.call(this));
(function(){
  var that, k, v, ref$;
  if (that = lang.htmlOverrides) {
    for (k in that) {
      v = that[k];
      if ((ref$ = QS(k)) != null) {
        ref$.innerHTML = v;
      }
    }
  }
}.call(this));
(function(){
  var old;
  old = w.Menu.show;
  w.Menu.show = function(arg$, arg1$, options){
    var ref$, key$, x, ref1$;
    options == null && (options = {});
    (ref$ = w.Menu.dataIndex)[key$ = x = (ref1$ = options.set) != null ? ref1$ : 'base'] == null && (ref$[key$] = []);
    return old.apply(this, arguments);
  };
}.call(this));
(function(){
  w.Cms.Forum.setView = function(type, target){
    w.Cookie.create('forumView', type, {
      path: "/",
      expires: 8760
    });
    w.$(target).addClass('active').siblings().removeClass('active');
    return w.$('#posts').attr('class', type);
  };
}.call(this));
(function(){
  var allRead, buttonMar;
  if (!forum) {
    return;
  }
  allRead = false;
  out$.buttonMar = buttonMar = node('a', {
    innerHTML: 'MAR',
    title: lang.mar,
    onclick: function(){
      var i$, ref$, len$, row, topicId, siblings;
      if (allRead) {
        return;
      }
      allRead = !allRead;
      for (i$ = 0, len$ = (ref$ = tbodyRegular.children).length; i$ < len$; ++i$) {
        row = ref$[i$];
        if (row.className.trim() === 'read') {
          continue;
        }
        topicId = row.id.slice('postRow'.length);
        siblings = fetchSiblings(row.children[0], {
          slice: 5
        });
        w.localStorage.setItem("topic_" + topicId, (split$.call(siblings.lastPost.children[0].href, '#'))[1]);
        w.localStorage.setItem("topic_lp_" + topicId, siblings.author.innerHTML.trim());
        row.className += ' read';
      }
      forumOptions.removeChild(buttonMar);
    }
  });
  buttonMar.style.cursor = 'pointer';
  forumOptions.appendChild(buttonMar);
}.call(this));
(function(){
  var buttonSticky;
  if (!forum) {
    return;
  }
  if ('show' !== w.localStorage.getItem('show-stickies')) {
    QS('.sticky').style.display = 'none';
  }
  buttonSticky = node('a', {
    innerHTML: 'Post-its',
    title: lang.toggleSticky,
    onclick: function(){
      var s;
      (s = QS('.sticky').style).display = s.display === 'none' ? '' : 'none';
      w.localStorage.setItem('show-stickies', s.display || 'show');
    }
  });
  buttonSticky.style.cursor = 'pointer';
  forumOptions.appendChild(buttonSticky);
}.call(this));
(function(){
  var x$;
  if (!forum) {
    return;
  }
  x$ = QS('.forum-options');
  x$.parentNode.removeChild(x$);
  QS('.content-trail').appendChild(x$);
}.call(this));
(function(){
  var firstTopicId, trHtml, aEndHtml, tbodyHtml, x$, h1, ref$, refresh, timeout, checkUpdates;
  if (!forum) {
    return;
  }
  firstTopicId = tbodyRegular.children[0].id.slice('postRow'.length);
  trHtml = "<tr id=\"postRow" + firstTopicId;
  aEndHtml = 'data-tooltip-options=\'{"location": "mouse"}\'>';
  tbodyHtml = '<tbody class="regular">';
  x$ = QS('#forum-actions-top');
  x$.insertBefore(h1 = node('h1'), (ref$ = x$.children)[ref$.length - 1]);
  refresh = function(){
    return ajax.get(document.location, function(){
      var afterRegular, startPos, title;
      if (this.status !== 200) {
        return;
      }
      h1.innerHTML = lang.checkingNew;
      afterRegular = this.response.slice(tbodyHtml.length + this.response.indexOf(tbodyHtml)).trim();
      if (trHtml === afterRegular.substr(0, trHtml.length)) {
        setTimeout(refresh, timeout);
        h1.innerHTML += " <u>" + lang.noNew + "</u>";
        setTimeout(function(){
          return h1.innerHTML = "";
        }, 1500);
      } else {
        startPos = aEndHtml.length + afterRegular.indexOf(aEndHtml);
        afterRegular = afterRegular.slice(startPos);
        title = afterRegular.slice(0, afterRegular.indexOf('<')).trim();
        h1.innerHTML = "<a href='" + document.location + "'>" + lang.newMessages + "</a> : " + [title.length > 30 ? '<br />' : void 8] + title;
      }
    });
  };
  timeout = 15 * 1000;
  out$.checkUpdates = checkUpdates = setTimeout(refresh, timeout);
}.call(this));
(function(){
  var characters, res$, i$, len$, name, ref$, lastPostTh, TSTATE_UNK, TSTATE_ALR, TSTATE_CHK, hasUnread, post, children, div, a, td, lastPostTd, topicId, ref1$, pages, lastPost, lastPostLink, replies, author, postCount, postOnly, text, isCm, that, authorName, inlineText, simplifiedTime, state;
  if (!forum) {
    return;
  }
  characters = QSA('.char-wrapper .name');
  if (characters.length) {
    res$ = [];
    for (i$ = 0, len$ = characters.length; i$ < len$; ++i$) {
      name = characters[i$].innerHTML;
      res$.push(replace$.call((ref$ = split$.call(name, ' '))[ref$.length - 1], '\n', ''));
    }
    characters = res$;
  }
  out$.lastPostTh = lastPostTh = node('td', {
    className: 'last-post-th',
    innerHTML: lang.lastMessage
  });
  QS('.post-th').appendChild(lastPostTh);
  TSTATE_UNK = 0;
  TSTATE_ALR = 1;
  TSTATE_CHK = 2;
  hasUnread = false;
  for (i$ = 0, len$ = (ref$ = document.getElementsByClassName('post-title')).length; i$ < len$; ++i$) {
    post = ref$[i$], children = post.children, div = children[0], a = children[1], td = post.parentNode;
    if (children.length > 2) {
      lastPostTd = node('td', {
        className: 'post-last-updated',
        innerHTML: ' '
      });
      td.appendChild(lastPostTd);
      continue;
    }
    topicId = div.id.slice('thread_tt_'.length);
    ref1$ = fetchSiblings(post, {
      slice: 5
    }), pages = ref1$.pages, lastPost = ref1$.lastPost, lastPostLink = lastPost.children[0], replies = ref1$.replies, author = ref1$.author;
    postCount = (split$.call(lastPostLink.href, '#'))[1];
    if (!pages.querySelector('ul')) {
      pages.innerHTML = templates.defaultPagination({
        href: a.href
      });
    }
    postOnly = false;
    text = split$.call(div.querySelector('.tt_info').innerHTML, '\n');
    text = text[2].trim().length
      ? text[2]
      : (postOnly = true, div.querySelector('.tt_time').innerHTML);
    isCm = false;
    if (that = lastPostLink.querySelector('span')) {
      lastPostLink = that;
      isCm = true;
    }
    text = text.replace(RegExp('(' + (authorName = lastPostLink.innerHTML.trim()) + ')'), fn$);
    inlineText = text;
    if (!postOnly) {
      inlineText = inlineText.slice(text.indexOf('(') + 1, -1);
    }
    simplifiedTime = ~inlineText.indexOf('/')
      ? inlineText
      : (simplifiedTime = join$.call(slice$.call(split$.call(inlineText, ' '), lang.timeIndex, lang.timeOutdex - 1 + 1 || 9e9), ' '), post.dataset.simplifiedTime = simplifiedTime, text = text.replace(simplifiedTime, "<span class='simplified-time'>" + simplifiedTime + "</span>"), simplifyTime(simplifiedTime));
    post.appendChild(template('tt-last-updated', {
      text: text
    }));
    td.appendChild(node('td', {
      className: 'post-last-updated',
      innerHTML: simplifiedTime
    }));
    state = checkTopic(topicId, postCount, authorName);
    if (state !== TSTATE_CHK) {
      if (that = characters && authorName) {
        if (in$(that, characters)) {
          state = TSTATE_CHK;
        }
      }
      if (replies == 0 && in$(author.innerHTML.trim(), characters)) {
        state = TSTATE_CHK;
      }
    }
    if (state === TSTATE_CHK) {
      td.className = 'read';
      if (that = pages.querySelector('.last-read')) {
        pages.removeChild(that);
      }
    } else {
      hasUnread = true;
      td.className = '';
    }
    if (state !== TSTATE_UNK) {
      a.href = (ref1$ = pages.getElementsByTagName('a'))[ref1$.length - 1].href;
    }
    markState(post, state);
  }
  if (!hasUnread) {
    forumOptions.removeChild(buttonMar);
  }
  /**
   * prepends state to a topic
   *
   * `state` must be a TSTATE_* constant
   */
  function markState(node, state){
    var innerHTML, states;
    innerHTML = node.innerHTML;
    states = ['?', '!', '✓'];
    node.innerHTML = "<b>[" + states[state] + "]</b> " + innerHTML;
  }
  /**
   * checks topic to user
   *
   * returns 2 if user read last post
   * returns 1 if user read topic (at some moment)
   * returns 0 if no information were found
   */
  function checkTopic(id, count, lastPoster){
    var ref$;
    switch (ref$ = [localStorage.getItem("topic_" + id)], false) {
    case !(function(it){
      return it > count;
    })(ref$[0]):
      if (lastPoster === getLastPoster(id)) {
        return TSTATE_CHK;
      } else {
        return TSTATE_ALR;
      }
      break;
    case !(function(it){
        return it === count;
      })(ref$[0]):
      return TSTATE_CHK;
    case !(0 === ref$[0] || null === ref$[0]):
      return TSTATE_UNK;
    default:
      return TSTATE_ALR;
    }
  }
  function getLastPoster(it){
    return localStorage.getItem("topic_lp_" + it);
  }
  function fn$(it){
    return templates.author({
      name: it,
      own: in$(it, characters),
      cm: isCm
    });
  }
}.call(this));
(function(){
  var i$, ref$, len$, status, tr;
  if (!forum) {
    return;
  }
  for (i$ = 0, len$ = (ref$ = tbodyRegular.querySelectorAll('.post-status')).length; i$ < len$; ++i$) {
    status = ref$[i$];
    tr = status.parentNode.parentNode;
    tr.className += ' hidden redirect';
    tbodyRegular.removeChild(tr);
    tbodyRegular.appendChild(tr);
  }
}.call(this));
(function(){
  var hiddenTopics, i$, ref$, len$, postPages, that, tr, topicId;
  if (!forum) {
    return;
  }
  hiddenTopics = split$.call(w.localStorage.getItem("hidden_topics") || "", ";");
  function saveHiddens(){
    w.localStorage.setItem("hidden_topics", join$.call(hiddenTopics, ";"));
  }
  function hide(it){
    var that;
    it.parentNode.removeChild(it);
    tbodyRegular.appendChild(it);
    it.className += ' hidden';
    if (that = it.querySelector('.last-read')) {
      that.parentNode.removeChild(that);
    }
  }
  for (i$ = 0, len$ = (ref$ = QSA('tbody.regular .post-pages')).length; i$ < len$; ++i$) {
    postPages = ref$[i$];
    if (that = postPages.querySelector('.last-read')) {
      postPages.removeChild(that);
    }
    tr = postPages.parentNode;
    topicId = tr.id.slice('postRow'.length);
    if (in$(topicId, hiddenTopics)) {
      hide(tr);
    }
    (fn$.call(this, tr, topicId, postPages));
  }
  if (QS('tbody.regular tr:not(.hidden):not(.read)')) {
    clearTimeout(checkUpdates);
  }
  function fn$(tr, topicId, postPages){
    var x$;
    x$ = template('hide-topic', {
      hidden: in$(topicId, hiddenTopics)
    });
    x$.onclick = function(){
      if (in$(topicId, hiddenTopics)) {
        postPages.removeChild(x$);
        hiddenTopics.splice(hiddenTopics.indexOf(topicId), 1);
      } else {
        hide(tr);
        hiddenTopics.push(topicId);
      }
      return saveHiddens();
    };
    postPages.insertBefore(x$, postPages.children[0]);
  }
}.call(this));
(function(){
  var units, timestamp, postTitles, i$, len$, postTitle, total, j$, ref$, len1$, timespan, ref1$, count, unit, date, timeout, refresh;
  units = {
    second: 1000,
    minute: 60000,
    hour: 3600000,
    day: 86400000
  };
  timestamp = new Date().getTime();
  postTitles = QSA('.post-title[data-simplified-time]');
  for (i$ = 0, len$ = postTitles.length; i$ < len$; ++i$) {
    postTitle = postTitles[i$];
    total = 0;
    for (j$ = 0, len1$ = (ref$ = split$.call(postTitle.dataset.simplifiedTime, ', ')).length; j$ < len1$; ++j$) {
      timespan = ref$[j$];
      ref1$ = split$.call(timespan, ' '), count = ref1$[0], unit = ref1$[1];
      if (count === lang('few')) {
        count = 5;
        unit = lang('second');
      }
      total += count * units[lang(lang.singularize(unit))];
      if (total !== total) {
        console.log(count, lang.singularize(unit));
      }
    }
    date = new Date(timestamp - total);
    postTitle.dataset.timestamp = date.getTime();
  }
  timeout = 10 * units.second;
  refresh = function(){
    var i$, ref$, len$, postTitle, d;
    for (i$ = 0, len$ = (ref$ = postTitles).length; i$ < len$; ++i$) {
      postTitle = ref$[i$];
      d = new Date(Number(postTitle.dataset.timestamp));
      postTitle.querySelector('.simplified-time').innerHTML = d.relativeTime();
    }
    return setTimeout(refresh, timeout);
  };
  refresh();
}.call(this));
(function(){
  var i$, ref$, len$, infos, realm, ref1$;
  if (!topic) {
    return;
  }
  for (i$ = 0, len$ = (ref$ = document.getElementsByClassName('character-info')).length; i$ < len$; ++i$) {
    infos = ref$[i$];
    realm = infos.querySelector('.context-user span');
    if (!realm) {
      continue;
    }
    realm = realm.innerHTML;
    if ((ref1$ = infos.querySelector('.character-desc')) != null) {
      ref1$.innerHTML += "<br />" + realm;
    }
  }
}.call(this));
(function(){
  var that, newArray, res$, acc, ref$, vals, res1$, i$, len$, val, accountCharacters, modified, postCharacter, iconIgnore, link, ref1$, account, current, characters, postDetail, height, toggle, ul, limit, i;
  if (!topic) {
    return;
  }
  if (that = localStorage.getItem('account-characters')) {
    console.log('going to new format');
    res$ = {};
    for (acc in ref$ = JSON.parse(that)) {
      vals = ref$[acc];
      res1$ = [];
      for (i$ = 0, len$ = vals.length; i$ < len$; ++i$) {
        val = vals[i$];
        if (val.link) {
          res1$.push(clean(val.link));
        }
      }
      res$[acc] = res1$;
    }
    newArray = res$;
    localStorage.setItem("accountCharacters", JSON.stringify(newArray));
    localStorage.removeItem('account-characters');
  }
  accountCharacters = (that = localStorage.getItem('accountCharacters'))
    ? JSON.parse(that)
    : {};
  function clean(it){
    it = replace$.call(it, "context-link", '');
    it = replace$.call(it, "xmlns=\"http://www.w3.org/1999/xhtml\" ", '');
    return it;
  }
  modified = false;
  for (i$ = 0, len$ = (ref$ = QSA('.post-character')).length; i$ < len$; ++i$) {
    postCharacter = ref$[i$];
    iconIgnore = postCharacter.querySelector('.icon-ignore');
    if (!iconIgnore) {
      continue;
    }
    link = clean(postCharacter.querySelector('.user-name > a').outerHTML.trim());
    ref1$ = /ignore\(([0-9]+)/.exec(iconIgnore.onclick.toString()), account = ref1$[1];
    ref1$ = postCharacter.dataset;
    ref1$.account = account;
    ref1$.link = link;
    if (!in$(link, accountCharacters[account] || (accountCharacters[account] = []))) {
      modified = true;
      accountCharacters[account].push(link);
    }
  }
  if (modified) {
    localStorage.setItem("accountCharacters", JSON.stringify(accountCharacters));
  }
  for (i$ = 0, len$ = (ref$ = QSA('.post:not(.hidden) .post-character')).length; i$ < len$; ++i$) {
    postCharacter = ref$[i$];
    ref1$ = postCharacter.dataset, account = ref1$.account, current = ref1$.link;
    if (!account) {
      continue;
    }
    characters = accountCharacters[account];
    if (characters.length === 1) {
      continue;
    }
    postDetail = postCharacter.parentNode.querySelector('.post-detail');
    height = postDetail.offsetHeight;
    toggle = characters.length > 2 && height < 130 + (characters.length - 1) * 15;
    postCharacter.appendChild(template('multi-chars', {
      toggle: toggle,
      current: current,
      characters: characters
    }));
    if (toggle) {
      ul = postCharacter.querySelector('ul');
      if ((limit = Math.floor((height - 130) / 15)) > 1) {
        i = 0;
        for (; i < limit; i++) {
          ul.children[i].style.display = '';
        }
      }
      toggle = postCharacter.querySelector('.toggle');
      (fn$.call(this, ul, toggle, postCharacter));
    }
  }
  function fn$(ul, toggle, postCharacter){
    toggle.onclick = function(){
      var i$, ref$, len$, li;
      for (i$ = 0, len$ = (ref$ = ul.children).length; i$ < len$; ++i$) {
        li = ref$[i$];
        li.style.display = '';
      }
      postCharacter.querySelector('.toggler').style.display = 'none';
      return toggle.onclick = function(){};
    };
  }
}.call(this));
(function(){
  var i$, ref$, len$, context, el;
  if (!topic) {
    return;
  }
  for (i$ = 0, len$ = (ref$ = topic.querySelectorAll('.context-links')).length; i$ < len$; ++i$) {
    context = ref$[i$];
    el = template('context-links', {
      link: context.children[0].href
    });
    context.insertBefore(el, context.querySelector('.link-last'));
  }
}.call(this));
(function(){
  var lastPostId;
  if (!topic) {
    return;
  }
  if (!(lastPostId = localStorage.getItem("topic_" + topic.dataset.id))) {
    return;
  }
  bindKey('j', 'jump-to-last-read', function(){
    var lastPostPage, ref$;
    lastPostPage = Math.ceil(lastPostId / 20);
    if (topic.dataset.page < lastPostPage) {
      document.location = topic.dataset.url + ("?page=" + lastPostPage);
    } else {
      if ((ref$ = QSA('.post-detail')[lastPostId % 20 - 1]) != null) {
        ref$.scrollIntoView();
      }
    }
  });
}.call(this));
(function(){
  var i$, ref$, len$, post;
  if (!topic) {
    return;
  }
  for (i$ = 0, len$ = (ref$ = QSA('.post-detail')).length; i$ < len$; ++i$) {
    post = ref$[i$];
    elAutolink(post);
  }
}.call(this));
(function(){
  var pages, postCount, ref$, lastPosterName;
  if (!topic) {
    return;
  }
  pages = QSA('#forum-actions-top .ui-pagination li:not(.cap-item)');
  if ((pages != null && pages.length) && 'current' !== pages[pages.length - 1].className) {
    return;
  }
  postCount = (ref$ = topic.getElementsByClassName('post-info'))[ref$.length - 1].getElementsByTagName('a')[0].getAttribute('href').slice(1);
  lastPosterName = (ref$ = topic.getElementsByClassName('char-name-code'))[ref$.length - 1].innerHTML.trim();
  w.localStorage.setItem("topic_" + topic.dataset.id, postCount);
  w.localStorage.setItem("topic_lp_" + topic.dataset.id, lastPosterName);
}.call(this));
(function(){
  var submit;
  if (!topic) {
    return;
  }
  if (!textarea) {
    return;
  }
  submit = QS('.post [type=submit]');
  if (!textarea.value) {
    textarea.value = localStorage.getItem("post_" + topic.dataset.id) || '';
  }
  textarea.onkeyup = function(){
    return w.localStorage.setItem("post_" + topic.dataset.id, this.value);
  };
  submit.onclick = function(){
    return w.localStorage.setItem("post_" + topic.dataset.id, "");
  };
}.call(this));
(function(){
  var clearer, x$;
  if (!topic) {
    return;
  }
  if (!textarea) {
    return;
  }
  clearer = template('clear-textarea');
  x$ = QS('.editor1');
  if (!x$) {
    return;
  }
  x$.insertBefore(clearer, textarea);
  clearer.onclick = function(){
    textarea.value = '';
    return w.localStorage.removeItem("post_" + topic.dataset.id);
  };
}.call(this));
(function(){
  if (!topic) {
    return;
  }
  if (!textarea) {
    return;
  }
  bindKey('r', 'quick-quote', function(){
    var that;
    if (that = w.getSelection().toString()) {
      textarea.value += (textarea.value ? "\n" : "") + ("[quote]" + that + "[/quote]");
      textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
      textarea.focus();
    }
    QS('#forum-actions-bottom').scrollIntoView();
  });
}.call(this));
(function(){
  var memes, postWrapper, ref$, addMeme, appendMeme, memebox, ul;
  if (!topic) {
    return;
  }
  if (!textarea) {
    return;
  }
  memes = {
    challengeaccepted: 'http://sambacentral.files.wordpress.com/2012/11/challenge-accepted.jpg',
    foreveralone: 'http://i1.kym-cdn.com/entries/icons/original/000/003/619/Untitled-1.jpg',
    bitchplease: 'http://www.troll.me/images/yao-ming/bitch-please.jpg',
    stfuandgtfo: 'http://4.bp.blogspot.com/-cD0QmZLGuAY/TnHyAD269EI/AAAAAAAAAkU/6O4rA1REcdI/s1600/STFU_and_GTFO.jpg',
    youdontsay: 'http://bearsharkaxe.com/wp-content/uploads/2012/06/you-dont-say.jpg',
    fullretard: 'http://www.osborneink.com/wp-content/uploads/2012/11/never_go_full_retard1.jpg',
    susalenemi: 'http://img11.hostingpics.net/pics/311549libertlolxqt.png',
    fulloffuck: 'http://www.mememaker.net/static/images/templates/14288.jpg',
    seriously: 'http://i3.kym-cdn.com/entries/icons/original/000/005/545/OpoQQ.jpg',
    trollface: 'http://fc09.deviantart.net/fs70/f/2012/342/5/a/troll_face_by_bmsproductionz-d5ng9k6.png',
    fuckyeah: 'http://cdn.ebaumsworld.com/mediaFiles/picture/2168064/82942867.jpg',
    pedobear: 'http://aserres.free.fr/pedobear/pedobear.png',
    slowpoke: 'https://0-media-cdn.foolz.us/ffuuka/board/a/image/1351/43/1351437155488.png',
    megusta: 'http://a400.idata.over-blog.com/5/08/51/37/me_gusta_by_projectendo-d2z3rku.jpg',
    notbad: 'http://www.reactionface.info/sites/default/files/images/YvEN9.png',
    ohcrap: 'http://i1.kym-cdn.com/entries/icons/original/000/004/077/Raisins_Face.jpg',
    trauma: 'http://global3.memecdn.com/trauma_c_629591.jpg',
    yuno: 'http://i1.kym-cdn.com/entries/icons/original/000/004/006/y-u-no-guy.jpg',
    okay: 'http://cache.ohinternet.com/images/e/e6/Okay_guy.jpg',
    no: 'http://stickerish.com/wp-content/uploads/2011/09/NoGuyBlackSS.png'
  };
  /*# disabled as per dryaan
  extra-memes = {}
  if localStorage.getItem "memes"
  	extra-memes = JSON.parse that
  	# extra work on these is done at the bottom, after memebox is appended to dom
  */
  if (!(postWrapper = QS('.post.general'))) {
    return;
  }
  postWrapper.removeChild((ref$ = postWrapper.children)[ref$.length - 1]);
  addMeme = function(url){
    return function(){
      return textarea.value += (textarea.value ? "\n" : "") + url;
    };
  };
  appendMeme = function(name, url){
    var x$;
    return ul.appendChild((x$ = document.createElement('li'), x$.innerHTML = name, x$.onclick = addMeme(url), x$));
  };
  /*
  if localStorage.getItem "hide_memebox"
  	post-wrapper.appendChild <|
  		node 'div' id: 'memebox'
  			<|
  			node 'span' className: 'unhider' innerHTML: 'Memebox ✓'
  				..onclick = ->
  					localStorage.removeItem "hide_memebox"
  					@innerHTML = 'OK!'
  
  	return
  
  hider = memebox.querySelector '.hider'
  hider.onclick = ->
  	memebox.style.display = 'none'
  	localStorage.setItem "hide_memebox" "1"
  */
  memebox = template('memebox');
  ul = memebox.querySelector('#memes');
  memebox.querySelector('#meme-search').onkeyup = function(){
    var value, approximates, i, name, ref$, url, i$, len$;
    value = this.value.replace(/[\s_-]+/, '');
    ul.innerHTML = '';
    if (!value) {
      return;
    }
    approximates = [];
    i = 0;
    for (name in ref$ = memes) {
      url = ref$[name];
      switch (name.indexOf(value)) {
      case -1:
        break;
      case 0:
        appendMeme(name, url);
        if (++i > 10) {
          break;
        }
        break;
      default:
        approximates.push([name, url]);
      }
    }
    for (i$ = 0, len$ = approximates.length; i$ < len$; ++i$) {
      ref$ = approximates[i$], name = ref$[0], url = ref$[1];
      appendMeme(name, url);
      if (++i > 10) {
        break;
      }
    }
  };
  postWrapper.appendChild(memebox);
}.call(this));
(function(){
  var postPreview, old;
  if (!topic) {
    return;
  }
  if (!textarea) {
    return;
  }
  postPreview = QS('#post-preview');
  old = w.BML.preview.bind(w.BML);
  w.BML.preview = function(content, target, callback){
    return old(content, target, function(){
      callback();
      elAutolink(postPreview);
    });
  };
}.call(this));
(function(){
  var possibleDivs, i$, len$, sel, that, x$, ul;
  if (!Object.keys(cheatsheet).length) {
    return;
  }
  possibleDivs = ['.forum-info', '.talkback form'];
  for (i$ = 0, len$ = possibleDivs.length; i$ < len$; ++i$) {
    sel = possibleDivs[i$];
    if (that = QS(sel)) {
      that.appendChild((x$ = template('cheatsheet', {
        cheatsheet: cheatsheet
      }), ul = x$.querySelector('ul'), ul.style.display = 'none', x$.querySelector('.toggler').onclick = fn$, x$));
      break;
    }
  }
  function fn$(){
    return ul.style.display = ul.style.display === 'none' ? '' : 'none';
  }
}.call(this));
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
function repeatString$(str, n){
  for (var r = ''; n > 0; (n >>= 1) && (str += str)) if (n & 1) r += str;
  return r;
}
function in$(x, arr){
  var i = -1, l = arr.length >>> 0;
  while (++i < l) if (x === arr[i] && i in arr) return true;
  return false;
}
}).call(this)
console.timeEnd('wowboardhelpers');