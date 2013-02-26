for status in tbody-regular.querySelectorAll '.post-status'
	tr = status.parentNode.parentNode
	tr.className += ' hidden redirect'

	#set it at the end
	tbody-regular.removeChild tr
	tbody-regular.appendChild tr