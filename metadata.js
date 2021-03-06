/*
// ==UserScript==
// @name WoW Board Helpers
// @description UserScript for the official WoW forum
// @match http://eu.battle.net/wow/fr/forum/*
// @match http://eu.battle.net/wow/en/forum/*
// @match http://us.battle.net/wow/en/forum/*
// @author Tel
// @grant unsafeWindow
// @version 5.2.0
// ==/UserScript==
 * TODO
 *  = See issues : https://github.com/vendethiel/wowboardhelpers/issues
 * changelog
 * 5.4.0
 *  Fix issues
 * 5.3.0
 *  Fix unsafeWindow access on Firefox
 *  Fix key bindings
 *  Fix quick quote
 * 5.2.0
 *  Removed context links from post character infos
 *  Fill back textarea with your answer draft when you change character
 * 5.1.0
 *  Fix topic hiding
 *  Fix char realm display
 * 5.0.0
 *  ______________
 * |              |
 * | NEW FORUMS ! |
 * |______________|
 * 4.3.0
 *  Added next / previous page links
 *  Moved topic jumps to its own folder
 * 4.2.6
 *  Stop triggering update checking if page is not 1
 * 4.2.5
 *  Fix updater
 *  Updater now updates even if there are new messages
 * 4.2.4
 *  Fix limit to 10 memes
 * 4.2.3
 *  Make multi-chars localized
 * 4.2.2
 *  Add <[First Last]> for topic pages
 * 4.2.1
 *  "Jump to page" via "p" bind or expander ("...")
 * 4.2
 *  Stylus as a file with `@import`s rather than `glob`ing a directory
 *  Pin deps
 * 4.1.2
 *  Fix stickies toggling
 *  Add a message for lolchrome
 * 4.1.1
 *  Fix userscript for chrome 27 which breaks our
 *   window reference (FUCK)
 * 4.1
 *  Add a direct link other characters messages
 *  Use correct nephrite extension
 * 4.0.2
 *  Fix keybinds firing with alt ctrl shift
 * 4.0.1
 *  Fix parse-time stupid mistake
 * 4.0
 *  SugarJS, FUCK YOU WORLD; YOLO
 *  Allow for multi-binds
 *  Crabby's dead
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
 *  Added `r` as hotkey for "reply"
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