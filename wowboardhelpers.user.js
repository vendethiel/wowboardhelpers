/*
// ==UserScript==
// @name last updated
// @description Shows last updated post on forum view
// @match http://eu.battle.net/wow/fr/forum/*
// @match http://eu.battle.net/wow/en/forum/*
// @match http://us.battle.net/wow/en/forum/*
// @author Tel
// @version 1.5.1
// ==/UserScript==
 * changelog
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
*/
(function(){
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '#forum-actions-top h1 {\n  text-align: center;\n  margin-left: 200px;\n}\n.forum .forum-actions {\n  padding: 0px;\n}\n.forum .actions-panel {\n  margin-right: 15px;\n}\n.forum .forum-options {\n  float: right;\n  right: auto;\n  position: relative;\n  margin-top: 25px;\n  margin-right: 15px;\n}\n.poster {\n  font-weight: bold;\n}\n.own-poster {\n  text-decoration: underline;\n}\na.show-topic {\n  cursor: pointer;\n  color: #008000;\n}\na.show-topic:hover {\n  color: #008000 !important;\n}\na.hide-topic {\n  cursor: pointer;\n  color: #f00;\n}\na.hide-topic:hover {\n  color: #f00 !important;\n}\n.post-pages .last-read {\n  background-image: none !important;\n  background: none !important;\n}\ntr:not(.stickied) a[data-tooltip] {\n  display: inline !important;\n}\n#posts.advanced .tt-last-updated {\n  display: none;\n}\n#posts.simple .last-post-th {\n  display: none;\n}\n#posts.simple .post-last-updated {\n  display: none;\n}\n.clear-textarea {\n  display: block;\n  margin: 1px 0 1px 553px;\n  font-weight: bold;\n  font-size: 2em;\n  position: absolute;\n  z-index: 2;\n  cursor: pointer;\n}\n#memebox {\n  position: relative;\n  float: right;\n  width: 100px;\n  left: -50px;\n  top: 5px;\n}\n#memebox h1 {\n  font-size: 2em;\n}\n#memebox ul#memes {\n  margin-top: 10px;\n  margin-left: 30px;\n  list-style-type: circle;\n}\n#memebox li {\n  font-weight: bold;\n  color: link;\n  text-decoration: underline;\n}\n.karma {\n  white-space: normal !important;\n}\n.post-user .avatar {\n  top: 27px !important;\n}\n';
document.head.appendChild(style);
jade=function(exports){Array.isArray||(Array.isArray=function(arr){return"[object Array]"==Object.prototype.toString.call(arr)}),Object.keys||(Object.keys=function(obj){var arr=[];for(var key in obj)obj.hasOwnProperty(key)&&arr.push(key);return arr}),exports.merge=function merge(a,b){var ac=a["class"],bc=b["class"];if(ac||bc)ac=ac||[],bc=bc||[],Array.isArray(ac)||(ac=[ac]),Array.isArray(bc)||(bc=[bc]),ac=ac.filter(nulls),bc=bc.filter(nulls),a["class"]=ac.concat(bc).join(" ");for(var key in b)key!="class"&&(a[key]=b[key]);return a};function nulls(val){return val!=null}return exports.attrs=function attrs(obj,escaped){var buf=[],terse=obj.terse;delete obj.terse;var keys=Object.keys(obj),len=keys.length;if(len){buf.push("");for(var i=0;i<len;++i){var key=keys[i],val=obj[key];"boolean"==typeof val||null==val?val&&(terse?buf.push(key):buf.push(key+'="'+key+'"')):0==key.indexOf("data")&&"string"!=typeof val?buf.push(key+"='"+JSON.stringify(val)+"'"):"class"==key&&Array.isArray(val)?buf.push(key+'="'+exports.escape(val.join(" "))+'"'):escaped&&escaped[key]?buf.push(key+'="'+exports.escape(val)+'"'):buf.push(key+'="'+val+'"')}}return buf.join(" ")},exports.escape=function escape(html){return String(html).replace(/&(?!(\w+|\#\d+);)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},exports.rethrow=function rethrow(err,filename,lineno){if(!filename)throw err;var context=3,str=require("fs").readFileSync(filename,"utf8"),lines=str.split("\n"),start=Math.max(lineno-context,0),end=Math.min(lines.length,lineno+context),context=lines.slice(start,end).map(function(line,i){var curr=i+start+1;return(curr==lineno?"  > ":"    ")+curr+"| "+line}).join("\n");throw err.path=filename,err.message=(filename||"Jade")+":"+lineno+"\n"+context+"\n\n"+err.message,err},exports}({});
var templates = {};
templates.author = templates['forum-topics/author'] = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<span');
buf.push(attrs({ "class": (["poster", own && "own-poster", cm && "type-blizzard"]) }, {"class":true}));
buf.push('>');
var __val__ = name
buf.push(escape(null == __val__ ? "" : __val__));
if ( cm)
{
buf.push('<img src="/wow/static/images/layout/cms/icon_blizzard.gif" alt=""/>');
}
buf.push('</span>');
}
return buf.join("");
}
templates.defaultPagination = templates['forum-topics/default-pagination'] = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<ul class="ui-pagination"><li><a');
buf.push(attrs({ 'data-pagenum':(1), 'rel':('np'), 'href':(href) }, {"data-pagenum":true,"rel":true,"href":true}));
buf.push('>1</a></li></ul>');
}
return buf.join("");
}
templates.hideTopic = templates['forum-topics/hide-topic'] = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
if ( hidden)
{
buf.push('<a class="last-read show-topic">✓</a>');
}
else
{
buf.push('<a class="last-read hide-topic">X</a>');
}
}
return buf.join("");
}
templates.ttLastUpdated = templates['forum-topics/tt-last-updated'] = (function(locals){
  return "<span class=\"tt-last-updated\">\n	<br/>\n	" + locals.text + "\n</span>";
});
templates.clearTextarea = templates['reply/clear-textarea'] = function (locals) {
  return '<div class="clear-textarea">X</div>';
}
templates.memebox = templates['reply/memebox'] = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="memebox"><h1>MemeBOX</h1><input placeholder="meme" id="meme-search" autocomplete="off" size="15"/><ul id="memes"></ul></div>');
}
return buf.join("");
}
var out$ = typeof exports != 'undefined' && exports || this, split$ = ''.split, replace$ = ''.replace, join$ = [].join, slice$ = [].slice;
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
  var w, forumOptions, topic, ref$, forum, tbodyRegular;
  w = typeof unsafeWindow != 'undefined' && unsafeWindow !== null ? unsafeWindow : window;
  forumOptions = QS('.forum-options');
  if (topic = document.getElementById('thread')) {
    topic.dataset.id = (split$.call((ref$ = split$.call(document.location, '/'))[ref$.length - 1], '?'))[0];
  }
  if (forum = document.getElementById('posts')) {
    forum.dataset.id = (split$.call((ref$ = split$.call(document.location, '/'))[ref$.length - 2], '?'))[0];
    out$.tbodyRegular = tbodyRegular = QS('tbody.regular');
  }
  out$.w = w;
  out$.topic = topic;
  out$.forum = forum;
  out$.forumOptions = forumOptions;
}.call(this));
(function(){
  var l, langs, lang, ref$, i$, len$, k, timeTable;
  l = (split$.call(document.location, '/'))[4];
  langs = {
    fr: {
      timeIndex: 3,
      timeOutdex: 0,
      lastMessage: 'Dernier message',
      toggleSticky: 'Afficher/Cacher les post-its',
      mar: 'Tout marquer comme lu',
      newMessages: 'Il y a des nouveau(x) message(s)',
      checkingNew: 'Vérification des nouveaux messages ...',
      noNew: 'Pas de nouveau message.',
      fewSecondsAgo: 'il y a quelques secondes',
      heure: 'hour',
      hour: 'heure',
      jour: 'day',
      day: 'jour'
    },
    en: {
      timeIndex: 0,
      timeOutdex: -1,
      lastMessage: 'Last message',
      toggleSticky: 'Show/Hide stickies',
      mar: 'Mark all as read',
      fewSecondsAgo: 'few seconds ago',
      newMessages: 'There are new message(s)',
      checkingNew: 'Checking new messages ...',
      noNew: 'No new message.'
    }
  };
  out$.lang = lang = (ref$ = langs[l]) != null
    ? ref$
    : langs.en;
  for (i$ = 0, len$ = (ref$ = ['minute', 'hour', 'day', 'year']).length; i$ < len$; ++i$) {
    k = ref$[i$];
    lang[k] == null && (lang[k] = k);
  }
  lang.pluralize == null && (lang.pluralize = function(count, key){
    return Math.round(count) + " " + this[key] + [count > 1.5 ? 's' : void 8];
  });
  lang.singularize == null && (lang.singularize = function(it){
    if (it[it.length - 1] === 's') {
      return it.slice(0, -1);
    } else {
      return it;
    }
  });
  timeTable = [['heures', 'h'], ['heure', 'h'], ['houres', 'h'], ['hour', 'h'], ['minutes', 'm'], ['minute', 'm'], ['jours', 'j'], ['jour', 'j'], ['days', 'd'], ['day', 'd']];
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
    var x$;
    x$ = new XMLHttpRequest;
    x$.open('GET', document.location);
    x$.onload = function(){
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
        h1.innerHTML = "<a href='" + document.location + "'>" + lang.newMessages + "</a> : " + [title.length > 50 ? '<br />' : void 8] + title;
      }
    };
    x$.send();
    return x$;
  };
  timeout = 15 * 1000;
  out$.checkUpdates = checkUpdates = setTimeout(refresh, timeout);
}.call(this));
(function(){
  var characters, res$, i$, ref$, len$, name, ref1$, lastPostTh, TSTATE_UNK, TSTATE_ALR, TSTATE_CHK, hasUnread, post, children, div, a, td, lastPostTd, topicId, pages, lastPost, lastPostLink, replies, author, postCount, postOnly, text, isCm, that, authorName, inlineText, simplifiedTime, state;
  if (!forum) {
    return;
  }
  characters = QSA('.user-plate .overview');
  if (characters.length) {
    res$ = [];
    for (i$ = 0, len$ = (ref$ = characters[0].children).length; i$ < len$; ++i$) {
      name = ref$[i$].innerHTML;
      res$.push(replace$.call((ref1$ = split$.call(name, ' '))[ref1$.length - 1], '\n', ''));
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
    lastPostTd = node('td', {
      className: 'post-last-updated',
      innerHTML: simplifiedTime
    });
    td.appendChild(lastPostTd);
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
      a.href = (ref1$ = pages.querySelectorAll('.ui-pagination a'))[ref1$.length - 1].href;
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
    switch (ref$ = [w.localStorage.getItem("topic_" + id)], false) {
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
    return w.localStorage.getItem("topic_lp_" + it);
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
  var units, timestamp, postTitles, i$, len$, postTitle, total, j$, ref$, len1$, timespan, ref1$, count, unit, refresh, timeout;
  units = {
    second: 1000,
    minute: 60000,
    hour: 3600000,
    day: 8640000
  };
  timestamp = new Date().getTime();
  postTitles = QSA('.post-title[data-simplified-time]');
  for (i$ = 0, len$ = postTitles.length; i$ < len$; ++i$) {
    postTitle = postTitles[i$];
    total = 0;
    for (j$ = 0, len1$ = (ref$ = split$.call(postTitle.dataset.simplifiedTime, ', ')).length; j$ < len1$; ++j$) {
      timespan = ref$[j$];
      ref1$ = split$.call(timespan, ' '), count = ref1$[0], unit = ref1$[1];
      total += count * units[lang[lang.singularize(unit)]];
    }
    postTitle.dataset.timestamp = new Date(timestamp - total).getTime();
  }
  setTimeout(refresh = function(){
    var i$, ref$, len$, postTitle, d;
    for (i$ = 0, len$ = (ref$ = postTitles).length; i$ < len$; ++i$) {
      postTitle = ref$[i$];
      d = new Date(Number(postTitle.dataset.timestamp));
      postTitle.querySelector('.simplified-time').innerHTML = d.relativeTime();
    }
    return setTimeout(refresh, timeout);
  }, timeout = 10 * units.second);
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
  var rules, replace, i$, ref$, len$, post, h, e;
  if (!topic) {
    return;
  }
  rules = [[/(?:https?:\/\/)?(?:(?:www|m)\.)?(youtu\.be\/([\w\-_]+)(\?[&=\w\-_;\#]*)?|youtube\.com\/watch\?([&=\w\-_;\.\?\#\%]*)v=([\w\-_]+)([&=\w\-\._;\?\#\%]*))/g, '<iframe class="youtube-player" type="text/html" width="640" height="385" src="http://www.youtube.com/embed/$2$5" frameborder="0"></iframe>'], [/\((https?:\/\/)([^<\s\)]+)\)/g, '(<a class="external" rel="noreferrer" href="$1$2" title="$1$2" target="_blank">$2</a>)'], [/([^"']|^)(https?:\/\/)([^<\s\)]+)/g, '$1<a class="external" rel="noreferrer" href="$2$3" title="$2$3" target="_blank">$3</a>'], [/(^|>|;|\s)([\w\.\-]+\.(?:com|net|org|eu|jp|us|co\.uk)(\/[^<\s]*)?(?=[\s<]|$))/g, '$1<a class="external" rel="noreferrer" href="http://$2" title="$2" target="_blank">$2</a>']];
  replace = function(it){
    var i$, ref$, len$, ref1$, pattern, replacement;
    for (i$ = 0, len$ = (ref$ = rules).length; i$ < len$; ++i$) {
      ref1$ = ref$[i$], pattern = ref1$[0], replacement = ref1$[1];
      it = it.replace(pattern, replacement);
    }
    return it;
  };
  for (i$ = 0, len$ = (ref$ = QSA('.post-detail')).length; i$ < len$; ++i$) {
    post = ref$[i$];
    try {
      post.innerHTML = h = replace(post.innerHTML);
    } catch (e$) {
      e = e$;
      console.log("Unable to generate valid HTML : " + h);
    }
  }
}.call(this));
(function(){
  var textarea, submit;
  if (!topic) {
    return;
  }
  if (!(textarea = QS('#post-edit textarea'))) {
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
  var clearer, x$, textarea;
  if (!topic) {
    return;
  }
  clearer = template('clear-textarea');
  x$ = QS('.editor1');
  if (!x$) {
    return;
  }
  textarea = x$.querySelector('textarea');
  x$.insertBefore(clearer, textarea);
  clearer.onclick = function(){
    textarea.value = '';
    return w.localStorage.removeItem("post_" + topic.dataset.id);
  };
}.call(this));
(function(){
  var keyCode, textarea;
  if (!topic) {
    return;
  }
  keyCode = 82;
  if (!(textarea = QS('#post-edit textarea'))) {
    return;
  }
  document.addEventListener('keydown', function(it){
    var that;
    if (it.keyCode !== keyCode) {
      return;
    }
    if (it.target !== QS('html')) {
      return;
    }
    it.preventDefault();
    if (that = w.getSelection().toString()) {
      textarea.value += (textarea.value ? "\n" : "") + ("[quote]" + that + "[/quote]");
      textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
      textarea.focus();
      return document.location += '#forum-actions-bottom';
    }
  });
}.call(this));
(function(){
  var memes, postWrapper, ref$, textarea, addMeme, memebox, ul;
  if (!topic) {
    return;
  }
  memes = {
    challengeaccepted: 'http://troll-face.fr/wp-content/uploads/2012/12/challenge-accepted.png',
    foreveralone: 'http://i1.kym-cdn.com/entries/icons/original/000/003/619/Untitled-1.jpg',
    bitchplease: 'http://www.troll.me/images/yao-ming/bitch-please.jpg',
    stfuandgtfo: 'http://4.bp.blogspot.com/-cD0QmZLGuAY/TnHyAD269EI/AAAAAAAAAkU/6O4rA1REcdI/s1600/STFU_and_GTFO.jpg',
    youdontsay: 'http://bearsharkaxe.com/wp-content/uploads/2012/06/you-dont-say.jpg',
    fullretard: 'http://www.osborneink.com/wp-content/uploads/2012/11/never_go_full_retard1.jpg',
    seriously: 'http://i3.kym-cdn.com/entries/icons/original/000/005/545/OpoQQ.jpg',
    trollface: 'http://www.mes-coloriages-preferes.com/Images/Large/Personnages-celebres-Troll-face-28324.png',
    fuckyeah: 'http://cdn.ebaumsworld.com/mediaFiles/picture/2168064/82942867.jpg',
    pedobear: 'http://aserres.free.fr/pedobear/pedobear.png',
    megusta: 'http://a400.idata.over-blog.com/5/08/51/37/me_gusta_by_projectendo-d2z3rku.jpg',
    notbad: 'http://www.reactionface.info/sites/default/files/images/YvEN9.png',
    ohcrap: 'http://i1.kym-cdn.com/entries/icons/original/000/004/077/Raisins_Face.jpg',
    yuno: 'http://i1.kym-cdn.com/entries/icons/original/000/004/006/y-u-no-guy.jpg',
    fulloffuck: 'http://www.mememaker.net/static/images/templates/14288.jpg',
    okay: 'http://cache.ohinternet.com/images/e/e6/Okay_guy.jpg',
    no: 'http://stickerish.com/wp-content/uploads/2011/09/NoGuyBlackSS.png'
  };
  postWrapper = QS('.post.general');
  postWrapper.removeChild((ref$ = postWrapper.children)[ref$.length - 1]);
  textarea = QS('#post-edit textarea');
  if (!textarea) {
    return;
  }
  addMeme = function(url){
    return function(){
      return textarea.value += (textarea.value ? "\n" : "") + url;
    };
  };
  memebox = template('memebox');
  ul = memebox.querySelector('#memes');
  memebox.querySelector('#meme-search').onkeyup = function(){
    var value, i, name, ref$, url, x$;
    value = this.value.replace(/[\s_-]+/, '');
    ul.innerHTML = '';
    if (!value) {
      return;
    }
    i = 0;
    for (name in ref$ = memes) {
      url = ref$[name];
      if (~name.indexOf(value)) {
        if (++i > 10) {
          break;
        }
        ul.appendChild((x$ = document.createElement('li'), x$.innerHTML = name, x$.onclick = addMeme(url), x$));
      }
    }
  };
  postWrapper.appendChild(memebox);
}.call(this));
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
function in$(x, arr){
  var i = -1, l = arr.length >>> 0;
  while (++i < l) if (x === arr[i] && i in arr) return true;
  return false;
}
}).call(this)