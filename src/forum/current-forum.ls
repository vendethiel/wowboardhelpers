return unless forum

#.ui-breadcrumb li:last a[innerHTML]
{href: current-forum-href, innerHTML: current-forum-name} = document.getElementsByClassName 'ui-breadcrumb' .0.children[*-1]children.0

#XXX link to some favorites or something