/*
// ==UserScript==
// @name WoW Board Helpers
// @description UserScript for the official WoW forum
// @match http://eu.battle.net/wow/fr/forum/*
// @match http://eu.battle.net/wow/en/forum/*
// @match http://us.battle.net/wow/en/forum/*
// @author Tel
// @version 1.9.3
// ==/UserScript==
 * changelog
 * 1.9.3
 *  Do not autolink CM posts
 * 1.9.2
 *  Added "top" jump
 *  Added "login" jump
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
(function (global) {
    function require(file) {
        if ({}.hasOwnProperty.call(require.cache, file))
            return require.cache[file];
        var resolved = require.resolve(file);
        if (!resolved)
            throw new Error('Failed to resolve module ' + file);
        var process = {
                title: 'browser',
                browser: true,
                env: {},
                argv: [],
                nextTick: function (fn) {
                    setTimeout(fn, 0);
                },
                cwd: function () {
                    return '/';
                },
                chdir: function () {
                }
            };
        var module$ = {
                id: file,
                require: require,
                filename: file,
                exports: {},
                loaded: false,
                parent: null,
                children: []
            };
        var dirname = file.slice(0, file.lastIndexOf('/') + 1);
        resolved.call(module$.exports, module$, module$.exports, dirname, file, process);
        module$.loaded = true;
        return require.cache[file] = module$.exports;
    }
    require.modules = {};
    require.cache = {};
    require.resolve = function (file) {
        return {}.hasOwnProperty.call(require.modules, file) ? require.modules[file] : void 0;
    };
    require.define = function (file, fn) {
        require.modules[file] = fn;
    };
    require.define('/wowboardhelpers.ls', function (module, exports, __dirname, __filename, process) {
        var c$, w, unsafeWindow, join$ = [].join;
        c$ = '' + function (text) {
            if (Array.isArray(text)) {
                return join$.call(text, ' ');
            }
            switch (text) {
            case null:
            case void 8:
                return '';
            case true:
            case false:
                return '\x93' + text;
            default:
                return text;
            }
        };
        w = typeof unsafeWindow != 'undefined' && unsafeWindow !== null ? unsafeWindow : window;
        'use strict';
        w.Cms || (unsafeWindow = w = w.unsafeWindow = function () {
            var el;
            el = document.createElement('p');
            el.setAttribute('onclick', 'return window;');
            return el.onclick();
        }.call(this));
        console.time('wowboardhelpers');
        require('/modules\\jumps\\all.ls');
        require('/fix\\all.ls');
        if (require('/topic.ls')) {
            require('/topic-characters\\all.ls');
            require('/topic-posts\\all.ls');
        }
        if (require('/forum.ls')) {
            require('/forum\\all.ls');
            require('/forum-topics\\all.ls');
        }
        console.timeEnd('wowboardhelpers');
    });
    require.define('/forum-topics\\all.ls', function (module, exports, __dirname, __filename, process) {
        var lastUpdated, moveRedirects, hideTopic, times;
        lastUpdated = require('/forum-topics\\last-updated.ls');
        moveRedirects = require('/forum-topics\\move-redirects.ls');
        hideTopic = require('/forum-topics\\hide-topic.ls');
        times = require('/forum-topics\\times.ls');
    });
    require.define('/forum-topics\\times.ls', function (module, exports, __dirname, __filename, process) {
        var units, timestamp, postTitles, i$, len$, postTitle, total, j$, ref$, len1$, timespan, ref1$, count, unit, date, timeout, refresh, split$ = ''.split;
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
        refresh = function () {
            var i$, ref$, len$, postTitle, d;
            for (i$ = 0, len$ = (ref$ = postTitles).length; i$ < len$; ++i$) {
                postTitle = ref$[i$];
                d = new Date(Number(postTitle.dataset.timestamp));
                postTitle.querySelector('.simplified-time').innerHTML = d.relativeTime();
            }
            return setTimeout(refresh, timeout);
        };
        refresh();
    });
    require.define('/forum-topics\\hide-topic.ls', function (module, exports, __dirname, __filename, process) {
        var hiddenTopics, i$, ref$, len$, postPages, that, tr, topicId, split$ = ''.split, join$ = [].join;
        hiddenTopics = split$.call(w.localStorage.getItem('hidden_topics') || '', ';');
        function saveHiddens() {
            w.localStorage.setItem('hidden_topics', join$.call(hiddenTopics, ';'));
        }
        function hide(it) {
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
            fn$.call(this, tr, topicId, postPages);
        }
        if (QS('tbody.regular tr:not(.hidden):not(.read)')) {
            clearTimeout(checkUpdates);
        }
        function in$(x, arr) {
            var i = -1, l = arr.length >>> 0;
            while (++i < l)
                if (x === arr[i] && i in arr)
                    return true;
            return false;
        }
        function fn$(tr, topicId, postPages) {
            var x$;
            x$ = template('hide-topic', { hidden: in$(topicId, hiddenTopics) });
            x$.onclick = function () {
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
    });
    require.define('/forum-topics\\move-redirects.ls', function (module, exports, __dirname, __filename, process) {
        var i$, ref$, len$, status, tr;
        for (i$ = 0, len$ = (ref$ = tbodyRegular.querySelectorAll('.post-status')).length; i$ < len$; ++i$) {
            status = ref$[i$];
            tr = status.parentNode.parentNode;
            tr.className += ' hidden redirect';
            tbodyRegular.removeChild(tr);
            tbodyRegular.appendChild(tr);
        }
    });
    require.define('/forum-topics\\last-updated.ls', function (module, exports, __dirname, __filename, process) {
        var characters, res$, i$, len$, name, ref$, lastPostTh, TSTATE_UNK, TSTATE_ALR, TSTATE_CHK, hasUnread, post, children, div, a, td, lastPostTd, topicId, ref1$, pages, lastPost, lastPostLink, replies, author, postCount, postOnly, text, isCm, that, authorName, inlineText, simplifiedTime, state, replace$ = ''.replace, split$ = ''.split, out$ = typeof exports != 'undefined' && exports || this, join$ = [].join, slice$ = [].slice;
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
            ref1$ = fetchSiblings(post, { slice: 5 }), pages = ref1$.pages, lastPost = ref1$.lastPost, lastPostLink = lastPost.children[0], replies = ref1$.replies, author = ref1$.author;
            postCount = split$.call(lastPostLink.href, '#')[1];
            if (!pages.querySelector('ul')) {
                pages.innerHTML = templates.defaultPagination({ href: a.href });
            }
            postOnly = false;
            text = split$.call(div.querySelector('.tt_info').innerHTML, '\n');
            text = text[2].trim().length ? text[2] : (postOnly = true, div.querySelector('.tt_time').innerHTML);
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
            simplifiedTime = ~inlineText.indexOf('/') ? inlineText : (simplifiedTime = join$.call(slice$.call(split$.call(inlineText, ' '), lang.timeIndex, lang.timeOutdex - 1 + 1 || 9000000000), ' '), post.dataset.simplifiedTime = simplifiedTime, text = text.replace(simplifiedTime, '<span class=\'simplified-time\'>' + simplifiedTime + '</span>'), simplifyTime(simplifiedTime));
            post.appendChild(template('tt-last-updated', { text: text }));
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
        function markState(node, state) {
            var innerHTML, states;
            innerHTML = node.innerHTML;
            states = [
                '?',
                '!',
                '\u2713'
            ];
            node.innerHTML = '<b>[' + states[state] + ']</b> ' + innerHTML;
        }
        function checkTopic(id, count, lastPoster) {
            var ref$;
            switch (ref$ = [localStorage.getItem('topic_' + id)], false) {
            case !function (it) {
                    return it > count;
                }(ref$[0]):
                if (lastPoster === getLastPoster(id)) {
                    return TSTATE_CHK;
                } else {
                    return TSTATE_ALR;
                }
                break;
            case !function (it) {
                    return it === count;
                }(ref$[0]):
                return TSTATE_CHK;
            case !(0 === ref$[0] || null === ref$[0]):
                return TSTATE_UNK;
            default:
                return TSTATE_ALR;
            }
        }
        function getLastPoster(it) {
            return localStorage.getItem('topic_lp_' + it);
        }
        function in$(x, arr) {
            var i = -1, l = arr.length >>> 0;
            while (++i < l)
                if (x === arr[i] && i in arr)
                    return true;
            return false;
        }
        function fn$(it) {
            return templates.author({
                name: it,
                own: in$(it, characters),
                cm: isCm
            });
        }
    });
    require.define('/forum\\all.ls', function (module, exports, __dirname, __filename, process) {
        var checkUpdates, currentForum, mar, moveActions, stickies;
        checkUpdates = require('/forum\\check-updates.ls');
        currentForum = require('/forum\\current-forum.ls');
        mar = require('/forum\\mar.ls');
        moveActions = require('/forum\\move-actions.ls');
        stickies = require('/forum\\stickies.ls');
    });
    require.define('/forum\\stickies.ls', function (module, exports, __dirname, __filename, process) {
        var buttonSticky;
        if ('show' !== w.localStorage.getItem('show-stickies')) {
            QS('.sticky').style.display = 'none';
        }
        buttonSticky = node('a', {
            innerHTML: 'Post-its',
            title: lang.toggleSticky,
            onclick: function () {
                var s;
                (s = QS('.sticky').style).display = s.display === 'none' ? '' : 'none';
                w.localStorage.setItem('show-stickies', s.display || 'show');
            }
        });
        buttonSticky.style.cursor = 'pointer';
        forumOptions.appendChild(buttonSticky);
    });
    require.define('/forum\\move-actions.ls', function (module, exports, __dirname, __filename, process) {
        var x$;
        x$ = QS('.forum-options');
        x$.parentNode.removeChild(x$);
        QS('.content-trail').appendChild(x$);
    });
    require.define('/forum\\mar.ls', function (module, exports, __dirname, __filename, process) {
        var allRead, buttonMar, out$ = typeof exports != 'undefined' && exports || this, split$ = ''.split;
        allRead = false;
        out$.buttonMar = buttonMar = node('a', {
            innerHTML: 'MAR',
            title: lang.mar,
            onclick: function () {
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
                    siblings = fetchSiblings(row.children[0], { slice: 5 });
                    w.localStorage.setItem('topic_' + topicId, split$.call(siblings.lastPost.children[0].href, '#')[1]);
                    w.localStorage.setItem('topic_lp_' + topicId, siblings.author.innerHTML.trim());
                    row.className += ' read';
                }
                forumOptions.removeChild(buttonMar);
            }
        });
        buttonMar.style.cursor = 'pointer';
        forumOptions.appendChild(buttonMar);
    });
    require.define('/forum\\current-forum.ls', function (module, exports, __dirname, __filename, process) {
        var ref$, currentForumHref, currentForumName;
        ref$ = (ref$ = document.getElementsByClassName('ui-breadcrumb')[0].children)[ref$.length - 1].children[0], currentForumHref = ref$.href, currentForumName = ref$.innerHTML;
    });
    require.define('/forum\\check-updates.ls', function (module, exports, __dirname, __filename, process) {
        var firstTopicId, trHtml, aEndHtml, tbodyHtml, x$, h1, ref$, refresh, timeout, checkUpdates, out$ = typeof exports != 'undefined' && exports || this;
        firstTopicId = tbodyRegular.children[0].id.slice('postRow'.length);
        trHtml = '<tr id="postRow' + firstTopicId;
        aEndHtml = 'data-tooltip-options=\'{"location": "mouse"}\'>';
        tbodyHtml = '<tbody class="regular">';
        x$ = QS('#forum-actions-top');
        x$.insertBefore(h1 = node('h1'), (ref$ = x$.children)[ref$.length - 1]);
        refresh = function () {
            return ajax.get(document.location, function () {
                var afterRegular, startPos, title;
                if (this.status !== 200) {
                    return;
                }
                h1.innerHTML = lang.checkingNew;
                afterRegular = this.response.slice(tbodyHtml.length + this.response.indexOf(tbodyHtml)).trim();
                if (trHtml === afterRegular.substr(0, trHtml.length)) {
                    setTimeout(refresh, timeout);
                    h1.innerHTML += ' <u>' + lang.noNew + '</u>';
                    setTimeout(function () {
                        return h1.innerHTML = '';
                    }, 1500);
                } else {
                    startPos = aEndHtml.length + afterRegular.indexOf(aEndHtml);
                    afterRegular = afterRegular.slice(startPos);
                    title = afterRegular.slice(0, afterRegular.indexOf('<')).trim();
                    h1.innerHTML = '<a href=\'' + document.location + '\'>' + lang.newMessages + '</a> : ' + [title.length > 30 ? '<br />' : void 8] + title;
                }
            });
        };
        timeout = 15 * 1000;
        out$.checkUpdates = checkUpdates = setTimeout(refresh, timeout);
    });
    require.define('/forum.ls', function (module, exports, __dirname, __filename, process) {
        var x$, ref$, split$ = ''.split;
        x$ = module.exports = document.getElementById('posts');
        x$.dataset.id = split$.call((ref$ = split$.call(document.location, '/'))[ref$.length - 2], '?')[0];
    });
    require.define('/topic-posts\\all.ls', function (module, exports, __dirname, __filename, process) {
        var autolink, jump, updateCount;
        autolink = require('/topic-posts\\autolink.ls');
        jump = require('/topic-posts\\jump.ls');
        updateCount = require('/topic-posts\\update-count.ls');
    });
    require.define('/topic-posts\\update-count.ls', function (module, exports, __dirname, __filename, process) {
        var pages, postCount, ref$, lastPosterName;
        pages = QSA('#forum-actions-top .ui-pagination li:not(.cap-item)');
        if (pages && (pages.length || 'current' === pages[pages.length - 1].className)) {
            postCount = (ref$ = topic.getElementsByClassName('post-info'))[ref$.length - 1].getElementsByTagName('a')[0].getAttribute('href').slice(1);
            lastPosterName = (ref$ = topic.getElementsByClassName('char-name-code'))[ref$.length - 1].innerHTML.trim();
            w.localStorage.setItem('topic_' + topic.dataset.id, postCount);
            w.localStorage.setItem('topic_lp_' + topic.dataset.id, lastPosterName);
        }
    });
    require.define('/topic-posts\\jump.ls', function (module, exports, __dirname, __filename, process) {
        var topic, lastPostId;
        topic = require('/topic.ls');
        if (lastPostId = localStorage.getItem('topic_' + topic.dataset.id)) {
            require('/shared\\bind-key.ls')('j', 'jump-to-last-read', function () {
                var lastPostPage, ref$;
                lastPostPage = Math.ceil(lastPostId / 20);
                if (topic.dataset.page < lastPostPage) {
                    document.location = topic.dataset.url + ('?page=' + lastPostPage);
                } else {
                    if ((ref$ = QSA('.post-detail')[lastPostId % 20 - 1]) != null) {
                        ref$.scrollIntoView();
                    }
                }
            });
        }
    });
    require.define('/shared\\bind-key.ls', function (module, exports, __dirname, __filename, process) {
        var cheatsheet, bindKey;
        exports.cheatsheet = cheatsheet = {};
        module.exports = bindKey = function (bind, langKey, cb) {
            cheatsheet[bind] = require('/shared\\lang.ls')(langKey);
            bind = bind.toUpperCase().charCodeAt();
            document.addEventListener('keydown', function (it) {
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
    });
    require.define('/shared\\lang.ls', function (module, exports, __dirname, __filename, process) {
        var l, langs, lang, split$ = ''.split;
        l = split$.call(document.location, '/')[4];
        langs = {
            fr: {
                timeIndex: 3,
                timeOutdex: 0,
                toggleSticky: 'Afficher/Cacher les post-its',
                mar: 'Tout marquer comme lu',
                newMessages: 'Il y a des nouveau(x) message(s)',
                checkingNew: 'V\xe9rification des nouveaux messages ...',
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
                quickQuote: 'Citer le bout de message s\xe9lectionn\xe9',
                pageTop: 'Haut de page',
                pageBottom: 'Bas de page',
                login: 'Connexion'
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
                pageBottom: 'Go to bottom',
                login: 'Login'
            }
        };
        module.exports = lang = function () {
            lang.displayName = 'lang';
            var ref$, prototype = lang.prototype, constructor = lang;
            import$(lang, (ref$ = langs[l]) != null ? ref$ : langs.en);
            function lang(it) {
                var ref$;
                return (ref$ = lang[it]) != null ? ref$ : (ref$ = lang[it.toCamelCase()]) != null ? ref$ : it;
            }
            lang.pluralize == null && (lang.pluralize = function (count, key) {
                return Math.round(count) + ' ' + lang(key) + [count > 1.5 ? 's' : void 8];
            });
            lang.singularize == null && (lang.singularize = function (it) {
                if (it[it.length - 1] === 's') {
                    return it.slice(0, -1);
                } else {
                    return it;
                }
            });
            return lang;
        }();
        function import$(obj, src) {
            var own = {}.hasOwnProperty;
            for (var key in src)
                if (own.call(src, key))
                    obj[key] = src[key];
            return obj;
        }
    });
    require.define('/topic.ls', function (module, exports, __dirname, __filename, process) {
        var that, x$, ref$, replace$ = ''.replace, split$ = ''.split;
        if (that = document.getElementById('thread')) {
            module.exports = that;
            x$ = that.dataset;
            x$.url = replace$.call(split$.call(document.location, '?')[0], /#[0-9]+/, '');
            x$.id = (ref$ = split$.call(x$.url, '/'))[ref$.length - 1];
            x$.page = ((ref$ = /\?page=([0-9]+)/.exec(document.location)) != null ? ref$[1] : void 8) || 1;
        }
    });
    require.define('/topic-posts\\autolink.ls', function (module, exports, __dirname, __filename, process) {
        var autolink, i$, ref$, len$, post;
        autolink = require('/modules\\autolink.ls');
        for (i$ = 0, len$ = (ref$ = QSA('.post-detail')).length; i$ < len$; ++i$) {
            post = ref$[i$];
            if (post.parentNode.parentNode.parentNode.parentNode.parentNode.classList.contains('blizzard')) {
                continue;
            }
            autolink(post);
        }
    });
    require.define('/modules\\autolink.ls', function (module, exports, __dirname, __filename, process) {
        var extensions, rules, out$ = typeof exports != 'undefined' && exports || this, replace$ = ''.replace;
        extensions = '(?:com|net|org|eu|fr|jp|us|co.uk|me)';
        rules = [
            [
                /(?:https?:\/\/)?(?:(?:www|m)\.)?(youtu\.be\/([\w\-_]+)(\?[&=\w\-_;\#]*)?|youtube\.com\/watch\?([&=\w\-_;\.\?\#\%]*)v=([\w\-_]+)([&=\w\-\._;\?\#\%]*))/g,
                '<iframe class="youtube-player" type="text/html" width="640" height="385" src="http://www.youtube.com/embed/$2$5" frameborder="0"></iframe>'
            ],
            [
                /\((https?:\/\/)([^<\s\)]+)\)/g,
                '(<a class="external" rel="noreferrer" href="$1$2" title="$1$2" data-autolink="paren-specialcase" target="_blank">$2</a>)'
            ],
            [
                RegExp('(^|>|;|\\s)(?:https?:\\/\\/)?([\\w\\.\\-]+\\.' + extensions + '(/[^<\\s]*)?(?=[\\s<]|$))', 'g'),
                '$1<a class="external" rel="noreferrer" href="http://$2" data-autolink="protocol-specialcase" title="$2" target="_blank">$2</a>'
            ],
            [
                /([^"'\/]|^)(https?:\/\/)(?![a-z]{2}\.battle\.net)([^<\s\)]+)/g,
                '$1<a class="external" rel="noreferrer" href="$2$3" title="$2$3" data-autolink="quote-specialcase" target="_blank">$3</a>'
            ],
            [
                RegExp('(^|>|;|\\s)((?!(?:www\\.)?dropbox)[\\w\\.\\-]+\\.' + extensions + '(/[^.<\\s]*)\\.(jpg|png|gif|jpeg)(?=[\\s<]|$)|puu\\.sh/[a-zA-Z0-9]+)', 'g'),
                '$1<img src="http://$2" alt="$2" class="autolink" />'
            ]
        ];
        out$.autolink = autolink;
        function autolink(it) {
            var i$, ref$, len$, ref1$, pattern, replacement;
            for (i$ = 0, len$ = (ref$ = rules).length; i$ < len$; ++i$) {
                ref1$ = ref$[i$], pattern = ref1$[0], replacement = ref1$[1];
                it = it.replace(pattern, replacement);
            }
            return it;
        }
        out$.elAutolink = elAutolink;
        function elAutolink(el) {
            var h, r, ref$, url, e;
            try {
                h = autolink(el.innerHTML);
                r = /\>((?:http:\/\/)?[a-z]{2}\.battle\.net\/[^<\s.]*)/g;
                while ((ref$ = r.exec(h)) != null && (url = ref$[1], ref$)) {
                    fn$.call(this, url, el);
                }
                return el.innerHTML = h;
            } catch (e$) {
                e = e$;
                return console.log('Unable to generate valid HTML : ' + h + ' (' + e + ')');
            }
            function fn$(url, el) {
                var fullUrl;
                fullUrl = ~url.indexOf('http://') ? url : 'http://' + url;
                ajax.get(fullUrl, function () {
                    var that;
                    if (that = /<title>(.+)<\/title>/.exec(this.response)) {
                        el.innerHTML = el.innerHTML.replace('>' + url, '>' + replace$.call(that[1], ' - World of Warcraft', ''));
                    }
                });
            }
        }
    });
    require.define('/topic-characters\\all.ls', function (module, exports, __dirname, __filename, process) {
        var contextLinks, improveTopic, multiChars;
        contextLinks = require('/topic-characters\\context-links.ls');
        improveTopic = require('/topic-characters\\improve-topic.ls');
        multiChars = require('/topic-characters\\multi-chars.ls');
    });
    require.define('/topic-characters\\multi-chars.ls', function (module, exports, __dirname, __filename, process) {
        var that, newArray, res$, acc, ref$, vals, res1$, i$, len$, val, accountCharacters, modified, postCharacter, iconIgnore, link, ref1$, account, current, characters, postDetail, height, toggle, ul, limit, i, replace$ = ''.replace;
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
            localStorage.setItem('accountCharacters', JSON.stringify(newArray));
            localStorage.removeItem('account-characters');
        }
        accountCharacters = (that = localStorage.getItem('accountCharacters')) ? JSON.parse(that) : {};
        function clean(it) {
            it = replace$.call(it, 'context-link', '');
            it = replace$.call(it, 'xmlns="http://www.w3.org/1999/xhtml" ', '');
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
            localStorage.setItem('accountCharacters', JSON.stringify(accountCharacters));
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
                fn$.call(this, ul, toggle, postCharacter);
            }
        }
        function in$(x, arr) {
            var i = -1, l = arr.length >>> 0;
            while (++i < l)
                if (x === arr[i] && i in arr)
                    return true;
            return false;
        }
        function fn$(ul, toggle, postCharacter) {
            toggle.onclick = function () {
                var i$, ref$, len$, li;
                for (i$ = 0, len$ = (ref$ = ul.children).length; i$ < len$; ++i$) {
                    li = ref$[i$];
                    li.style.display = '';
                }
                postCharacter.querySelector('.toggler').style.display = 'none';
                return toggle.onclick = function () {
                };
            };
        }
    });
    require.define('/topic-characters\\improve-topic.ls', function (module, exports, __dirname, __filename, process) {
        var i$, ref$, len$, infos, realm, ref1$;
        for (i$ = 0, len$ = (ref$ = document.getElementsByClassName('character-info')).length; i$ < len$; ++i$) {
            infos = ref$[i$];
            realm = infos.querySelector('.context-user span');
            if (!realm) {
                continue;
            }
            realm = realm.innerHTML;
            if ((ref1$ = infos.querySelector('.character-desc')) != null) {
                ref1$.innerHTML += '<br />' + realm;
            }
        }
    });
    require.define('/topic-characters\\context-links.ls', function (module, exports, __dirname, __filename, process) {
        var i$, ref$, len$, context, el;
        for (i$ = 0, len$ = (ref$ = topic.querySelectorAll('.context-links')).length; i$ < len$; ++i$) {
            context = ref$[i$];
            if (context.children.length === 1) {
                continue;
            }
            el = template('context-links', { link: context.children[0].href });
            context.insertBefore(el, context.querySelector('.link-last'));
        }
    });
    require.define('/fix\\all.ls', function (module, exports, __dirname, __filename, process) {
        var htmlOverrides, menu, setView;
        htmlOverrides = require('/fix\\html-overrides.ls');
        menu = require('/fix\\menu.ls');
        setView = require('/fix\\set-view.ls');
    });
    require.define('/fix\\set-view.ls', function (module, exports, __dirname, __filename, process) {
        w.Cms.Forum.setView = function (type, target) {
            w.Cookie.create('forumView', type, {
                path: '/',
                expires: 8760
            });
            w.$(target).addClass('active').siblings().removeClass('active');
            return w.$('#posts').attr('class', type);
        };
    });
    require.define('/fix\\menu.ls', function (module, exports, __dirname, __filename, process) {
        var old;
        old = w.Menu.show;
        w.Menu.show = function (arg$, arg1$, options) {
            var ref$, key$, x, ref1$;
            options == null && (options = {});
            (ref$ = w.Menu.dataIndex)[key$ = x = (ref1$ = options.set) != null ? ref1$ : 'base'] == null && (ref$[key$] = []);
            return old.apply(this, arguments);
        };
    });
    require.define('/fix\\html-overrides.ls', function (module, exports, __dirname, __filename, process) {
        var that, k, v, ref$;
        if (that = lang.htmlOverrides) {
            for (k in that) {
                v = that[k];
                if ((ref$ = QS(k)) != null) {
                    ref$.innerHTML = v;
                }
            }
        }
    });
    require.define('/modules\\jumps\\all.ls', function (module, exports, __dirname, __filename, process) {
        require('/modules\\jumps\\top.ls');
        if (!QS('.player-name')) {
            require('/modules\\jumps\\login.ls');
        }
    });
    require.define('/modules\\jumps\\login.ls', function (module, exports, __dirname, __filename, process) {
        bindKey('l', 'login', function () {
            w.Login.open('https://eu.battle.net/login/login.frag');
        });
    });
    require.define('/modules\\jumps\\top.ls', function (module, exports, __dirname, __filename, process) {
        require('/shared\\bind-key.ls')('t', 'page-top', function () {
            QS('#logo').scrollIntoView();
        });
    });
    global['wowboardhelpers'] = require('/wowboardhelpers.ls');
}(this));