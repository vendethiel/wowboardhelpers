return unless forum

for status in tbody-regular.querySelectorAll '.post-status'
	tr = status.parentNode.parentNode

	#set it at the end
	tbody-regular.removeChild tr
	tbody-regular.appendChild tr