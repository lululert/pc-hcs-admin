(function () {
	const session = window.HcsAuth.requireAuth()
	if (!session) return

	const panels = document.querySelectorAll('.panel')
	const navLinks = document.querySelectorAll('.nav-menu a[data-page]')
	const crumbTitle = document.getElementById('crumbTitle')
	const userNameEl = document.getElementById('userName')

	const titles = {
		dashboard: '工作台',
		goals: '技术目标',
		node: '节点布局与协同',
		warehouse: '仓储调度与库存管控',
		trace: '物料流转与追溯',
		procurement: '供需匹配与采购协同',
		warning: '仓储作业与预警管控',
		hcs: 'HCS 协同体系迭代',
		method: '技术方法与路线',
		deliverables: '体系成果与规范'
	}

	if (userNameEl) {
		userNameEl.textContent = session.displayName || session.username
	}

	function showPage(pageId) {
		const id = titles[pageId] ? pageId : 'dashboard'
		panels.forEach((el) => {
			el.classList.toggle('active', el.id === 'page-' + id)
		})
		navLinks.forEach((a) => {
			a.classList.toggle('active', a.getAttribute('data-page') === id)
		})
		if (crumbTitle) crumbTitle.textContent = titles[id]
		if (location.hash.replace('#', '') !== id) {
			history.replaceState(null, '', '#' + id)
		}
	}

	navLinks.forEach((a) => {
		a.addEventListener('click', (e) => {
			e.preventDefault()
			showPage(a.getAttribute('data-page'))
		})
	})

	const logoutBtn = document.getElementById('btnLogout')
	if (logoutBtn) {
		logoutBtn.addEventListener('click', () => window.HcsAuth.logout())
	}

	const hash = (location.hash || '#dashboard').replace('#', '')
	showPage(hash)

	window.addEventListener('hashchange', () => {
		showPage((location.hash || '#dashboard').replace('#', ''))
	})
})()
