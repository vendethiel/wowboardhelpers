/*
// ==UserScript==
// @name WoW Board Helpers
// @description UserScript for the official WoW forum
// @match http://eu.battle.net/wow/fr/forum/*
// @match http://eu.battle.net/wow/en/forum/*
// @match http://us.battle.net/wow/en/forum/*
// @author Tel
// @version 3.1
// ==/UserScript==
 * changelog
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
        cheatsheet = require('/src\\cheatsheet\\index.ls').cheatsheet;
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
        var lang, $$, relativeTime, units, timestamp, postTitles, i$, len$, postTitle, total, j$, ref$, len1$, timespan, ref1$, count, unit, date, timeout, refresh, split$ = ''.split;
        lang = require('/node_modules\\lang\\index.ls');
        $$ = require('/node_modules\\dom\\index.ls').$$;
        relativeTime = require('/node_modules\\date\\index.ls').relativeTime;
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
                postTitle.querySelector('.simplified-time').innerHTML = relativeTime(d);
            }
            return setTimeout(refresh, timeout);
        };
        refresh();
    });
    require.define('/node_modules\\date\\index.ls', function (module, exports, __dirname, __filename, process) {
        module.exports = { relativeTime: require('/lib\\date\\relative-time.ls') };
    });
    require.define('/lib\\date\\relative-time.ls', function (module, exports, __dirname, __filename, process) {
        var lang, relativeTime;
        lang = require('/node_modules\\lang\\index.ls');
        module.exports = relativeTime = function (it) {
            var days, diff, hours, minutes, seconds;
            if ((days = (diff = Date.now() - it.getTime()) / 86400000) > 1) {
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
        var lang, tbodyRegular, superagent, ref$, $, node, firstTopicId, trHtml, aEndHtml, tbodyHtml, x$, h1, refresh, timeout;
        lang = require('/node_modules\\lang\\index.ls');
        tbodyRegular = require('/src\\tbody-regular.ls');
        superagent = require('/node_modules\\superagent\\lib\\node\\index.js');
        ref$ = require('/node_modules\\dom\\index.ls'), $ = ref$.$, node = ref$.node;
        firstTopicId = tbodyRegular.children[0].id.slice('postRow'.length);
        trHtml = '<tr id="postRow' + firstTopicId;
        aEndHtml = 'data-tooltip-options=\'{"location": "mouse"}\'>';
        tbodyHtml = '<tbody class="regular">';
        x$ = $('#forum-actions-top');
        x$.insertBefore(h1 = node('h1'), (ref$ = x$.children)[ref$.length - 1]);
        refresh = function () {
            return superagent('GET', document.location).end(function () {
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
    require.define('/node_modules\\superagent\\lib\\node\\index.js', function (module, exports, __dirname, __filename, process) {
        var Stream = require('/node_modules\\commonjs-everywhere\\core\\undefined.js').Stream, formidable = require('/node_modules\\superagent\\node_modules\\formidable\\lib\\index.js'), Response = require('/node_modules\\superagent\\lib\\node\\response.js'), parse = require('/node_modules\\commonjs-everywhere\\core\\undefined.js').parse, format = require('/node_modules\\commonjs-everywhere\\core\\undefined.js').format, methods = require('/node_modules\\superagent\\node_modules\\methods\\index.js'), utils = require('/node_modules\\superagent\\lib\\node\\utils.js'), Part = require('/node_modules\\superagent\\lib\\node\\part.js'), mime = require('/node_modules\\superagent\\node_modules\\mime\\mime.js'), https = require('/node_modules\\commonjs-everywhere\\core\\undefined.js'), http = require('/node_modules\\commonjs-everywhere\\core\\undefined.js'), fs = require('/node_modules\\commonjs-everywhere\\core\\undefined.js'), qs = require('/node_modules\\superagent\\node_modules\\qs\\index.js'), util = require('/node_modules\\commonjs-everywhere\\core\\undefined.js');
        exports = module.exports = request;
        exports.agent = require('/node_modules\\superagent\\lib\\node\\agent.js');
        exports.Part = Part;
        function noop() {
        }
        ;
        exports.Response = Response;
        mime.define({
            'application/x-www-form-urlencoded': [
                'form',
                'urlencoded',
                'form-data'
            ]
        });
        exports.protocols = {
            'http:': http,
            'https:': https
        };
        function isObject(obj) {
            return null != obj && 'object' == typeof obj;
        }
        exports.serialize = {
            'application/x-www-form-urlencoded': qs.stringify,
            'application/json': JSON.stringify
        };
        exports.parse = require('/node_modules\\superagent\\lib\\node\\parsers\\index.js');
        function Request(method, url) {
            var self = this;
            if ('string' != typeof url)
                url = format(url);
            this.method = method;
            this.url = url;
            this.header = {};
            this.writable = true;
            this._redirects = 0;
            this.redirects(5);
            this.attachments = [];
            this.cookies = '';
            this._redirectList = [];
            this.on('end', this.clearTimeout.bind(this));
            this.on('response', function (res) {
                self.callback(null, res);
            });
        }
        Request.prototype.__proto__ = Stream.prototype;
        Request.prototype.attach = function (field, file, filename) {
            this.attachments.push({
                field: field,
                path: file,
                part: new Part(this),
                filename: filename || file
            });
            return this;
        };
        Request.prototype.redirects = function (n) {
            this._maxRedirects = n;
            return this;
        };
        Request.prototype.part = function () {
            return new Part(this);
        };
        Request.prototype.set = function (field, val) {
            if (isObject(field)) {
                for (var key in field) {
                    this.set(key, field[key]);
                }
                return this;
            }
            this.request().setHeader(field, val);
            return this;
        };
        Request.prototype.get = function (field) {
            return this.request().getHeader(field);
        };
        Request.prototype.type = function (type) {
            return this.set('Content-Type', ~type.indexOf('/') ? type : mime.lookup(type));
        };
        Request.prototype.query = function (val) {
            var req = this.request();
            if ('string' != typeof val)
                val = qs.stringify(val);
            if (!val.length)
                return this;
            req.path += (~req.path.indexOf('?') ? '&' : '?') + val;
            return this;
        };
        Request.prototype.send = function (data) {
            var obj = isObject(data);
            var req = this.request();
            var type = req.getHeader('Content-Type');
            if (obj && isObject(this._data)) {
                for (var key in data) {
                    this._data[key] = data[key];
                }
            } else if ('string' == typeof data) {
                if (!type)
                    this.type('form');
                type = req.getHeader('Content-Type');
                if ('application/x-www-form-urlencoded' == type) {
                    this._data = this._data ? this._data + '&' + data : data;
                } else {
                    this._data = (this._data || '') + data;
                }
            } else {
                this._data = data;
            }
            if (!obj)
                return this;
            if (!type)
                this.type('json');
            return this;
        };
        Request.prototype.write = function (data, encoding) {
            return this.request().write(data, encoding);
        };
        Request.prototype.pipe = function (stream, options) {
            this.buffer(false);
            this.end().req.on('response', function (res) {
                res.pipe(stream, options);
            });
            return stream;
        };
        Request.prototype.buffer = function (val) {
            this._buffer = false === val ? false : true;
            return this;
        };
        Request.prototype.timeout = function (ms) {
            this._timeout = ms;
            return this;
        };
        Request.prototype.clearTimeout = function () {
            this._timeout = 0;
            clearTimeout(this._timer);
            return this;
        };
        Request.prototype.parse = function (fn) {
            this._parser = fn;
            return this;
        };
        Request.prototype.redirect = function (res) {
            var url = res.headers.location;
            if (!~url.indexOf('://')) {
                if (0 != url.indexOf('//')) {
                    url = '//' + this.host + url;
                }
                url = this.protocol + url;
            }
            var header = utils.cleanHeader(this.req._headers);
            delete this.req;
            this.method = 'HEAD' == this.method ? 'HEAD' : 'GET';
            this._data = null;
            this.url = url;
            this._redirectList.push(url);
            this.emit('redirect', res);
            this.set(header);
            this.end(this._callback);
            return this;
        };
        Request.prototype.auth = function (user, pass) {
            var str = new Buffer(user + ':' + pass).toString('base64');
            return this.set('Authorization', 'Basic ' + str);
        };
        Request.prototype.field = function (name, val) {
            this.part().name(name).write(val);
            return this;
        };
        Request.prototype.request = function () {
            if (this.req)
                return this.req;
            var self = this, options = {}, data = this._data, url = this.url;
            if (0 != url.indexOf('http'))
                url = 'http://' + url;
            url = parse(url, true);
            options.method = this.method;
            options.port = url.port;
            options.path = url.pathname;
            options.host = url.hostname;
            var mod = exports.protocols[url.protocol];
            var req = this.req = mod.request(options);
            req.setHeader('Accept-Encoding', 'gzip, deflate');
            this.protocol = url.protocol;
            this.host = url.host;
            req.on('drain', function () {
                self.emit('drain');
            });
            req.on('error', function (err) {
                if (self._aborted)
                    return;
                self.callback(err);
            });
            if (url.auth) {
                var auth = url.auth.split(':');
                this.auth(auth[0], auth[1]);
            }
            this.query(url.query);
            req.setHeader('Cookie', this.cookies);
            return req;
        };
        Request.prototype.callback = function (err, res) {
            var fn = this._callback;
            this.clearTimeout();
            if (2 == fn.length)
                return fn(err, res);
            if (err)
                return this.emit('error', err);
            fn(res);
        };
        Request.prototype.end = function (fn) {
            var self = this, data = this._data, req = this.request(), buffer = this._buffer, method = this.method, timeout = this._timeout;
            this._callback = fn || noop;
            if (timeout && !this._timer) {
                this._timer = setTimeout(function () {
                    var err = new Error('timeout of ' + timeout + 'ms exceeded');
                    err.timeout = timeout;
                    self._aborted = true;
                    req.abort();
                    self.callback(err);
                }, timeout);
            }
            if ('HEAD' != method && !req._headerSent) {
                if ('string' != typeof data) {
                    var serialize = exports.serialize[req.getHeader('Content-Type')];
                    if (serialize)
                        data = serialize(data);
                }
                if (data && !req.getHeader('Content-Length')) {
                    this.set('Content-Length', Buffer.byteLength(data));
                }
            }
            req.on('response', function (res) {
                var max = self._maxRedirects, mime = utils.type(res.headers['content-type'] || ''), type = mime.split('/'), subtype = type[1], type = type[0], multipart = 'multipart' == type, redirect = isRedirect(res.statusCode);
                if (redirect && self._redirects++ != max) {
                    return self.redirect(res);
                }
                if (/^(deflate|gzip)$/.test(res.headers['content-encoding'])) {
                    utils.unzip(req, res);
                }
                if (multipart)
                    buffer = false;
                if (multipart) {
                    var form = new formidable.IncomingForm();
                    form.parse(res, function (err, fields, files) {
                        if (err)
                            throw err;
                        var response = new Response(req, res);
                        response.body = fields;
                        response.files = files;
                        response.redirects = self._redirectList;
                        self.emit('end');
                        self.callback(null, response);
                    });
                    return;
                }
                var text = isText(mime);
                if (null == buffer && text)
                    buffer = true;
                var parse = 'text' == type ? exports.parse.text : exports.parse[mime];
                if (buffer)
                    parse = parse || exports.parse.text;
                if (self._parser)
                    parse = self._parser;
                if (parse) {
                    parse(res, function (err, obj) {
                        res.body = obj;
                    });
                }
                if (!buffer) {
                    self.res = res;
                    var response = new Response(self.req, self.res);
                    response.redirects = self._redirectList;
                    self.emit('response', response);
                    return;
                }
                self.res = res;
                res.on('end', function () {
                    var response = new Response(self.req, self.res);
                    response.redirects = self._redirectList;
                    self.emit('response', response);
                    self.emit('end');
                });
            });
            if (this.attachments.length)
                return this.writeAttachments();
            if (this._boundary)
                this.writeFinalBoundary();
            req.end(data);
            return this;
        };
        Request.prototype.writeFinalBoundary = function () {
            this.request().write('\r\n--' + this._boundary + '--');
        };
        Request.prototype.attachmentSize = function (fn) {
            var files = this.attachments, pending = files.length, bytes = 0, self = this;
            files.forEach(function (file) {
                fs.stat(file.path, function (err, s) {
                    if (s)
                        bytes += s.size;
                    --pending || fn(bytes);
                });
            });
        };
        Request.prototype.writeAttachments = function () {
            var files = this.attachments, req = this.request(), written = 0, self = this;
            this.attachmentSize(function (total) {
                function next() {
                    var file = files.shift();
                    if (!file) {
                        self.writeFinalBoundary();
                        return req.end();
                    }
                    file.part.attachment(file.field, file.filename);
                    var stream = fs.createReadStream(file.path);
                    stream.on('data', function (data) {
                        written += data.length;
                        file.part.write(data);
                        self.emit('progress', {
                            percent: written / total * 100 | 0,
                            written: written,
                            total: total
                        });
                    }).on('error', function (err) {
                        self.emit('error', err);
                    }).on('end', next);
                }
                next();
            });
        };
        exports.Request = Request;
        function request(method, url) {
            if ('function' == typeof url) {
                return new Request('GET', method).end(url);
            }
            if (1 == arguments.length) {
                return new Request('GET', method);
            }
            return new Request(method, url);
        }
        methods.forEach(function (method) {
            var name = 'delete' == method ? 'del' : method;
            method = method.toUpperCase();
            request[name] = function (url, fn) {
                var req = request(method, url);
                fn && req.end(fn);
                return req;
            };
        });
        function isText(mime) {
            var parts = mime.split('/');
            var type = parts[0];
            var subtype = parts[1];
            return 'text' == type || 'json' == subtype || 'x-www-form-urlencoded' == subtype;
        }
        function isRedirect(code) {
            return ~[
                301,
                302,
                303,
                305,
                307
            ].indexOf(code);
        }
    });
    require.define('/node_modules\\superagent\\lib\\node\\parsers\\index.js', function (module, exports, __dirname, __filename, process) {
        exports['application/x-www-form-urlencoded'] = require('/node_modules\\superagent\\lib\\node\\parsers\\urlencoded.js');
        exports['application/json'] = require('/node_modules\\superagent\\lib\\node\\parsers\\json.js');
        exports.text = require('/node_modules\\superagent\\lib\\node\\parsers\\text.js');
    });
    require.define('/node_modules\\superagent\\lib\\node\\parsers\\text.js', function (module, exports, __dirname, __filename, process) {
        module.exports = function (res, fn) {
            res.text = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                res.text += chunk;
            });
            res.on('end', fn);
        };
    });
    require.define('/node_modules\\superagent\\lib\\node\\parsers\\json.js', function (module, exports, __dirname, __filename, process) {
        module.exports = function (res, fn) {
            res.text = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                res.text += chunk;
            });
            res.on('end', function () {
                try {
                    fn(null, JSON.parse(res.text));
                } catch (err) {
                    fn(err);
                }
            });
        };
    });
    require.define('/node_modules\\superagent\\lib\\node\\parsers\\urlencoded.js', function (module, exports, __dirname, __filename, process) {
        var qs = require('/node_modules\\superagent\\node_modules\\qs\\index.js');
        module.exports = function (res, fn) {
            res.text = '';
            res.setEncoding('ascii');
            res.on('data', function (chunk) {
                res.text += chunk;
            });
            res.on('end', function () {
                try {
                    fn(null, qs.parse(res.text));
                } catch (err) {
                    fn(err);
                }
            });
        };
    });
    require.define('/node_modules\\superagent\\node_modules\\qs\\index.js', function (module, exports, __dirname, __filename, process) {
        module.exports = require('/node_modules\\superagent\\node_modules\\qs\\lib\\querystring.js');
    });
    require.define('/node_modules\\superagent\\node_modules\\qs\\lib\\querystring.js', function (module, exports, __dirname, __filename, process) {
        var toString = Object.prototype.toString;
        var isint = /^[0-9]+$/;
        function promote(parent, key) {
            if (parent[key].length == 0)
                return parent[key] = {};
            var t = {};
            for (var i in parent[key])
                t[i] = parent[key][i];
            parent[key] = t;
            return t;
        }
        function parse(parts, parent, key, val) {
            var part = parts.shift();
            if (!part) {
                if (Array.isArray(parent[key])) {
                    parent[key].push(val);
                } else if ('object' == typeof parent[key]) {
                    parent[key] = val;
                } else if ('undefined' == typeof parent[key]) {
                    parent[key] = val;
                } else {
                    parent[key] = [
                        parent[key],
                        val
                    ];
                }
            } else {
                var obj = parent[key] = parent[key] || [];
                if (']' == part) {
                    if (Array.isArray(obj)) {
                        if ('' != val)
                            obj.push(val);
                    } else if ('object' == typeof obj) {
                        obj[Object.keys(obj).length] = val;
                    } else {
                        obj = parent[key] = [
                            parent[key],
                            val
                        ];
                    }
                } else if (~part.indexOf(']')) {
                    part = part.substr(0, part.length - 1);
                    if (!isint.test(part) && Array.isArray(obj))
                        obj = promote(parent, key);
                    parse(parts, obj, part, val);
                } else {
                    if (!isint.test(part) && Array.isArray(obj))
                        obj = promote(parent, key);
                    parse(parts, obj, part, val);
                }
            }
        }
        function merge(parent, key, val) {
            if (~key.indexOf(']')) {
                var parts = key.split('['), len = parts.length, last = len - 1;
                parse(parts, parent, 'base', val);
            } else {
                if (!isint.test(key) && Array.isArray(parent.base)) {
                    var t = {};
                    for (var k in parent.base)
                        t[k] = parent.base[k];
                    parent.base = t;
                }
                set(parent.base, key, val);
            }
            return parent;
        }
        function parseObject(obj) {
            var ret = { base: {} };
            Object.keys(obj).forEach(function (name) {
                merge(ret, name, obj[name]);
            });
            return ret.base;
        }
        function parseString(str) {
            return String(str).split('&').reduce(function (ret, pair) {
                var eql = pair.indexOf('='), brace = lastBraceInKey(pair), key = pair.substr(0, brace || eql), val = pair.substr(brace || eql, pair.length), val = val.substr(val.indexOf('=') + 1, val.length);
                if ('' == key)
                    key = pair, val = '';
                return merge(ret, decode(key), decode(val));
            }, { base: {} }).base;
        }
        exports.parse = function (str) {
            if (null == str || '' == str)
                return {};
            return 'object' == typeof str ? parseObject(str) : parseString(str);
        };
        var stringify = exports.stringify = function (obj, prefix) {
                if (Array.isArray(obj)) {
                    return stringifyArray(obj, prefix);
                } else if ('[object Object]' == toString.call(obj)) {
                    return stringifyObject(obj, prefix);
                } else if ('string' == typeof obj) {
                    return stringifyString(obj, prefix);
                } else {
                    return prefix + '=' + encodeURIComponent(String(obj));
                }
            };
        function stringifyString(str, prefix) {
            if (!prefix)
                throw new TypeError('stringify expects an object');
            return prefix + '=' + encodeURIComponent(str);
        }
        function stringifyArray(arr, prefix) {
            var ret = [];
            if (!prefix)
                throw new TypeError('stringify expects an object');
            for (var i = 0; i < arr.length; i++) {
                ret.push(stringify(arr[i], prefix + '[' + i + ']'));
            }
            return ret.join('&');
        }
        function stringifyObject(obj, prefix) {
            var ret = [], keys = Object.keys(obj), key;
            for (var i = 0, len = keys.length; i < len; ++i) {
                key = keys[i];
                ret.push(stringify(obj[key], prefix ? prefix + '[' + encodeURIComponent(key) + ']' : encodeURIComponent(key)));
            }
            return ret.join('&');
        }
        function set(obj, key, val) {
            var v = obj[key];
            if (undefined === v) {
                obj[key] = val;
            } else if (Array.isArray(v)) {
                v.push(val);
            } else {
                obj[key] = [
                    v,
                    val
                ];
            }
        }
        function lastBraceInKey(str) {
            var len = str.length, brace, c;
            for (var i = 0; i < len; ++i) {
                c = str[i];
                if (']' == c)
                    brace = false;
                if ('[' == c)
                    brace = true;
                if ('=' == c && !brace)
                    return i;
            }
        }
        function decode(str) {
            try {
                return decodeURIComponent(str.replace(/\+/g, ' '));
            } catch (err) {
                return str;
            }
        }
    });
    require.define('/node_modules\\superagent\\lib\\node\\agent.js', function (module, exports, __dirname, __filename, process) {
        var CookieJar = require('/node_modules\\superagent\\node_modules\\cookiejar\\cookiejar.js').CookieJar, CookieAccess = require('/node_modules\\superagent\\node_modules\\cookiejar\\cookiejar.js').CookieAccessInfo, parse = require('/node_modules\\commonjs-everywhere\\core\\undefined.js').parse, request = require('/node_modules\\superagent\\lib\\node\\index.js'), methods = require('/node_modules\\superagent\\node_modules\\methods\\index.js');
        module.exports = Agent;
        function Agent() {
            if (!(this instanceof Agent))
                return new Agent();
            this.jar = new CookieJar();
        }
        Agent.prototype.saveCookies = function (res) {
            var cookies = res.headers['set-cookie'];
            if (cookies)
                this.jar.setCookies(cookies);
        };
        Agent.prototype.attachCookies = function (req) {
            var url = parse(req.url);
            var access = CookieAccess(url.host, url.pathname, 'https:' == url.protocol);
            var cookies = this.jar.getCookies(access).toValueString();
            req.cookies = cookies;
        };
        methods.forEach(function (method) {
            var name = 'delete' == method ? 'del' : method;
            method = method.toUpperCase();
            Agent.prototype[name] = function (url, fn) {
                var req = request(method, url);
                req.on('response', this.saveCookies.bind(this));
                req.on('redirect', this.saveCookies.bind(this));
                req.on('redirect', this.attachCookies.bind(this, req));
                this.attachCookies(req);
                fn && req.end(fn);
                return req;
            };
        });
    });
    require.define('/node_modules\\superagent\\node_modules\\methods\\index.js', function (module, exports, __dirname, __filename, process) {
        module.exports = [
            'get',
            'post',
            'put',
            'head',
            'delete',
            'options',
            'trace',
            'copy',
            'lock',
            'mkcol',
            'move',
            'propfind',
            'proppatch',
            'unlock',
            'report',
            'mkactivity',
            'checkout',
            'merge',
            'm-search',
            'notify',
            'subscribe',
            'unsubscribe',
            'patch'
        ];
    });
    require.define('/node_modules\\commonjs-everywhere\\core\\undefined.js', function (module, exports, __dirname, __filename, process) {
        throw new Error('this core module has not been ported to the browser');
    });
    require.define('/node_modules\\superagent\\node_modules\\cookiejar\\cookiejar.js', function (module, exports, __dirname, __filename, process) {
        exports.CookieAccessInfo = CookieAccessInfo = function CookieAccessInfo(domain, path, secure, script) {
            if (this instanceof CookieAccessInfo) {
                this.domain = domain || undefined;
                this.path = path || '/';
                this.secure = !!secure;
                this.script = !!script;
                return this;
            } else {
                return new CookieAccessInfo(domain, path, secure, script);
            }
        };
        exports.Cookie = Cookie = function Cookie(cookiestr) {
            if (cookiestr instanceof Cookie) {
                return cookiestr;
            } else {
                if (this instanceof Cookie) {
                    this.name = null;
                    this.value = null;
                    this.expiration_date = Infinity;
                    this.path = '/';
                    this.domain = null;
                    this.secure = false;
                    this.noscript = false;
                    if (cookiestr) {
                        this.parse(cookiestr);
                    }
                    return this;
                }
                return new Cookie(cookiestr);
            }
        };
        Cookie.prototype.toString = function toString() {
            var str = [this.name + '=' + this.value];
            if (this.expiration_date !== Infinity) {
                str.push('expires=' + new Date(this.expiration_date).toGMTString());
            }
            if (this.domain) {
                str.push('domain=' + this.domain);
            }
            if (this.path) {
                str.push('path=' + this.path);
            }
            if (this.secure) {
                str.push('secure');
            }
            if (this.noscript) {
                str.push('httponly');
            }
            return str.join('; ');
        };
        Cookie.prototype.toValueString = function toValueString() {
            return this.name + '=' + this.value;
        };
        var cookie_str_splitter = /[:](?=\s*[a-zA-Z0-9_\-]+\s*[=])/g;
        Cookie.prototype.parse = function parse(str) {
            if (this instanceof Cookie) {
                var parts = str.split(';'), pair = parts[0].match(/([^=]+)=((?:.|\n)*)/), key = pair[1], value = pair[2];
                this.name = key;
                this.value = value;
                for (var i = 1; i < parts.length; i++) {
                    pair = parts[i].match(/([^=]+)(?:=((?:.|\n)*))?/), key = pair[1].trim().toLowerCase(), value = pair[2];
                    switch (key) {
                    case 'httponly':
                        this.noscript = true;
                        break;
                    case 'expires':
                        this.expiration_date = value ? Number(Date.parse(value)) : Infinity;
                        break;
                    case 'path':
                        this.path = value ? value.trim() : '';
                        break;
                    case 'domain':
                        this.domain = value ? value.trim() : '';
                        break;
                    case 'secure':
                        this.secure = true;
                        break;
                    }
                }
                return this;
            }
            return new Cookie().parse(str);
        };
        Cookie.prototype.matches = function matches(access_info) {
            if (this.noscript && access_info.script || this.secure && !access_info.secure || !this.collidesWith(access_info)) {
                return false;
            }
            return true;
        };
        Cookie.prototype.collidesWith = function collidesWith(access_info) {
            if (this.path && !access_info.path || this.domain && !access_info.domain) {
                return false;
            }
            if (this.path && access_info.path.indexOf(this.path) !== 0) {
                return false;
            }
            if (this.domain === access_info.domain) {
                return true;
            } else if (this.domain && this.domain.charAt(0) === '.') {
                var wildcard = access_info.domain.indexOf(this.domain.slice(1));
                if (wildcard === -1 || wildcard !== access_info.domain.length - this.domain.length + 1) {
                    return false;
                }
            } else if (this.domain) {
                return false;
            }
            return true;
        };
        exports.CookieJar = CookieJar = function CookieJar() {
            if (this instanceof CookieJar) {
                var cookies = {};
                this.setCookie = function setCookie(cookie) {
                    cookie = Cookie(cookie);
                    var remove = cookie.expiration_date <= Date.now();
                    if (cookie.name in cookies) {
                        var cookies_list = cookies[cookie.name];
                        for (var i = 0; i < cookies_list.length; i++) {
                            var collidable_cookie = cookies_list[i];
                            if (collidable_cookie.collidesWith(cookie)) {
                                if (remove) {
                                    cookies_list.splice(i, 1);
                                    if (cookies_list.length === 0) {
                                        delete cookies[cookie.name];
                                    }
                                    return false;
                                } else {
                                    return cookies_list[i] = cookie;
                                }
                            }
                        }
                        if (remove) {
                            return false;
                        }
                        cookies_list.push(cookie);
                        return cookie;
                    } else if (remove) {
                        return false;
                    } else {
                        return cookies[cookie.name] = [cookie];
                    }
                };
                this.getCookie = function getCookie(cookie_name, access_info) {
                    var cookies_list = cookies[cookie_name];
                    for (var i = 0; i < cookies_list.length; i++) {
                        var cookie = cookies_list[i];
                        if (cookie.expiration_date <= Date.now()) {
                            if (cookies_list.length === 0) {
                                delete cookies[cookie.name];
                            }
                            continue;
                        }
                        if (cookie.matches(access_info)) {
                            return cookie;
                        }
                    }
                };
                this.getCookies = function getCookies(access_info) {
                    var matches = [];
                    for (var cookie_name in cookies) {
                        var cookie = this.getCookie(cookie_name, access_info);
                        if (cookie) {
                            matches.push(cookie);
                        }
                    }
                    matches.toString = function toString() {
                        return matches.join(':');
                    };
                    matches.toValueString = function () {
                        return matches.map(function (c) {
                            return c.toValueString();
                        }).join(';');
                    };
                    return matches;
                };
                return this;
            }
            return new CookieJar();
        };
        CookieJar.prototype.setCookies = function setCookies(cookies) {
            cookies = Array.isArray(cookies) ? cookies : cookies.split(cookie_str_splitter);
            var successful = [];
            for (var i = 0; i < cookies.length; i++) {
                var cookie = Cookie(cookies[i]);
                if (this.setCookie(cookie)) {
                    successful.push(cookie);
                }
            }
            return successful;
        };
    });
    require.define('/node_modules\\superagent\\node_modules\\mime\\mime.js', function (module, exports, __dirname, __filename, process) {
        var path = require('/node_modules\\commonjs-everywhere\\core\\undefined.js'), fs = require('/node_modules\\commonjs-everywhere\\core\\undefined.js');
        var mime = module.exports = {
                types: Object.create(null),
                extensions: Object.create(null),
                define: function (map) {
                    for (var type in map) {
                        var exts = map[type];
                        for (var i = 0; i < exts.length; i++) {
                            mime.types[exts[i]] = type;
                        }
                        if (!mime.extensions[type]) {
                            mime.extensions[type] = exts[0];
                        }
                    }
                },
                load: function (file) {
                    var map = {}, content = fs.readFileSync(file, 'ascii'), lines = content.split(/[\r\n]+/);
                    lines.forEach(function (line, lineno) {
                        var fields = line.replace(/\s*#.*|^\s*|\s*$/g, '').split(/\s+/);
                        map[fields.shift()] = fields;
                    });
                    mime.define(map);
                },
                lookup: function (path, fallback) {
                    var ext = path.replace(/.*[\.\/]/, '').toLowerCase();
                    return mime.types[ext] || fallback || mime.default_type;
                },
                extension: function (mimeType) {
                    return mime.extensions[mimeType];
                },
                charsets: {
                    lookup: function (mimeType, fallback) {
                        return /^text\//.test(mimeType) ? 'UTF-8' : fallback;
                    }
                }
            };
        mime.load(path.join(__dirname, 'types/mime.types'));
        mime.load(path.join(__dirname, 'types/node.types'));
        mime.default_type = mime.types.bin;
    });
    require.define('/node_modules\\superagent\\lib\\node\\part.js', function (module, exports, __dirname, __filename, process) {
        var utils = require('/node_modules\\superagent\\lib\\node\\utils.js'), Stream = require('/node_modules\\commonjs-everywhere\\core\\undefined.js').Stream, mime = require('/node_modules\\superagent\\node_modules\\mime\\mime.js'), path = require('/node_modules\\commonjs-everywhere\\core\\undefined.js'), basename = path.basename;
        module.exports = Part;
        function Part(req) {
            this.req = req;
            this.header = {};
            this.headerSent = false;
            this.request = req.request();
            this.writable = true;
            if (!req._boundary)
                this.assignBoundary();
        }
        Part.prototype.__proto__ = Stream.prototype;
        Part.prototype.assignBoundary = function () {
            var boundary = utils.uid(32);
            this.req.set('Content-Type', 'multipart/form-data; boundary=' + boundary);
            this.req._boundary = boundary;
        };
        Part.prototype.set = function (field, val) {
            if (!this._boundary) {
                if (!this.request._hasFirstBoundary) {
                    this.request.write('--' + this.req._boundary + '\r\n');
                    this.request._hasFirstBoundary = true;
                } else {
                    this.request.write('\r\n--' + this.req._boundary + '\r\n');
                }
                this._boundary = true;
            }
            this.request.write(field + ': ' + val + '\r\n');
            return this;
        };
        Part.prototype.type = function (type) {
            return this.set('Content-Type', mime.lookup(type));
        };
        Part.prototype.name = function (name) {
            this.set('Content-Disposition', 'form-data; name="' + name + '"');
            return this;
        };
        Part.prototype.attachment = function (name, filename) {
            this.type(filename);
            this.set('Content-Disposition', 'attachment; name="' + name + '"; filename="' + basename(filename) + '"');
            return this;
        };
        Part.prototype.write = function (data, encoding) {
            if (!this._headerCRLF) {
                this.request.write('\r\n');
                this._headerCRLF = true;
            }
            return this.request.write(data, encoding);
        };
        Part.prototype.end = function () {
            this.emit('end');
            this.complete = true;
        };
    });
    require.define('/node_modules\\superagent\\lib\\node\\utils.js', function (module, exports, __dirname, __filename, process) {
        var Stream = require('/node_modules\\commonjs-everywhere\\core\\undefined.js').Stream, StringDecoder = require('/node_modules\\commonjs-everywhere\\core\\undefined.js').StringDecoder, zlib;
        try {
            zlib = require('/node_modules\\commonjs-everywhere\\core\\undefined.js');
        } catch (e) {
        }
        exports.uid = function (len) {
            var buf = '', chars = 'abcdefghijklmnopqrstuvwxyz123456789', nchars = chars.length;
            while (len--)
                buf += chars[Math.random() * nchars | 0];
            return buf;
        };
        exports.type = function (str) {
            return str.split(/ *; */).shift();
        };
        exports.params = function (str) {
            return str.split(/ *; */).reduce(function (obj, str) {
                var parts = str.split(/ *= */), key = parts.shift(), val = parts.shift();
                if (key && val)
                    obj[key] = val;
                return obj;
            }, {});
        };
        exports.parseLinks = function (str) {
            return str.split(/ *, */).reduce(function (obj, str) {
                var parts = str.split(/ *; */);
                var url = parts[0].slice(1, -1);
                var rel = parts[1].split(/ *= */)[1].slice(1, -1);
                obj[rel] = url;
                return obj;
            }, {});
        };
        exports.unzip = function (req, res) {
            if (!zlib)
                return;
            var unzip = zlib.createUnzip(), stream = new Stream(), decoder;
            stream.req = req;
            res.pipe(unzip);
            res.setEncoding = function (type) {
                decoder = new StringDecoder(type);
            };
            unzip.on('data', function (buf) {
                if (decoder) {
                    var str = decoder.write(buf);
                    if (str.length)
                        stream.emit('data', str);
                } else {
                    stream.emit('data', buf);
                }
            });
            unzip.on('end', function () {
                stream.emit('end');
            });
            var _on = res.on;
            res.on = function (type, fn) {
                if ('data' == type || 'end' == type) {
                    stream.on(type, fn);
                } else {
                    _on.call(res, type, fn);
                }
            };
        };
        exports.cleanHeader = function (header) {
            delete header['content-type'];
            delete header['content-length'];
            delete header['transfer-encoding'];
            delete header['cookie'];
            delete header['host'];
            return header;
        };
    });
    require.define('/node_modules\\superagent\\lib\\node\\response.js', function (module, exports, __dirname, __filename, process) {
        var utils = require('/node_modules\\superagent\\lib\\node\\utils.js'), Stream = require('/node_modules\\commonjs-everywhere\\core\\undefined.js');
        module.exports = Response;
        function Response(req, res, options) {
            options = options || {};
            this.req = req;
            this.res = res;
            this.links = {};
            this.text = res.text;
            this.body = res.body || {};
            this.files = res.files || {};
            this.buffered = 'string' == typeof this.text;
            this.header = this.headers = res.headers;
            this.setStatusProperties(res.statusCode);
            this.setHeaderProperties(this.header);
            this.setEncoding = res.setEncoding.bind(res);
            res.on('data', this.emit.bind(this, 'data'));
            res.on('end', this.emit.bind(this, 'end'));
            res.on('close', this.emit.bind(this, 'close'));
            res.on('error', this.emit.bind(this, 'error'));
        }
        Response.prototype.__proto__ = Stream.prototype;
        Response.prototype.get = function (field) {
            return this.header[field.toLowerCase()];
        };
        Response.prototype.destroy = function (err) {
            this.res.destroy(err);
        };
        Response.prototype.pause = function () {
            this.res.pause();
        };
        Response.prototype.resume = function () {
            this.res.resume();
        };
        Response.prototype.toError = function () {
            var msg = 'got ' + this.status + ' response';
            var err = new Error(msg);
            err.status = this.status;
            return err;
        };
        Response.prototype.setHeaderProperties = function (header) {
            var ct = this.header['content-type'] || '';
            var params = utils.params(ct);
            for (var key in params)
                this[key] = params[key];
            this.type = utils.type(ct);
            if (header.link)
                this.links = utils.parseLinks(header.link);
        };
        function parseCookies(header) {
            return Array.isArray(header) ? header.map(Cookie.parse) : [Cookie.parse(header)];
        }
        Response.prototype.setStatusProperties = function (status) {
            var type = status / 100 | 0;
            this.status = this.statusCode = status;
            this.statusType = type;
            this.info = 1 == type;
            this.ok = 2 == type;
            this.redirect = 3 == type;
            this.clientError = 4 == type;
            this.serverError = 5 == type;
            this.error = 4 == type || 5 == type ? this.toError() : false;
            this.accepted = 202 == status;
            this.noContent = 204 == status;
            this.badRequest = 400 == status;
            this.unauthorized = 401 == status;
            this.notAcceptable = 406 == status;
            this.forbidden = 403 == status;
            this.notFound = 404 == status;
        };
    });
    require.define('/node_modules\\superagent\\node_modules\\formidable\\lib\\index.js', function (module, exports, __dirname, __filename, process) {
        var IncomingForm = require('/node_modules\\superagent\\node_modules\\formidable\\lib\\incoming_form.js').IncomingForm;
        IncomingForm.IncomingForm = IncomingForm;
        module.exports = IncomingForm;
    });
    require.define('/node_modules\\superagent\\node_modules\\formidable\\lib\\incoming_form.js', function (module, exports, __dirname, __filename, process) {
        if (global.GENTLY)
            require = GENTLY.hijack(require);
        var fs = require('/node_modules\\commonjs-everywhere\\core\\undefined.js');
        var util = require('/node_modules\\superagent\\node_modules\\formidable\\lib\\util.js'), path = require('/node_modules\\commonjs-everywhere\\core\\undefined.js'), File = require('/node_modules\\superagent\\node_modules\\formidable\\lib\\file.js'), MultipartParser = require('/node_modules\\superagent\\node_modules\\formidable\\lib\\multipart_parser.js').MultipartParser, QuerystringParser = require('/node_modules\\superagent\\node_modules\\formidable\\lib\\querystring_parser.js').QuerystringParser, StringDecoder = require('/node_modules\\commonjs-everywhere\\core\\undefined.js').StringDecoder, EventEmitter = require('/node_modules\\commonjs-everywhere\\core\\undefined.js').EventEmitter;
        function IncomingForm() {
            if (!(this instanceof IncomingForm))
                return new IncomingForm();
            EventEmitter.call(this);
            this.error = null;
            this.ended = false;
            this.maxFieldsSize = 2 * 1024 * 1024;
            this.keepExtensions = false;
            this.uploadDir = IncomingForm.UPLOAD_DIR;
            this.encoding = 'utf-8';
            this.headers = null;
            this.type = null;
            this.bytesReceived = null;
            this.bytesExpected = null;
            this._parser = null;
            this._flushing = 0;
            this._fieldsSize = 0;
        }
        ;
        util.inherits(IncomingForm, EventEmitter);
        exports.IncomingForm = IncomingForm;
        IncomingForm.UPLOAD_DIR = function () {
            var dirs = [
                    process.env.TMP,
                    '/tmp',
                    process.cwd()
                ];
            for (var i = 0; i < dirs.length; i++) {
                var dir = dirs[i];
                var isDirectory = false;
                try {
                    isDirectory = fs.statSync(dir).isDirectory();
                } catch (e) {
                }
                if (isDirectory)
                    return dir;
            }
        }();
        IncomingForm.prototype.parse = function (req, cb) {
            this.pause = function () {
                try {
                    req.pause();
                } catch (err) {
                    if (!this.ended) {
                        this._error(err);
                    }
                    return false;
                }
                return true;
            };
            this.resume = function () {
                try {
                    req.resume();
                } catch (err) {
                    if (!this.ended) {
                        this._error(err);
                    }
                    return false;
                }
                return true;
            };
            this.writeHeaders(req.headers);
            var self = this;
            req.on('error', function (err) {
                self._error(err);
            }).on('aborted', function () {
                self.emit('aborted');
            }).on('data', function (buffer) {
                self.write(buffer);
            }).on('end', function () {
                if (self.error) {
                    return;
                }
                var err = self._parser.end();
                if (err) {
                    self._error(err);
                }
            });
            if (cb) {
                var fields = {}, files = {};
                this.on('field', function (name, value) {
                    fields[name] = value;
                }).on('file', function (name, file) {
                    files[name] = file;
                }).on('error', function (err) {
                    cb(err, fields, files);
                }).on('end', function () {
                    cb(null, fields, files);
                });
            }
            return this;
        };
        IncomingForm.prototype.writeHeaders = function (headers) {
            this.headers = headers;
            this._parseContentLength();
            this._parseContentType();
        };
        IncomingForm.prototype.write = function (buffer) {
            if (!this._parser) {
                this._error(new Error('unintialized parser'));
                return;
            }
            this.bytesReceived += buffer.length;
            this.emit('progress', this.bytesReceived, this.bytesExpected);
            var bytesParsed = this._parser.write(buffer);
            if (bytesParsed !== buffer.length) {
                this._error(new Error('parser error, ' + bytesParsed + ' of ' + buffer.length + ' bytes parsed'));
            }
            return bytesParsed;
        };
        IncomingForm.prototype.pause = function () {
            return false;
        };
        IncomingForm.prototype.resume = function () {
            return false;
        };
        IncomingForm.prototype.onPart = function (part) {
            this.handlePart(part);
        };
        IncomingForm.prototype.handlePart = function (part) {
            var self = this;
            if (part.filename === undefined) {
                var value = '', decoder = new StringDecoder(this.encoding);
                part.on('data', function (buffer) {
                    self._fieldsSize += buffer.length;
                    if (self._fieldsSize > self.maxFieldsSize) {
                        self._error(new Error('maxFieldsSize exceeded, received ' + self._fieldsSize + ' bytes of field data'));
                        return;
                    }
                    value += decoder.write(buffer);
                });
                part.on('end', function () {
                    self.emit('field', part.name, value);
                });
                return;
            }
            this._flushing++;
            var file = new File({
                    path: this._uploadPath(part.filename),
                    name: part.filename,
                    type: part.mime
                });
            this.emit('fileBegin', part.name, file);
            file.open();
            part.on('data', function (buffer) {
                self.pause();
                file.write(buffer, function () {
                    self.resume();
                });
            });
            part.on('end', function () {
                file.end(function () {
                    self._flushing--;
                    self.emit('file', part.name, file);
                    self._maybeEnd();
                });
            });
        };
        IncomingForm.prototype._parseContentType = function () {
            if (!this.headers['content-type']) {
                this._error(new Error('bad content-type header, no content-type'));
                return;
            }
            if (this.headers['content-type'].match(/urlencoded/i)) {
                this._initUrlencoded();
                return;
            }
            if (this.headers['content-type'].match(/multipart/i)) {
                var m;
                if (m = this.headers['content-type'].match(/boundary=(?:"([^"]+)"|([^;]+))/i)) {
                    this._initMultipart(m[1] || m[2]);
                } else {
                    this._error(new Error('bad content-type header, no multipart boundary'));
                }
                return;
            }
            this._error(new Error('bad content-type header, unknown content-type: ' + this.headers['content-type']));
        };
        IncomingForm.prototype._error = function (err) {
            if (this.error) {
                return;
            }
            this.error = err;
            this.pause();
            this.emit('error', err);
        };
        IncomingForm.prototype._parseContentLength = function () {
            if (this.headers['content-length']) {
                this.bytesReceived = 0;
                this.bytesExpected = parseInt(this.headers['content-length'], 10);
                this.emit('progress', this.bytesReceived, this.bytesExpected);
            }
        };
        IncomingForm.prototype._newParser = function () {
            return new MultipartParser();
        };
        IncomingForm.prototype._initMultipart = function (boundary) {
            this.type = 'multipart';
            var parser = new MultipartParser(), self = this, headerField, headerValue, part;
            parser.initWithBoundary(boundary);
            parser.onPartBegin = function () {
                part = new EventEmitter();
                part.headers = {};
                part.name = null;
                part.filename = null;
                part.mime = null;
                headerField = '';
                headerValue = '';
            };
            parser.onHeaderField = function (b, start, end) {
                headerField += b.toString(self.encoding, start, end);
            };
            parser.onHeaderValue = function (b, start, end) {
                headerValue += b.toString(self.encoding, start, end);
            };
            parser.onHeaderEnd = function () {
                headerField = headerField.toLowerCase();
                part.headers[headerField] = headerValue;
                var m;
                if (headerField == 'content-disposition') {
                    if (m = headerValue.match(/name="([^"]+)"/i)) {
                        part.name = m[1];
                    }
                    part.filename = self._fileName(headerValue);
                } else if (headerField == 'content-type') {
                    part.mime = headerValue;
                }
                headerField = '';
                headerValue = '';
            };
            parser.onHeadersEnd = function () {
                self.onPart(part);
            };
            parser.onPartData = function (b, start, end) {
                part.emit('data', b.slice(start, end));
            };
            parser.onPartEnd = function () {
                part.emit('end');
            };
            parser.onEnd = function () {
                self.ended = true;
                self._maybeEnd();
            };
            this._parser = parser;
        };
        IncomingForm.prototype._fileName = function (headerValue) {
            var m = headerValue.match(/filename="(.*?)"($|; )/i);
            if (!m)
                return;
            var filename = m[1].substr(m[1].lastIndexOf('\\') + 1);
            filename = filename.replace(/%22/g, '"');
            filename = filename.replace(/&#([\d]{4});/g, function (m, code) {
                return String.fromCharCode(code);
            });
            return filename;
        };
        IncomingForm.prototype._initUrlencoded = function () {
            this.type = 'urlencoded';
            var parser = new QuerystringParser(), self = this;
            parser.onField = function (key, val) {
                self.emit('field', key, val);
            };
            parser.onEnd = function () {
                self.ended = true;
                self._maybeEnd();
            };
            this._parser = parser;
        };
        IncomingForm.prototype._uploadPath = function (filename) {
            var name = '';
            for (var i = 0; i < 32; i++) {
                name += Math.floor(Math.random() * 16).toString(16);
            }
            if (this.keepExtensions) {
                var ext = path.extname(filename);
                ext = ext.replace(/(\.[a-z0-9]+).*/, '$1');
                name += ext;
            }
            return path.join(this.uploadDir, name);
        };
        IncomingForm.prototype._maybeEnd = function () {
            if (!this.ended || this._flushing) {
                return;
            }
            this.emit('end');
        };
    });
    require.define('/node_modules\\superagent\\node_modules\\formidable\\lib\\querystring_parser.js', function (module, exports, __dirname, __filename, process) {
        if (global.GENTLY)
            require = GENTLY.hijack(require);
        var querystring = require('/node_modules\\commonjs-everywhere\\core\\undefined.js');
        function QuerystringParser() {
            this.buffer = '';
        }
        ;
        exports.QuerystringParser = QuerystringParser;
        QuerystringParser.prototype.write = function (buffer) {
            this.buffer += buffer.toString('ascii');
            return buffer.length;
        };
        QuerystringParser.prototype.end = function () {
            var fields = querystring.parse(this.buffer);
            for (var field in fields) {
                this.onField(field, fields[field]);
            }
            this.buffer = '';
            this.onEnd();
        };
    });
    require.define('/node_modules\\superagent\\node_modules\\formidable\\lib\\multipart_parser.js', function (module, exports, __dirname, __filename, process) {
        var Buffer = require('/node_modules\\commonjs-everywhere\\core\\undefined.js').Buffer, s = 0, S = {
                PARSER_UNINITIALIZED: s++,
                START: s++,
                START_BOUNDARY: s++,
                HEADER_FIELD_START: s++,
                HEADER_FIELD: s++,
                HEADER_VALUE_START: s++,
                HEADER_VALUE: s++,
                HEADER_VALUE_ALMOST_DONE: s++,
                HEADERS_ALMOST_DONE: s++,
                PART_DATA_START: s++,
                PART_DATA: s++,
                PART_END: s++,
                END: s++
            }, f = 1, F = {
                PART_BOUNDARY: f,
                LAST_BOUNDARY: f *= 2
            }, LF = 10, CR = 13, SPACE = 32, HYPHEN = 45, COLON = 58, A = 97, Z = 122, lower = function (c) {
                return c | 32;
            };
        for (var s in S) {
            exports[s] = S[s];
        }
        function MultipartParser() {
            this.boundary = null;
            this.boundaryChars = null;
            this.lookbehind = null;
            this.state = S.PARSER_UNINITIALIZED;
            this.index = null;
            this.flags = 0;
        }
        ;
        exports.MultipartParser = MultipartParser;
        MultipartParser.stateToString = function (stateNumber) {
            for (var state in S) {
                var number = S[state];
                if (number === stateNumber)
                    return state;
            }
        };
        MultipartParser.prototype.initWithBoundary = function (str) {
            this.boundary = new Buffer(str.length + 4);
            this.boundary.write('\r\n--', 'ascii', 0);
            this.boundary.write(str, 'ascii', 4);
            this.lookbehind = new Buffer(this.boundary.length + 8);
            this.state = S.START;
            this.boundaryChars = {};
            for (var i = 0; i < this.boundary.length; i++) {
                this.boundaryChars[this.boundary[i]] = true;
            }
        };
        MultipartParser.prototype.write = function (buffer) {
            var self = this, i = 0, len = buffer.length, prevIndex = this.index, index = this.index, state = this.state, flags = this.flags, lookbehind = this.lookbehind, boundary = this.boundary, boundaryChars = this.boundaryChars, boundaryLength = this.boundary.length, boundaryEnd = boundaryLength - 1, bufferLength = buffer.length, c, cl, mark = function (name) {
                    self[name + 'Mark'] = i;
                }, clear = function (name) {
                    delete self[name + 'Mark'];
                }, callback = function (name, buffer, start, end) {
                    if (start !== undefined && start === end) {
                        return;
                    }
                    var callbackSymbol = 'on' + name.substr(0, 1).toUpperCase() + name.substr(1);
                    if (callbackSymbol in self) {
                        self[callbackSymbol](buffer, start, end);
                    }
                }, dataCallback = function (name, clear) {
                    var markSymbol = name + 'Mark';
                    if (!(markSymbol in self)) {
                        return;
                    }
                    if (!clear) {
                        callback(name, buffer, self[markSymbol], buffer.length);
                        self[markSymbol] = 0;
                    } else {
                        callback(name, buffer, self[markSymbol], i);
                        delete self[markSymbol];
                    }
                };
            for (i = 0; i < len; i++) {
                c = buffer[i];
                switch (state) {
                case S.PARSER_UNINITIALIZED:
                    return i;
                case S.START:
                    index = 0;
                    state = S.START_BOUNDARY;
                case S.START_BOUNDARY:
                    if (index == boundary.length - 2) {
                        if (c != CR) {
                            return i;
                        }
                        index++;
                        break;
                    } else if (index - 1 == boundary.length - 2) {
                        if (c != LF) {
                            return i;
                        }
                        index = 0;
                        callback('partBegin');
                        state = S.HEADER_FIELD_START;
                        break;
                    }
                    if (c != boundary[index + 2]) {
                        return i;
                    }
                    index++;
                    break;
                case S.HEADER_FIELD_START:
                    state = S.HEADER_FIELD;
                    mark('headerField');
                    index = 0;
                case S.HEADER_FIELD:
                    if (c == CR) {
                        clear('headerField');
                        state = S.HEADERS_ALMOST_DONE;
                        break;
                    }
                    index++;
                    if (c == HYPHEN) {
                        break;
                    }
                    if (c == COLON) {
                        if (index == 1) {
                            return i;
                        }
                        dataCallback('headerField', true);
                        state = S.HEADER_VALUE_START;
                        break;
                    }
                    cl = lower(c);
                    if (cl < A || cl > Z) {
                        return i;
                    }
                    break;
                case S.HEADER_VALUE_START:
                    if (c == SPACE) {
                        break;
                    }
                    mark('headerValue');
                    state = S.HEADER_VALUE;
                case S.HEADER_VALUE:
                    if (c == CR) {
                        dataCallback('headerValue', true);
                        callback('headerEnd');
                        state = S.HEADER_VALUE_ALMOST_DONE;
                    }
                    break;
                case S.HEADER_VALUE_ALMOST_DONE:
                    if (c != LF) {
                        return i;
                    }
                    state = S.HEADER_FIELD_START;
                    break;
                case S.HEADERS_ALMOST_DONE:
                    if (c != LF) {
                        return i;
                    }
                    callback('headersEnd');
                    state = S.PART_DATA_START;
                    break;
                case S.PART_DATA_START:
                    state = S.PART_DATA;
                    mark('partData');
                case S.PART_DATA:
                    prevIndex = index;
                    if (index == 0) {
                        i += boundaryEnd;
                        while (i < bufferLength && !(buffer[i] in boundaryChars)) {
                            i += boundaryLength;
                        }
                        i -= boundaryEnd;
                        c = buffer[i];
                    }
                    if (index < boundary.length) {
                        if (boundary[index] == c) {
                            if (index == 0) {
                                dataCallback('partData', true);
                            }
                            index++;
                        } else {
                            index = 0;
                        }
                    } else if (index == boundary.length) {
                        index++;
                        if (c == CR) {
                            flags |= F.PART_BOUNDARY;
                        } else if (c == HYPHEN) {
                            flags |= F.LAST_BOUNDARY;
                        } else {
                            index = 0;
                        }
                    } else if (index - 1 == boundary.length) {
                        if (flags & F.PART_BOUNDARY) {
                            index = 0;
                            if (c == LF) {
                                flags &= ~F.PART_BOUNDARY;
                                callback('partEnd');
                                callback('partBegin');
                                state = S.HEADER_FIELD_START;
                                break;
                            }
                        } else if (flags & F.LAST_BOUNDARY) {
                            if (c == HYPHEN) {
                                callback('partEnd');
                                callback('end');
                                state = S.END;
                            } else {
                                index = 0;
                            }
                        } else {
                            index = 0;
                        }
                    }
                    if (index > 0) {
                        lookbehind[index - 1] = c;
                    } else if (prevIndex > 0) {
                        callback('partData', lookbehind, 0, prevIndex);
                        prevIndex = 0;
                        mark('partData');
                        i--;
                    }
                    break;
                case S.END:
                    break;
                default:
                    return i;
                }
            }
            dataCallback('headerField');
            dataCallback('headerValue');
            dataCallback('partData');
            this.index = index;
            this.state = state;
            this.flags = flags;
            return len;
        };
        MultipartParser.prototype.end = function () {
            if (this.state != S.END) {
                return new Error('MultipartParser.end(): stream ended unexpectedly: ' + this.explain());
            }
        };
        MultipartParser.prototype.explain = function () {
            return 'state = ' + MultipartParser.stateToString(this.state);
        };
    });
    require.define('/node_modules\\superagent\\node_modules\\formidable\\lib\\file.js', function (module, exports, __dirname, __filename, process) {
        if (global.GENTLY)
            require = GENTLY.hijack(require);
        var util = require('/node_modules\\superagent\\node_modules\\formidable\\lib\\util.js'), WriteStream = require('/node_modules\\commonjs-everywhere\\core\\undefined.js').WriteStream, EventEmitter = require('/node_modules\\commonjs-everywhere\\core\\undefined.js').EventEmitter;
        function File(properties) {
            EventEmitter.call(this);
            this.size = 0;
            this.path = null;
            this.name = null;
            this.type = null;
            this.lastModifiedDate = null;
            this._writeStream = null;
            for (var key in properties) {
                this[key] = properties[key];
            }
            this._backwardsCompatibility();
        }
        module.exports = File;
        util.inherits(File, EventEmitter);
        File.prototype._backwardsCompatibility = function () {
            var self = this;
            this.__defineGetter__('length', function () {
                return self.size;
            });
            this.__defineGetter__('filename', function () {
                return self.name;
            });
            this.__defineGetter__('mime', function () {
                return self.type;
            });
        };
        File.prototype.open = function () {
            this._writeStream = new WriteStream(this.path);
        };
        File.prototype.write = function (buffer, cb) {
            var self = this;
            this._writeStream.write(buffer, function () {
                self.lastModifiedDate = new Date();
                self.size += buffer.length;
                self.emit('progress', self.size);
                cb();
            });
        };
        File.prototype.end = function (cb) {
            var self = this;
            this._writeStream.end(function () {
                self.emit('end');
                cb();
            });
        };
    });
    require.define('/node_modules\\superagent\\node_modules\\formidable\\lib\\util.js', function (module, exports, __dirname, __filename, process) {
        try {
            module.exports = require('/node_modules\\commonjs-everywhere\\core\\undefined.js');
        } catch (e) {
            module.exports = require('/node_modules\\commonjs-everywhere\\core\\undefined.js');
        }
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
    require.define('/src\\cheatsheet\\bind-key.ls', function (module, exports, __dirname, __filename, process) {
        var lang, $, bindKey, cheatsheet;
        lang = require('/node_modules\\lang\\index.ls');
        $ = require('/node_modules\\dom\\index.ls');
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
        var htmlOverrides, menu, setView;
        htmlOverrides = require('/src\\fix\\html-overrides.ls');
        menu = require('/src\\fix\\menu.ls');
        setView = require('/src\\fix\\set-view.ls');
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
        $ = require('/node_modules\\dom\\index.ls');
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