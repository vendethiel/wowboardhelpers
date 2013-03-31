/*
// ==UserScript==
// @name WoW Board Helpers
// @description UserScript for the official WoW forum
// @match http://eu.battle.net/wow/fr/forum/*
// @match http://eu.battle.net/wow/en/forum/*
// @match http://us.battle.net/wow/en/forum/*
// @author Tel
// @version 3.3.1
// ==/UserScript==
 * changelog
 * 3.3.1
 *  Fuck you crabby :)
 * 3.3
 *  MUH COMMONJS
 * 3.2
 *  Fix ALL the reply bugs
 * 3.1.1
 *  Even more perf improvements
 * 3.1
 *  Perf improvements
 * 3.0
 *  Switch to "JadeLS"
 *  End CommonJS-everywhere conversion
 *  Add a jump for new-topic unless banned
 * 2.0.6
 *  Do not remove class when MAR-ing
 * 2.0.5
 *  Improve MAR handling
 * 2.0.4
 *  Fix blizzard titlification
 * 2.0.3
 *  Fix for Firefox
 * 2.0.2
 *  Increase context-links margin
 * 2.0.1
 *  Fix youtube options
 * 2.0.0
 *  Rewrite with CommonJS
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
*/
"use strict";
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
        require.cache[file] = module$.exports;
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
    require.define('/src\\wowboardhelpers.ls', function (module, exports, __dirname, __filename, process) {
        console.log('Ahhhh\u2026greetings ! Want to help on this ? Head over to http://github.com/Nami-Doc/wowboardhelpers !');
        console.time('wowboardhelpers');
        require('/src\\board\\content-class.ls');
        require('/src\\board\\css.ls');
        require('/src\\jumps\\index.ls');
        require('/src\\fix\\index.ls');
        if (require('/src\\topic.ls')) {
            require('/src\\topic-characters\\index.ls');
            require('/src\\topic-posts\\index.ls');
            if (require('/src\\textarea.ls')) {
                require('/src\\reply\\index.ls');
            }
        }
        if (require('/src\\forum.ls')) {
            require('/src\\forum-layout\\index.ls');
            require('/src\\forum-topics\\index.ls');
            require('/src\\forum-layout\\hide-mar.ls');
        }
        require('/src\\cheatsheet\\index.ls');
        console.timeEnd('wowboardhelpers');
    });
    require.define('/src\\cheatsheet\\index.ls', function (module, exports, __dirname, __filename, process) {
        var cheatsheet, possibleDivs, ref$, $, el, templateCheatsheet, i$, len$, sel, that, x$, ul;
        cheatsheet = require('/src\\cheatsheet\\bind-key.ls').cheatsheet;
        if (Object.keys(cheatsheet).length) {
            possibleDivs = [
                '.forum-info',
                '.talkback form'
            ];
            ref$ = require('/node_modules\\dom\\index.ls'), $ = ref$.$, el = ref$.el;
            templateCheatsheet = require('/src\\cheatsheet\\templates\\cheatsheet.jadels');
            for (i$ = 0, len$ = possibleDivs.length; i$ < len$; ++i$) {
                sel = possibleDivs[i$];
                if (that = $(sel)) {
                    that.appendChild((x$ = el(templateCheatsheet({ cheatsheet: cheatsheet })), ul = x$.querySelector('ul'), ul.style.display = 'none', x$.querySelector('.toggler').onclick = fn$, x$));
                    break;
                }
            }
        }
        function fn$() {
            return ul.style.display = ul.style.display === 'none' ? '' : 'none';
        }
    });
    require.define('/src\\cheatsheet\\templates\\cheatsheet.jadels', function (module, exports, __dirname, __filename, process) {
        var lang, join;
        lang = require('/node_modules\\lang\\index.ls');
        join = function (it) {
            if (it) {
                return it.join('');
            } else {
                return '';
            }
        };
        module.exports = function (locals, extra) {
            var key, val;
            return '<div id="cheatsheet-container"><!-- that\'s meh but ...--><span class="clear"></span><div id="cheatsheet"><!-- what\'s wrong with you blizz ?--><a class="toggler ui-button button1"><span><span>' + (lang.cheatsheet || '') + '</span></span></a><ul>' + (join(function () {
                var ref$, results$ = [];
                for (key in ref$ = locals.cheatsheet) {
                    val = ref$[key];
                    results$.push('<li><b>' + (key.toUpperCase() || '') + '</b>: ' + val + '</li>');
                }
                return results$;
            }()) || '') + '</ul></div></div>';
        };
    });
    require.define('/node_modules\\lang\\index.ls', function (module, exports, __dirname, __filename, process) {
        var l, langs, toCamelCase, lang, split$ = ''.split;
        l = split$.call(document.location, '/')[4];
        langs = {
            fr: require('/lib\\lang\\fr.ls'),
            en: require('/lib\\lang\\en.ls')
        };
        toCamelCase = require('/lib\\lang\\node_modules\\string\\index.ls').toCamelCase;
        module.exports = lang = function () {
            lang.displayName = 'lang';
            var ref$, prototype = lang.prototype, constructor = lang;
            import$(lang, (ref$ = langs[l]) != null ? ref$ : langs.en);
            function lang(it) {
                var ref$;
                return (ref$ = lang[it]) != null ? ref$ : (ref$ = lang[toCamelCase(it)]) != null ? ref$ : it;
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
            lang.simplifyTime = require('/lib\\lang\\simplify-time.ls');
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
    require.define('/lib\\lang\\simplify-time.ls', function (module, exports, __dirname, __filename, process) {
        var timeTable;
        timeTable = [
            [
                'heures',
                'h'
            ],
            [
                'heure',
                'h'
            ],
            [
                'houres',
                'h'
            ],
            [
                'hour',
                'h'
            ],
            [
                'minutes',
                'm'
            ],
            [
                'minute',
                'm'
            ],
            [
                'jours',
                'j'
            ],
            [
                'jour',
                'j'
            ],
            [
                'days',
                'd'
            ],
            [
                'day',
                'd'
            ],
            [
                'secondes',
                's'
            ],
            [
                'seconds',
                's'
            ],
            [
                'second',
                's'
            ]
        ];
        module.exports = function () {
            function simplifyTime(it) {
                var i$, ref$, len$, ref1$, convertFrom, convertTo;
                for (i$ = 0, len$ = (ref$ = timeTable).length; i$ < len$; ++i$) {
                    ref1$ = ref$[i$], convertFrom = ref1$[0], convertTo = ref1$[1];
                    it = it.replace(convertFrom, convertTo);
                }
                return it;
            }
            return simplifyTime;
        }();
    });
    require.define('/lib\\lang\\node_modules\\string\\index.ls', function (module, exports, __dirname, __filename, process) {
        module.exports = { toCamelCase: require('/lib\\string\\to-camel-case.ls') };
    });
    require.define('/lib\\string\\to-camel-case.ls', function (module, exports, __dirname, __filename, process) {
        var toCamelCase;
        module.exports = toCamelCase = function (it) {
            return it.replace(/[_-]([a-z])/g, function (it) {
                return it[1].toUpperCase();
            });
        };
    });
    require.define('/lib\\lang\\en.ls', function (module, exports, __dirname, __filename, process) {
        module.exports = {
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
            login: 'Login',
            newTopic: 'New topic'
        };
    });
    require.define('/lib\\lang\\fr.ls', function (module, exports, __dirname, __filename, process) {
        module.exports = {
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
            login: 'Connexion',
            newTopic: 'Nouveau sujet'
        };
    });
    require.define('/node_modules\\dom\\index.ls', function (module, exports, __dirname, __filename, process) {
        module.exports = {
            $: require('/lib\\dom\\$.ls'),
            $$: require('/lib\\dom\\$$.ls'),
            el: require('/lib\\dom\\el.ls'),
            node: require('/lib\\dom\\node.ls')
        };
    });
    require.define('/lib\\dom\\node.ls', function (module, exports, __dirname, __filename, process) {
        module.exports = function () {
            function node(tag, props) {
                props == null && (props = {});
                return import$(document.createElement(tag), props);
            }
            return node;
        }();
        function import$(obj, src) {
            var own = {}.hasOwnProperty;
            for (var key in src)
                if (own.call(src, key))
                    obj[key] = src[key];
            return obj;
        }
    });
    require.define('/lib\\dom\\el.ls', function (module, exports, __dirname, __filename, process) {
        module.exports = function (it) {
            var x$;
            x$ = document.createElement('div');
            x$.innerHTML = it;
            return x$.firstElementChild;
            return x$;
        };
    });
    require.define('/lib\\dom\\$$.ls', function (module, exports, __dirname, __filename, process) {
        module.exports = function (it) {
            return document.querySelectorAll(it);
        };
    });
    require.define('/lib\\dom\\$.ls', function (module, exports, __dirname, __filename, process) {
        module.exports = function (it) {
            return document.querySelector(it);
        };
    });
    require.define('/src\\cheatsheet\\bind-key.ls', function (module, exports, __dirname, __filename, process) {
        var lang, $, bindKey, cheatsheet;
        lang = require('/node_modules\\lang\\index.ls');
        $ = require('/node_modules\\dom\\index.ls').$;
        module.exports = bindKey = function (bind, langKey, cb) {
            cheatsheet[bind] = lang(langKey);
            bind = bind.toUpperCase().charCodeAt();
            document.addEventListener('keydown', function (it) {
                if (bind !== it.keyCode) {
                    return;
                }
                if (it.target !== $('html')) {
                    return;
                }
                it.preventDefault();
                cb();
            });
        };
        bindKey.cheatsheet = cheatsheet = {};
    });
    require.define('/src\\forum-layout\\hide-mar.ls', function (module, exports, __dirname, __filename, process) {
        var $;
        $ = require('/node_modules\\dom\\index.ls').$;
        if (!$('.regular > .unread:not(.hidden)')) {
            require('/src\\forum-options.ls').removeChild(require('/src\\forum-layout\\mar.ls'));
        }
    });
    require.define('/src\\forum-layout\\mar.ls', function (module, exports, __dirname, __filename, process) {
        var lang, forumOptions, tbodyRegular, w, ref$, fetchSiblings, node, allRead, buttonMar, split$ = ''.split;
        lang = require('/node_modules\\lang\\index.ls');
        forumOptions = require('/src\\forum-options.ls');
        tbodyRegular = require('/src\\tbody-regular.ls');
        w = require('/src\\w.ls');
        ref$ = require('/node_modules\\dom\\index.ls'), fetchSiblings = ref$.fetchSiblings, node = ref$.node;
        allRead = false;
        module.exports = buttonMar = node('a', {
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
                    if (row.classList.contains('read')) {
                        continue;
                    }
                    topicId = row.id.slice('postRow'.length);
                    siblings = fetchSiblings(row.children[0], { slice: 5 });
                    w.localStorage.setItem('topic_' + topicId, split$.call(siblings.lastPost.children[0].href, '#')[1]);
                    w.localStorage.setItem('topic_lp_' + topicId, siblings.author.innerHTML.trim());
                    row.classList.add('read');
                }
                forumOptions.removeChild(buttonMar);
            }
        });
        buttonMar.style.cursor = 'pointer';
        forumOptions.appendChild(buttonMar);
    });
    require.define('/src\\w.ls', function (module, exports, __dirname, __filename, process) {
        var w;
        w = typeof unsafeWindow != 'undefined' && unsafeWindow !== null ? unsafeWindow : window;
        if (!w.Cms) {
            w = w.window = function () {
                var el;
                el = document.createElement('p');
                el.setAttribute('onclick', 'return window;');
                return el.onclick();
            }.call(this);
        }
        module.exports = w;
    });
    require.define('/src\\tbody-regular.ls', function (module, exports, __dirname, __filename, process) {
        var $;
        $ = require('/node_modules\\dom\\index.ls').$;
        module.exports = $('tbody.regular');
    });
    require.define('/src\\forum-options.ls', function (module, exports, __dirname, __filename, process) {
        var $;
        $ = require('/node_modules\\dom\\index.ls').$;
        module.exports = $('.forum-options');
    });
    require.define('/src\\forum-topics\\index.ls', function (module, exports, __dirname, __filename, process) {
        var lastUpdated, moveRedirects, hideTopic, times;
        lastUpdated = require('/src\\forum-topics\\last-updated.ls');
        moveRedirects = require('/src\\forum-topics\\move-redirects.ls');
        hideTopic = require('/src\\forum-topics\\hide-topic.ls');
        times = require('/src\\forum-topics\\times.ls');
    });
    require.define('/src\\forum-topics\\times.ls', function (module, exports, __dirname, __filename, process) {
        var lang, $$, relative, units, timestamp, postTitles, i$, len$, postTitle, total, j$, ref$, len1$, timespan, ref1$, count, unit, date, timeout, refresh, split$ = ''.split;
        lang = require('/node_modules\\lang\\index.ls');
        $$ = require('/node_modules\\dom\\index.ls').$$;
        relative = require('/node_modules\\relative-date-component\\index.js');
        units = {
            second: 1000,
            minute: 60000,
            hour: 3600000,
            day: 86400000
        };
        timestamp = new Date().getTime();
        postTitles = $$('.post-title[data-simplified-time]');
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
                postTitle.querySelector('.simplified-time').innerHTML = relative(d);
            }
            return setTimeout(refresh, timeout);
        };
        refresh();
    });
    require.define('/node_modules\\relative-date-component\\index.js', function (module, exports, __dirname, __filename, process) {
        module.exports = relative;
        var second = 1000;
        var minute = 60 * second;
        var hour = 60 * minute;
        var day = 24 * hour;
        var week = 7 * day;
        var year = day * 365;
        var month = year / 12;
        function relative(date, other) {
            other = other || new Date();
            var ms = Math.abs(other - date);
            if (ms < second)
                return '';
            if (ms == second)
                return 'one second';
            if (ms < minute)
                return Math.ceil(ms / second) + ' seconds';
            if (ms == minute)
                return 'one minute';
            if (ms < hour)
                return Math.ceil(ms / minute) + ' minutes';
            if (ms == hour)
                return 'one hour';
            if (ms < day)
                return Math.ceil(ms / hour) + ' hours';
            if (ms == day)
                return 'one day';
            if (ms < week)
                return Math.ceil(ms / day) + ' days';
            if (ms == week)
                return 'one week';
            if (ms < month)
                return Math.ceil(ms / week) + ' weeks';
            if (ms == month)
                return 'one month';
            if (ms < year)
                return Math.ceil(ms / month) + ' months';
            if (ms == year)
                return 'one year';
            return Math.round(ms / year) + ' years';
        }
    });
    require.define('/src\\forum-topics\\hide-topic.ls', function (module, exports, __dirname, __filename, process) {
        var tbodyRegular, w, ref$, $, $$, el, templateHideTopic, hiddenTopics, i$, len$, postPages, that, tr, topicId, split$ = ''.split, join$ = [].join;
        tbodyRegular = require('/src\\tbody-regular.ls');
        w = require('/src\\w.ls');
        ref$ = require('/node_modules\\dom\\index.ls'), $ = ref$.$, $$ = ref$.$$, el = ref$.el;
        templateHideTopic = require('/src\\forum-topics\\templates\\hide-topic.jadels');
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
        for (i$ = 0, len$ = (ref$ = $$('tbody.regular .post-pages')).length; i$ < len$; ++i$) {
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
        if ($('tbody.regular tr:not(.hidden):not(.read)')) {
            clearTimeout(require('/src\\forum-layout\\check-updates.ls'));
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
            x$ = el(templateHideTopic({ hidden: in$(topicId, hiddenTopics) }));
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
    require.define('/src\\forum-layout\\check-updates.ls', function (module, exports, __dirname, __filename, process) {
        var lang, tbodyRegular, ajax, ref$, $, node, firstTopicId, trHtml, aEndHtml, tbodyHtml, x$, h1, refresh, timeout;
        lang = require('/node_modules\\lang\\index.ls');
        tbodyRegular = require('/src\\tbody-regular.ls');
        ajax = require('/node_modules\\ajax\\index.ls');
        ref$ = require('/node_modules\\dom\\index.ls'), $ = ref$.$, node = ref$.node;
        firstTopicId = tbodyRegular.children[0].id.slice('postRow'.length);
        trHtml = '<tr id="postRow' + firstTopicId;
        aEndHtml = 'data-tooltip-options=\'{"location": "mouse"}\'>';
        tbodyHtml = '<tbody class="regular">';
        x$ = $('#forum-actions-top');
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
                    h1.innerHTML += ' <u>' + lang.noNew + '</u>';
                    setTimeout(function () {
                        return h1.innerHTML = '';
                    }, 1500);
                    setTimeout(refresh, timeout);
                } else {
                    startPos = aEndHtml.length + afterRegular.indexOf(aEndHtml);
                    afterRegular = afterRegular.slice(startPos);
                    title = afterRegular.slice(0, afterRegular.indexOf('<')).trim();
                    h1.innerHTML = '<a href=\'' + document.location + '\'>' + lang.newMessages + '</a> : ' + [title.length > 30 ? '<br />' : void 8] + title;
                }
            });
        };
        timeout = 15 * 1000;
        module.exports = setTimeout(refresh, timeout);
    });
    require.define('/node_modules\\ajax\\index.ls', function (module, exports, __dirname, __filename, process) {
        module.exports = {
            get: function (url, success) {
                var x$;
                x$ = new XMLHttpRequest();
                x$.open('GET', url);
                x$.onload = success;
                x$.send();
                return x$;
            }
        };
    });
    require.define('/src\\forum-topics\\templates\\hide-topic.jadels', function (module, exports, __dirname, __filename, process) {
        var join;
        join = function (it) {
            if (it) {
                return it.join('');
            } else {
                return '';
            }
        };
        module.exports = function (locals, extra) {
            return '' + ((locals.hidden ? '<a class="last-read show-topic">\u2713</a>' : '<a class="last-read hide-topic">X</a>') || '');
        };
    });
    require.define('/src\\forum-topics\\move-redirects.ls', function (module, exports, __dirname, __filename, process) {
        var tbodyRegular, i$, ref$, len$, status, tr;
        tbodyRegular = require('/src\\tbody-regular.ls');
        for (i$ = 0, len$ = (ref$ = tbodyRegular.querySelectorAll('.post-status')).length; i$ < len$; ++i$) {
            status = ref$[i$];
            tr = status.parentNode.parentNode;
            tr.className += ' hidden redirect';
            tbodyRegular.removeChild(tr);
            tbodyRegular.appendChild(tr);
        }
    });
    require.define('/src\\forum-topics\\last-updated.ls', function (module, exports, __dirname, __filename, process) {
        var fetchSiblings, lang, simplifyTime, ref$, $, $$, el, node, templateAuthor, templateTtLastUpdated, templateDefaultPagination, characters, res$, i$, len$, name, lastPostTh, TSTATE_UNK, TSTATE_ALR, TSTATE_CHK, hasUnread, post, children, div, a, td, lastPostTd, topicId, ref1$, pages, lastPost, lastPostLink, replies, author, postCount, postOnly, text, isCm, that, authorName, inlineText, simplifiedTime, state, replace$ = ''.replace, split$ = ''.split, out$ = typeof exports != 'undefined' && exports || this, join$ = [].join, slice$ = [].slice;
        fetchSiblings = require('/node_modules\\fetch-siblings\\index.ls');
        lang = require('/node_modules\\lang\\index.ls'), simplifyTime = lang.simplifyTime;
        ref$ = require('/node_modules\\dom\\index.ls'), $ = ref$.$, $$ = ref$.$$, el = ref$.el, node = ref$.node;
        templateAuthor = require('/src\\forum-topics\\templates\\author.jadels');
        templateTtLastUpdated = require('/src\\forum-topics\\templates\\tt-last-updated.jadels');
        templateDefaultPagination = require('/src\\forum-topics\\templates\\default-pagination.jadels');
        characters = $$('.char-wrapper .name');
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
        $('.post-th').appendChild(lastPostTh);
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
                pages.innerHTML = templateDefaultPagination({ href: a.href });
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
            post.appendChild(el(templateTtLastUpdated({ text: text })));
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
                td.className = 'unread';
            }
            if (state !== TSTATE_UNK) {
                a.href = (ref1$ = pages.getElementsByTagName('a'))[ref1$.length - 1].href;
            }
            markState(post, state);
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
            return templateAuthor({
                name: it,
                own: in$(it, characters),
                cm: isCm
            });
        }
    });
    require.define('/src\\forum-topics\\templates\\default-pagination.jadels', function (module, exports, __dirname, __filename, process) {
        var join;
        join = function (it) {
            if (it) {
                return it.join('');
            } else {
                return '';
            }
        };
        module.exports = function (locals, extra) {
            return '<ul class="ui-pagination"><li><a data-pagenum=\'1\' rel="np" href="' + locals.href + '">1</a></li></ul>';
        };
    });
    require.define('/src\\forum-topics\\templates\\tt-last-updated.jadels', function (module, exports, __dirname, __filename, process) {
        var join;
        join = function (it) {
            if (it) {
                return it.join('');
            } else {
                return '';
            }
        };
        module.exports = function (locals, extra) {
            return '<div class="tt-last-updated"><br/>' + (locals.text || '') + '</div>';
        };
    });
    require.define('/src\\forum-topics\\templates\\author.jadels', function (module, exports, __dirname, __filename, process) {
        var join;
        join = function (it) {
            if (it) {
                return it.join('');
            } else {
                return '';
            }
        };
        module.exports = function (locals, extra) {
            return '    <span class="' + [
                'poster',
                locals.own ? 'own-poster' : void 8,
                locals.cm ? 'type-blizzard' : void 8
            ].join(' ') + '">' + ((locals.cm ? '<img src="/wow/static/images/layout/cms/icon_blizzard.gif" alt="CM"/>' : void 8) || '') + '\n' + (locals.name || '') + '</span>';
        };
    });
    require.define('/node_modules\\fetch-siblings\\index.ls', function (module, exports, __dirname, __filename, process) {
        module.exports = function () {
            function fetchSiblings(elem, arg$) {
                var slice, ref$, indexBy, results$ = {};
                slice = (ref$ = arg$.slice) != null ? ref$ : 0, indexBy = (ref$ = arg$.indexBy) != null ? ref$ : 'className';
                while (elem != null && (elem = elem.nextElementSibling)) {
                    results$[elem[indexBy].slice(slice)] = elem;
                }
                return results$;
            }
            return fetchSiblings;
        }();
    });
    require.define('/src\\forum-layout\\index.ls', function (module, exports, __dirname, __filename, process) {
        var jumps, checkUpdates, mar, moveActions, stickies;
        jumps = require('/src\\forum-layout\\jumps\\index.ls');
        checkUpdates = require('/src\\forum-layout\\check-updates.ls');
        mar = require('/src\\forum-layout\\mar.ls');
        moveActions = require('/src\\forum-layout\\move-actions.ls');
        stickies = require('/src\\forum-layout\\stickies.ls');
    });
    require.define('/src\\forum-layout\\stickies.ls', function (module, exports, __dirname, __filename, process) {
        var lang, forumOptions, w, ref$, $, node, buttonSticky;
        lang = require('/node_modules\\lang\\index.ls');
        forumOptions = require('/src\\forum-options.ls');
        w = require('/src\\w.ls');
        ref$ = require('/node_modules\\dom\\index.ls'), $ = ref$.$, node = ref$.node;
        if ('show' !== w.localStorage.getItem('show-stickies')) {
            $('.sticky').style.display = 'none';
        }
        module.exports = buttonSticky = node('a', {
            innerHTML: 'Post-its',
            title: lang.toggleSticky,
            onclick: function () {
                var s;
                (s = $('.sticky').style).display = s.display === 'none' ? '' : 'none';
                w.localStorage.setItem('show-stickies', s.display || 'show');
            }
        });
        module.exports.style.cursor = 'pointer';
        forumOptions.appendChild(buttonSticky);
    });
    require.define('/src\\forum-layout\\move-actions.ls', function (module, exports, __dirname, __filename, process) {
        var $, x$;
        $ = require('/node_modules\\dom\\index.ls').$;
        x$ = $('.forum-options');
        x$.parentNode.removeChild(x$);
        $('.content-trail').appendChild(x$);
    });
    require.define('/src\\forum-layout\\jumps\\index.ls', function (module, exports, __dirname, __filename, process) {
        var newTopic;
        newTopic = require('/src\\forum-layout\\jumps\\new-topic.ls');
    });
    require.define('/src\\forum-layout\\jumps\\new-topic.ls', function (module, exports, __dirname, __filename, process) {
        var bindKey, w, $;
        bindKey = require('/src\\cheatsheet\\bind-key.ls');
        w = require('/src\\w.ls');
        $ = require('/node_modules\\dom\\index.ls').$;
        if (!$('a.button1.disabled')) {
            bindKey('n', 'new-topic', function () {
                document.location += 'topic';
            });
        }
    });
    require.define('/src\\forum.ls', function (module, exports, __dirname, __filename, process) {
        var that, ref$, split$ = ''.split;
        module.exports = (that = document.getElementById('posts')) ? (that.dataset.id = split$.call((ref$ = split$.call(document.location, '/'))[ref$.length - 2], '?')[0], that) : null;
    });
    require.define('/src\\reply\\index.ls', function (module, exports, __dirname, __filename, process) {
        var clearTextarea, memebox, preview, quickQuote, rememberReply;
        clearTextarea = require('/src\\reply\\clear-textarea.ls');
        memebox = require('/src\\reply\\memebox.ls');
        preview = require('/src\\reply\\preview.ls');
        quickQuote = require('/src\\reply\\quick-quote.ls');
        rememberReply = require('/src\\reply\\remember-reply.ls');
    });
    require.define('/src\\reply\\remember-reply.ls', function (module, exports, __dirname, __filename, process) {
        var textarea, topic, $, submit;
        textarea = require('/src\\textarea.ls');
        topic = require('/src\\topic.ls');
        $ = require('/node_modules\\dom\\index.ls').$;
        submit = $('.post [type=submit]');
        if (!textarea.value) {
            textarea.value = localStorage.getItem('post_' + topic.dataset.id) || '';
        }
        textarea.onkeyup = function () {
            return localStorage.setItem('post_' + topic.dataset.id, this.value);
        };
        submit.onclick = function () {
            return localStorage.setItem('post_' + topic.dataset.id, '');
        };
    });
    require.define('/src\\topic.ls', function (module, exports, __dirname, __filename, process) {
        var that, x$, ref$, i$, replace$ = ''.replace, split$ = ''.split;
        module.exports = (that = document.getElementById('thread')) ? (x$ = that.dataset, x$.url = replace$.call(split$.call(document.location, '?')[0], /#[0-9]+/, ''), x$.page = ((ref$ = /\?page=([0-9]+)/.exec(document.location)) != null ? ref$[1] : void 8) || 1, ref$ = split$.call(x$.url, '/'), i$ = ref$.length - 2, x$.topicId = ref$[i$], x$.id = ref$[i$ + 1], ref$, that) : null;
    });
    require.define('/src\\textarea.ls', function (module, exports, __dirname, __filename, process) {
        var topic, $;
        topic = require('/src\\topic.ls');
        $ = require('/node_modules\\dom\\index.ls').$;
        module.exports = topic ? $('#post-edit textarea') : null;
    });
    require.define('/src\\reply\\quick-quote.ls', function (module, exports, __dirname, __filename, process) {
        var bindKey, textarea, w, $;
        bindKey = require('/src\\cheatsheet\\bind-key.ls');
        textarea = require('/src\\textarea.ls');
        w = require('/src\\w.ls');
        $ = require('/node_modules\\dom\\index.ls').$;
        bindKey('r', 'quick-quote', function () {
            var that;
            if (that = w.getSelection().toString()) {
                textarea.value += (textarea.value ? '\n' : '') + ('[quote]' + that + '[/quote]');
                textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
                textarea.focus();
            }
            $('#forum-actions-bottom').scrollIntoView();
        });
    });
    require.define('/src\\reply\\preview.ls', function (module, exports, __dirname, __filename, process) {
        var w, autolink, $, postPreview, old;
        w = require('/src\\w.ls');
        autolink = require('/node_modules\\autolink\\index.ls');
        $ = require('/node_modules\\dom\\index.ls').$;
        postPreview = $('#post-preview');
        old = w.BML.preview.bind(w.BML);
        w.BML.preview = function (content, target, callback) {
            return old(content, target, function () {
                callback();
                autolink(postPreview);
            });
        };
    });
    require.define('/node_modules\\autolink\\index.ls', function (module, exports, __dirname, __filename, process) {
        var extensions, rules, ajax, replace$ = ''.replace;
        extensions = '(?:com|net|org|eu|fr|jp|us|co.uk|me)';
        rules = [
            [
                /(?:https?:\/\/)?(?:(?:www|m)\.)?(youtu\.be\/([\w\-_]+)(\?[&=\w\-_;\#]*)?|youtube\.com\/watch\?([&=\w\-_;\.\?\#\%]*)v=([\w\-_]+)([&=\w\-\._;\?\#\%]*))/g,
                '<iframe class="youtube-player" type="text/html" width="640" height="385" src="http://www.youtube.com/embed/$2$5#$3$4$6" frameborder="0"></iframe>'
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
        module.exports = elAutolink;
        ajax = require('/lib\\autolink\\node_modules\\ajax\\index.ls');
        function elAutolink(el) {
            var h, r, ref$, url, e;
            try {
                h = autolink(el.innerHTML);
                r = /\>((?:http:\/\/)?[a-z]{2}\.battle\.net\/[^<\s.]*)/g;
                while ((ref$ = r.exec(h)) != null && (url = ref$[1], ref$)) {
                    fn$.call(this, url);
                }
                return el.innerHTML = h;
            } catch (e$) {
                e = e$;
                return console.log('Unable to generate valid HTML : ' + h + ' (' + e + ')');
            }
            function fn$(url) {
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
        function autolink(it) {
            var i$, ref$, len$, ref1$, pattern, replacement;
            for (i$ = 0, len$ = (ref$ = rules).length; i$ < len$; ++i$) {
                ref1$ = ref$[i$], pattern = ref1$[0], replacement = ref1$[1];
                it = it.replace(pattern, replacement);
            }
            return it;
        }
    });
    require.define('/lib\\autolink\\node_modules\\ajax\\index.ls', function (module, exports, __dirname, __filename, process) {
        module.exports = {
            get: function (url, success) {
                var x$;
                x$ = new XMLHttpRequest();
                x$.open('GET', url);
                x$.onload = success;
                x$.send();
                return x$;
            }
        };
    });
    require.define('/src\\reply\\memebox.ls', function (module, exports, __dirname, __filename, process) {
        var memes, textarea, ref$, $, el, templateMemebox, that, addMeme, appendMeme, memebox, ul;
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
            escalated: 'http://cdn.memegenerator.net/instances/250x250/30199807.jpg',
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
        textarea = require('/src\\textarea.ls');
        ref$ = require('/node_modules\\dom\\index.ls'), $ = ref$.$, el = ref$.el;
        templateMemebox = require('/src\\reply\\templates\\memebox.jadels');
        if (that = $('.post.general')) {
            that.removeChild((ref$ = that.children)[ref$.length - 1]);
            addMeme = function (url) {
                return function () {
                    return textarea.value += [textarea.value ? '\n' : void 8] + url;
                };
            };
            appendMeme = function (name, url) {
                var x$;
                return ul.appendChild((x$ = document.createElement('li'), x$.innerHTML = name, x$.onclick = addMeme(url), x$));
            };
            memebox = el(templateMemebox());
            ul = memebox.querySelector('#memes');
            memebox.querySelector('#meme-search').onkeyup = function () {
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
                        approximates.push([
                            name,
                            url
                        ]);
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
            that.appendChild(memebox);
        }
    });
    require.define('/src\\reply\\templates\\memebox.jadels', function (module, exports, __dirname, __filename, process) {
        var join;
        join = function (it) {
            if (it) {
                return it.join('');
            } else {
                return '';
            }
        };
        module.exports = function (locals, extra) {
            return '<div id="memebox"><h1>MemeBox</h1><br/><input id="meme-search" placeholder="meme" autocomplete="off" size="15"/><ul id="memes"></ul></div>';
        };
    });
    require.define('/src\\reply\\clear-textarea.ls', function (module, exports, __dirname, __filename, process) {
        var textarea, topic, ref$, $, el, templateClearTextarea, clearer, that;
        textarea = require('/src\\textarea.ls');
        topic = require('/src\\topic.ls');
        ref$ = require('/node_modules\\dom\\index.ls'), $ = ref$.$, el = ref$.el;
        templateClearTextarea = require('/src\\reply\\templates\\clear-textarea.jadels');
        clearer = el(templateClearTextarea());
        if (that = $('.editor1')) {
            that.insertBefore(clearer, textarea);
            clearer.onclick = function () {
                textarea.value = '';
                localStorage.removeItem('post_' + topic.dataset.id);
            };
        }
    });
    require.define('/src\\reply\\templates\\clear-textarea.jadels', function (module, exports, __dirname, __filename, process) {
        var join;
        join = function (it) {
            if (it) {
                return it.join('');
            } else {
                return '';
            }
        };
        module.exports = function (locals, extra) {
            return '<div class="clear-textarea">X</div>';
        };
    });
    require.define('/src\\topic-posts\\index.ls', function (module, exports, __dirname, __filename, process) {
        var jumps, autolink, updateCount;
        jumps = require('/src\\topic-posts\\jumps\\index.ls');
        autolink = require('/src\\topic-posts\\autolink.ls');
        updateCount = require('/src\\topic-posts\\update-count.ls');
    });
    require.define('/src\\topic-posts\\update-count.ls', function (module, exports, __dirname, __filename, process) {
        var topic, $$, pages, postCount, ref$, lastPosterName;
        topic = require('/src\\topic.ls');
        $$ = require('/node_modules\\dom\\index.ls').$$;
        pages = $$('#forum-actions-top .ui-pagination li:not(.cap-item)');
        if (pages) {
            if (!pages.length || pages.length && 'current' === pages[pages.length - 1].className || !localStorage.getItem('topic_' + topic.dataset.id)) {
                postCount = (ref$ = topic.getElementsByClassName('post-info'))[ref$.length - 1].getElementsByTagName('a')[0].getAttribute('href').slice(1);
                lastPosterName = (ref$ = topic.getElementsByClassName('char-name-code'))[ref$.length - 1].innerHTML.trim();
                localStorage.setItem('topic_' + topic.dataset.id, postCount);
                localStorage.setItem('topic_lp_' + topic.dataset.id, lastPosterName);
            }
        }
    });
    require.define('/src\\topic-posts\\autolink.ls', function (module, exports, __dirname, __filename, process) {
        var autolink, $$, i$, ref$, len$, post;
        autolink = require('/node_modules\\autolink\\index.ls');
        $$ = require('/node_modules\\dom\\index.ls').$$;
        for (i$ = 0, len$ = (ref$ = $$('.post-detail')).length; i$ < len$; ++i$) {
            post = ref$[i$];
            if (post.parentNode.parentNode.parentNode.parentNode.parentNode.classList.contains('blizzard')) {
                continue;
            }
            autolink(post);
        }
    });
    require.define('/src\\topic-posts\\jumps\\index.ls', function (module, exports, __dirname, __filename, process) {
        var unread;
        unread = require('/src\\topic-posts\\jumps\\unread.ls');
    });
    require.define('/src\\topic-posts\\jumps\\unread.ls', function (module, exports, __dirname, __filename, process) {
        var topic, bindKey, $$, lastPostId;
        topic = require('/src\\topic.ls');
        bindKey = require('/src\\cheatsheet\\bind-key.ls');
        $$ = require('/node_modules\\dom\\index.ls').$$;
        if (lastPostId = localStorage.getItem('topic_' + topic.dataset.id)) {
            bindKey('j', 'jump-to-last-read', function () {
                var lastPostPage, ref$;
                lastPostPage = Math.ceil(lastPostId / 20);
                if (topic.dataset.page < lastPostPage) {
                    document.location = topic.dataset.url + ('?page=' + lastPostPage);
                } else {
                    if ((ref$ = $$('.post-detail')[lastPostId % 20 - 1]) != null) {
                        ref$.scrollIntoView();
                    }
                }
            });
        }
    });
    require.define('/src\\topic-characters\\index.ls', function (module, exports, __dirname, __filename, process) {
        var contextLinks, improveTopic, multiChars;
        contextLinks = require('/src\\topic-characters\\context-links.ls');
        improveTopic = require('/src\\topic-characters\\improve-topic.ls');
        multiChars = require('/src\\topic-characters\\multi-chars.ls');
    });
    require.define('/src\\topic-characters\\multi-chars.ls', function (module, exports, __dirname, __filename, process) {
        var ref$, $$, el, templateMultiChars, accountCharacters, that, modified, i$, len$, postCharacter, iconIgnore, link, ref1$, account, current, characters, postDetail, height, toggle, ul, limit, i, replace$ = ''.replace;
        ref$ = require('/node_modules\\dom\\index.ls'), $$ = ref$.$$, el = ref$.el;
        templateMultiChars = require('/src\\topic-characters\\templates\\multi-chars.jadels');
        accountCharacters = (that = localStorage.getItem('accountCharacters')) ? JSON.parse(that) : {};
        function clean(it) {
            it = replace$.call(it, 'context-link', '');
            it = replace$.call(it, 'xmlns="http://www.w3.org/1999/xhtml" ', '');
            return it;
        }
        modified = false;
        for (i$ = 0, len$ = (ref$ = $$('.post-character')).length; i$ < len$; ++i$) {
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
        for (i$ = 0, len$ = (ref$ = $$('.post:not(.hidden) .post-character')).length; i$ < len$; ++i$) {
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
            postCharacter.appendChild(el(templateMultiChars({
                toggle: toggle,
                current: current,
                characters: characters
            })));
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
    require.define('/src\\topic-characters\\templates\\multi-chars.jadels', function (module, exports, __dirname, __filename, process) {
        var lang, join;
        lang = require('/node_modules\\lang\\index.ls');
        join = function (it) {
            if (it) {
                return it.join('');
            } else {
                return '';
            }
        };
        module.exports = function (locals, extra) {
            var character;
            return '    <div id="account-characters"><h1 class="toggle">' + (lang('otherCharacters') || '') + '\n' + ((locals.toggle ? '<span class="toggler">' + (' [+]' || '') + '</span>' : void 8) || '') + '</h1><br/><ul>' + (join(function () {
                var i$, ref$, len$, results$ = [];
                for (i$ = 0, len$ = (ref$ = locals.characters).length; i$ < len$; ++i$) {
                    character = ref$[i$];
                    if (character !== locals.current) {
                        results$.push('<li style="' + [locals.toggle ? 'display: none' : void 8] + '">' + (character || '') + '</li>');
                    }
                }
                return results$;
            }()) || '') + '</ul></div>';
        };
    });
    require.define('/src\\topic-characters\\improve-topic.ls', function (module, exports, __dirname, __filename, process) {
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
    require.define('/src\\topic-characters\\context-links.ls', function (module, exports, __dirname, __filename, process) {
        var topic, el, templateContextLinks, i$, ref$, len$, context, extraContext;
        topic = require('/src\\topic.ls');
        el = require('/node_modules\\dom\\index.ls').el;
        templateContextLinks = require('/src\\topic-characters\\templates\\context-links.jadels');
        for (i$ = 0, len$ = (ref$ = topic.querySelectorAll('.context-links')).length; i$ < len$; ++i$) {
            context = ref$[i$];
            if (context.children.length === 1) {
                continue;
            }
            extraContext = el(templateContextLinks({ link: context.children[0].href }));
            context.insertBefore(extraContext, context.querySelector('.link-last'));
        }
    });
    require.define('/src\\topic-characters\\templates\\context-links.jadels', function (module, exports, __dirname, __filename, process) {
        var join;
        join = function (it) {
            if (it) {
                return it.join('');
            } else {
                return '';
            }
        };
        module.exports = function (locals, extra) {
            return '<span class="extra-links"><a href="' + locals.link + 'achievement" class="link-first extra-link">HF</a><a href="' + locals.link + 'statistic#21:152" class="link-first extra-link">PvP</a></span>';
        };
    });
    require.define('/src\\fix\\index.ls', function (module, exports, __dirname, __filename, process) {
        var htmlOverrides, menu, setView, crabby;
        htmlOverrides = require('/src\\fix\\html-overrides.ls');
        menu = require('/src\\fix\\menu.ls');
        setView = require('/src\\fix\\set-view.ls');
        crabby = require('/src\\fix\\crabby.ls');
    });
    require.define('/src\\fix\\crabby.ls', function (module, exports, __dirname, __filename, process) {
        var that;
        if (that = document.getElementById('crabby-shell')) {
            that.parentNode.removeChild(that);
        } else {
            setTimeout(function () {
                var that;
                if (that = document.getElementById('crabby-shell')) {
                    return that.parentNode.removeChild(that);
                }
            }, 300);
        }
    });
    require.define('/src\\fix\\set-view.ls', function (module, exports, __dirname, __filename, process) {
        var w, ref$;
        w = require('/src\\w.ls');
        if ((ref$ = w.Cms) != null) {
            ref$.Forum.setView = function (type, target) {
                w.Cookie.create('forumView', type, {
                    path: '/',
                    expires: 8760
                });
                w.$(target).addClass('active').siblings().removeClass('active');
                return w.$('#posts').attr('class', type);
            };
        }
    });
    require.define('/src\\fix\\menu.ls', function (module, exports, __dirname, __filename, process) {
        var w, old;
        w = require('/src\\w.ls');
        old = w.Menu.show;
        w.Menu.show = function (arg$, arg1$, options) {
            var ref$, key$, x, ref1$;
            options == null && (options = {});
            (ref$ = w.Menu.dataIndex)[key$ = x = (ref1$ = options.set) != null ? ref1$ : 'base'] == null && (ref$[key$] = []);
            return old.apply(this, arguments);
        };
    });
    require.define('/src\\fix\\html-overrides.ls', function (module, exports, __dirname, __filename, process) {
        var lang, $, that, k, v, ref$;
        lang = require('/node_modules\\lang\\index.ls');
        $ = require('/node_modules\\dom\\index.ls').$;
        if (that = lang.htmlOverrides) {
            for (k in that) {
                v = that[k];
                if ((ref$ = $(k)) != null) {
                    ref$.innerHTML = v;
                }
            }
        }
    });
    require.define('/src\\jumps\\index.ls', function (module, exports, __dirname, __filename, process) {
        var top, $;
        top = require('/src\\jumps\\top.ls');
        $ = require('/node_modules\\dom\\index.ls').$;
        if (!$('.player-name')) {
            require('/src\\jumps\\login.ls');
        }
    });
    require.define('/src\\jumps\\login.ls', function (module, exports, __dirname, __filename, process) {
        var bindKey, w;
        bindKey = require('/src\\cheatsheet\\bind-key.ls');
        w = require('/src\\w.ls');
        bindKey('l', 'login', function () {
            w.Login.open('https://eu.battle.net/login/login.frag');
        });
    });
    require.define('/src\\jumps\\top.ls', function (module, exports, __dirname, __filename, process) {
        var bindKey, $;
        bindKey = require('/src\\cheatsheet\\bind-key.ls');
        $ = require('/node_modules\\dom\\index.ls').$;
        bindKey('t', 'page-top', function () {
            $('#logo').scrollIntoView();
        });
    });
    require.define('/src\\board\\css.ls', function (module, exports, __dirname, __filename, process) {
        var node, style;
        node = require('/node_modules\\dom\\index.ls').node;
        style = node('style', {
            type: 'text/css',
            innerHTML: '/*slake:build#compile-ls embeds css*/\n#forum-actions-top h1 {\n  text-align: center;\n  margin-left: 200px;\n}\n.forum .forum-actions {\n  padding: 0px;\n}\n.forum .actions-panel {\n  margin-right: 15px;\n}\n.forum .forum-options {\n  float: right;\n  right: auto;\n  position: relative;\n  margin-top: 25px;\n  margin-right: 15px;\n}\n.poster {\n  font-weight: bold;\n}\n.own-poster {\n  text-decoration: underline;\n}\na.show-topic {\n  cursor: pointer;\n  color: #008000;\n}\na.show-topic:hover {\n  color: #008000 !important;\n}\na.hide-topic {\n  cursor: pointer;\n  color: #f00;\n}\na.hide-topic:hover {\n  color: #f00 !important;\n}\n.last-read {\n  opacity: 0;\n}\ntr:hover .last-read {\n  opacity: 1;\n}\n.post-pages .last-read {\n  background-image: none !important;\n  background: none !important;\n}\ntr:not(.stickied) a[data-tooltip] {\n  display: inline !important;\n}\n#posts.advanced .tt-last-updated {\n  display: none;\n}\n#posts.advanced .post-author {\n  width: 15px;\n}\n#posts.advanced .post-views {\n  width: 15px;\n}\n#posts.advanced .post-lastPost {\n  width: 90px;\n  text-align: center;\n}\n#posts.advanced .post-lastPost .more-arrow {\n  display: none;\n}\n#posts.advanced .post-th .replies {\n  padding-right: 2px;\n  text-align: center;\n}\n#posts.advanced .post-th .poster {\n  text-align: right;\n  font-weight: normal;\n  padding-right: 5px;\n}\n#posts.advanced .post-th .last-post-th {\n  text-align: left;\n}\n#posts.advanced .post-last-updated {\n  width: 70px;\n}\n#posts.advanced .post-replies {\n  width: 10px;\n  text-align: right;\n  padding-right: 10px;\n}\n#posts.simple .tt-last-updated {\n  display: inline;\n}\n#posts.simple .last-post-th {\n  display: none;\n}\n#posts.simple .post-last-updated {\n  display: none;\n}\n.clear-textarea {\n  display: block;\n  margin: 1px 0 1px 553px;\n  font-weight: bold;\n  font-size: 2em;\n  position: absolute;\n  z-index: 2;\n  cursor: pointer;\n}\n#memebox {\n  position: relative;\n  float: right;\n  width: 150px;\n  top: 5px;\n}\n#memebox h1 {\n  font-size: 1.8em;\n  display: inline;\n}\n#memebox .hider {\n  color: #f00;\n  display: none;\n}\n#memebox:hover .hider {\n  display: inline;\n}\n#memebox .unhider {\n  color: #008000;\n  display: none;\n}\n#memebox:hover .unhider {\n  display: inline;\n}\n#memebox ul#memes {\n  margin-top: 10px;\n  margin-left: 30px;\n  list-style-type: circle;\n}\n#memebox li {\n  font-weight: bold;\n  color: link;\n  text-decoration: underline;\n}\n.context-links .extra-link {\n  background-image: none !important;\n  padding-left: 8px !important;\n  border-top-left-radius: 0px !important;\n  border-bottom-left-radius: 0px !important;\n}\n.ui-context {\n  width: 240px !important;\n}\n.karma {\n  white-space: normal !important;\n}\n.post-user .avatar {\n  top: 27px !important;\n}\n#account-characters {\n  margin-left: 30px;\n}\n#account-characters h1 {\n  display: inline;\n}\n#account-characters ul {\n  list-style: circle;\n  margin-left: 20px;\n}\n#account-characters a {\n  font-weight: bold;\n}\nimg.autolink {\n  border: 5px solid #000;\n  max-width: 540px;\n  max-height: 500px;\n}\n'
        });
        document.head.appendChild(style);
    });
    require.define('/src\\board\\content-class.ls', function (module, exports, __dirname, __filename, process) {
        var topic, forum, $, content;
        topic = require('/src\\topic.ls');
        forum = require('/src\\forum.ls');
        $ = require('/node_modules\\dom\\index.ls').$;
        content = $('#content');
        content.className = function () {
            switch (false) {
            case !topic:
                return 'topic';
            case !forum:
                return 'forum';
            default:
                return '';
            }
        }();
    });
    require('/src\\wowboardhelpers.ls');
}.call(this, this));