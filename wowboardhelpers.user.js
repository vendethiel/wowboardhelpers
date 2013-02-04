/*
// ==UserScript==
// @name last updated
// @description Shows last updated post on forum view
// @match http://eu.battle.net/wow/fr/forum/*
// @match http://eu.battle.net/wow/en/forum/*
// @match http://us.battle.net/wow/en/forum/*
// @author Tel
// @version 1.1.0
// ==/UserScript==
 * changelog
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
style.innerHTML = '.poster {\n  font-weight: bold;\n}\n.own-poster {\n  text-decoration: underline;\n}\n.clear-textarea {\n  display: block;\n  margin: 1px 0 1px 553px;\n  font-weight: bold;\n  font-size: 2em;\n  position: absolute;\n  z-index: 2;\n  cursor: pointer;\n}\na.show-topic {\n  cursor: pointer;\n  color: #008000;\n}\na.show-topic:hover {\n  color: #008000 !important;\n}\na.hide-topic {\n  cursor: pointer;\n  color: #f00;\n}\na.hide-topic:hover {\n  color: #f00 !important;\n}\n.karma {\n  white-space: normal !important;\n}\n.post-user .avatar {\n  top: 27px !important;\n}\n.post-pages .last-read {\n  background-image: none !important;\n  background: none !important;\n}\ntr:not(.stickied) a[data-tooltip] {\n  display: inline !important;\n}\n#posts.advanced .tt-last-updated {\n  display: none;\n}\n#posts.simple .last-post-th {\n  display: none;\n}\n#posts.simple .post-last-updated {\n  display: none;\n}\n.forum-actions {\n  padding: 0px;\n}\n.actions-panel {\n  margin-right: 15px;\n}\n.forum-options {\n  float: right;\n  right: auto;\n  position: relative;\n  margin-top: 25px;\n  margin-right: 15px;\n}\n';
document.head.appendChild(style);
jade=function(exports){Array.isArray||(Array.isArray=function(arr){return"[object Array]"==Object.prototype.toString.call(arr)}),Object.keys||(Object.keys=function(obj){var arr=[];for(var key in obj)obj.hasOwnProperty(key)&&arr.push(key);return arr}),exports.merge=function merge(a,b){var ac=a["class"],bc=b["class"];if(ac||bc)ac=ac||[],bc=bc||[],Array.isArray(ac)||(ac=[ac]),Array.isArray(bc)||(bc=[bc]),ac=ac.filter(nulls),bc=bc.filter(nulls),a["class"]=ac.concat(bc).join(" ");for(var key in b)key!="class"&&(a[key]=b[key]);return a};function nulls(val){return val!=null}return exports.attrs=function attrs(obj,escaped){var buf=[],terse=obj.terse;delete obj.terse;var keys=Object.keys(obj),len=keys.length;if(len){buf.push("");for(var i=0;i<len;++i){var key=keys[i],val=obj[key];"boolean"==typeof val||null==val?val&&(terse?buf.push(key):buf.push(key+'="'+key+'"')):0==key.indexOf("data")&&"string"!=typeof val?buf.push(key+"='"+JSON.stringify(val)+"'"):"class"==key&&Array.isArray(val)?buf.push(key+'="'+exports.escape(val.join(" "))+'"'):escaped&&escaped[key]?buf.push(key+'="'+exports.escape(val)+'"'):buf.push(key+'="'+val+'"')}}return buf.join(" ")},exports.escape=function escape(html){return String(html).replace(/&(?!(\w+|\#\d+);)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},exports.rethrow=function rethrow(err,filename,lineno){if(!filename)throw err;var context=3,str=require("fs").readFileSync(filename,"utf8"),lines=str.split("\n"),start=Math.max(lineno-context,0),end=Math.min(lines.length,lineno+context),context=lines.slice(start,end).map(function(line,i){var curr=i+start+1;return(curr==lineno?"  > ":"    ")+curr+"| "+line}).join("\n");throw err.path=filename,err.message=(filename||"Jade")+":"+lineno+"\n"+context+"\n\n"+err.message,err},exports}({});
var templates = {};
templates.author = function anonymous(locals, attrs, escape, rethrow, merge) {
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
templates.clearTextarea = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="clear-textarea">X</div>');
}
return buf.join("");
}
templates.defaultPagination = function anonymous(locals, attrs, escape, rethrow, merge) {
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
templates.hideTopic = function anonymous(locals, attrs, escape, rethrow, merge) {
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
templates.ttLastUpdated = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<span class="tt-last-updated"><br/>');
var __val__ = text
buf.push(null == __val__ ? "" : __val__);
buf.push('</span>');
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
    }).firstChild;
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
  var w, forumOptions, topic, ref$, tbodyRegular, posts;
  w = typeof unsafeWindow != 'undefined' && unsafeWindow !== null ? unsafeWindow : w;
  forumOptions = QS('.forum-options');
  if (topic = document.getElementById('thread')) {
    topic.dataset.id = (split$.call((ref$ = split$.call(document.location, '/'))[ref$.length - 1], '?'))[0];
  } else {
    out$.tbodyRegular = tbodyRegular = QS('tbody.regular');
  }
  posts = document.getElementById('posts');
  out$.w = w;
  out$.topic = topic;
  out$.posts = posts;
  out$.forumOptions = forumOptions;
}.call(this));
(function(){
  var l, langs, lang, timeTable;
  l = (split$.call(document.location, '/'))[4];
  langs = {
    fr: {
      timeIndex: 3,
      timeOutdex: 0,
      lastMessage: 'Dernier message',
      toggleSticky: 'Afficher/Cacher les post-its',
      mar: 'Tout marquer comme lu'
    },
    en: {
      timeIndex: 0,
      timeOutdex: -1,
      lastMessage: 'Last message',
      toggleSticky: 'Show/Hide stickies',
      mar: 'Mark all as read'
    }
  };
  out$.lang = lang = langs[l];
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
  var allRead, buttonMar;
  if (!posts) {
    return;
  }
  allRead = false;
  out$.buttonMar = buttonMar = node('a', {
    innerHTML: 'MAR',
    title: lang.mar,
    onclick: function(){
      var postRows, i$, ref$, len$, row, topicId, siblings;
      if (allRead) {
        return;
      }
      allRead = !allRead;
      postRows = document.getElementsByClassName('regular')[0];
      for (i$ = 0, len$ = (ref$ = postRows.children).length; i$ < len$; ++i$) {
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
        row.className = 'read';
      }
      forumOptions.removeChild(buttonMar);
    }
  });
  buttonMar.style.cursor = 'pointer';
  forumOptions.appendChild(buttonMar);
}.call(this));
(function(){
  var buttonSticky;
  if (!posts) {
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
  if (!posts) {
    return;
  }
  x$ = QS('.forum-options');
  x$.parentNode.removeChild(x$);
  QS('.content-trail').appendChild(x$);
}.call(this));
(function(){
  var characters, res$, i$, ref$, len$, name, ref1$, lastPostTh, TSTATE_UNK, TSTATE_ALR, TSTATE_CHK, hasUnread, post, children, div, a, td, lastPostTd, topicId, pages, lastPost, lastPostLink, replies, author, postCount, postOnly, text, isCm, that, authorName, inlineText, simplifiedTime, state;
  if (!posts) {
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
    post.appendChild(template('tt-last-updated', {
      text: text
    }));
    inlineText = text;
    if (!postOnly) {
      inlineText = inlineText.slice(text.indexOf('(') + 1, -1);
    }
    simplifiedTime = -1 === inlineText.indexOf('/') ? simplifyTime(join$.call(slice$.call(split$.call(inlineText, ' '), lang.timeIndex, lang.timeOutdex - 1 + 1 || 9e9), ' ')) : inlineText;
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
  if (!posts) {
    return;
  }
  for (i$ = 0, len$ = (ref$ = tbodyRegular.querySelectorAll('.post-status')).length; i$ < len$; ++i$) {
    status = ref$[i$];
    tr = status.parentNode.parentNode;
    tbodyRegular.removeChild(tr);
    tbodyRegular.appendChild(tr);
  }
}.call(this));
(function(){
  var hiddenTopics, i$, ref$, len$, postPages, that, tr, topicId;
  if (!posts) {
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
  var textarea, submit;
  if (!topic) {
    return;
  }
  textarea = QS('#post-edit textarea');
  submit = QS('.post [type=submit]');
  textarea.value = localStorage.getItem("post_" + topic.dataset.id) || '';
  textarea.onkeyup = function(){
    return w.localStorage.setItem("post_" + topic.dataset.id, this.value);
  };
  submit.onclick = function(){
    return w.localStorage.removeItem("post_" + topic.dataset.id);
  };
}.call(this));
(function(){
  var clearer, x$, textarea;
  if (!topic) {
    return;
  }
  clearer = template('clear-textarea');
  x$ = QS('.editor1');
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