{$, $$} = require 'dom'


states = [...$$ 'a.simple, a.advanced']
posts = $ '#posts'

# first, let's fix the view
update-view localStorage.forum-view ? 'simple'

# then, let's fix the updating

for state in states
	let # copy of Cms.Forum.setView, without redrawing
		state-name = state.className.split(' ')0
		state.onclick = !->
			localStorage.forum-view = state-name
			update-view state-name

function update-view(view)
	posts.className = view
	$ '.view-options a.active'
		.classList.remove 'active'
	$ "a.#view" .className = "#view active"