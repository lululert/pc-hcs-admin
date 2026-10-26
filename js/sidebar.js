(function () {
	const LAYOUT_KEY = 'hcs_sidebar_collapsed'
	const GROUPS_KEY = 'hcs_nav_groups_folded'

	function readFoldedGroups() {
		try {
			const raw = localStorage.getItem(GROUPS_KEY)
			return raw ? JSON.parse(raw) : {}
		} catch (e) {
			return {}
		}
	}

	function writeFoldedGroups(map) {
		localStorage.setItem(GROUPS_KEY, JSON.stringify(map))
	}

	function isMobile() {
		return window.matchMedia('(max-width: 768px)').matches
	}

	function setSidebarCollapsed(layout, collapsed) {
		layout.classList.toggle('sidebar-collapsed', collapsed)
		if (!collapsed) layout.classList.remove('sidebar-mobile-open')
		const toggle = document.getElementById('btnSidebarToggle')
		const pin = document.getElementById('btnSidebarPin')
		const expanded = !collapsed
		if (toggle) toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false')
		if (pin) {
			pin.title = expanded ? '收起侧栏' : '展开侧栏'
			const text = pin.querySelector('.sidebar-pin-text')
			if (text) text.textContent = expanded ? '收起菜单' : '展开菜单'
		}
		if (!isMobile()) localStorage.setItem(LAYOUT_KEY, collapsed ? '1' : '0')
	}

	function toggleSidebar(layout) {
		if (isMobile()) {
			layout.classList.toggle('sidebar-mobile-open')
			const open = layout.classList.contains('sidebar-mobile-open')
			const btn = document.getElementById('btnSidebarToggle')
			if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false')
			return
		}
		setSidebarCollapsed(layout, !layout.classList.contains('sidebar-collapsed'))
	}

	function initNavGroups() {
		const folded = readFoldedGroups()
		document.querySelectorAll('.nav-group[data-nav-group]').forEach((group) => {
			const id = group.getAttribute('data-nav-group')
			const btn = group.querySelector('.nav-section-toggle')
			if (!btn) return

			const isFolded = !!folded[id]
			group.classList.toggle('is-folded', isFolded)
			btn.setAttribute('aria-expanded', isFolded ? 'false' : 'true')

			btn.addEventListener('click', () => {
				const next = !group.classList.contains('is-folded')
				group.classList.toggle('is-folded', next)
				btn.setAttribute('aria-expanded', next ? 'false' : 'true')
				const map = readFoldedGroups()
				if (next) map[id] = true
				else delete map[id]
				writeFoldedGroups(map)
			})
		})
	}

	function init() {
		const layout = document.getElementById('appLayout')
		if (!layout) return

		if (!isMobile()) {
			setSidebarCollapsed(layout, localStorage.getItem(LAYOUT_KEY) === '1')
		}

		const toggle = () => toggleSidebar(layout)

		const btnTop = document.getElementById('btnSidebarToggle')
		const btnPin = document.getElementById('btnSidebarPin')
		if (btnTop) btnTop.addEventListener('click', toggle)
		if (btnPin) btnPin.addEventListener('click', toggle)

		document.addEventListener('click', (e) => {
			if (!isMobile() || !layout.classList.contains('sidebar-mobile-open')) return
			const sidebar = document.getElementById('appSidebar')
			const btn = document.getElementById('btnSidebarToggle')
			if (sidebar && sidebar.contains(e.target)) return
			if (btn && btn.contains(e.target)) return
			layout.classList.remove('sidebar-mobile-open')
		})

		document.querySelectorAll('.nav-menu a').forEach((a) => {
			a.addEventListener('click', () => {
				if (isMobile()) layout.classList.remove('sidebar-mobile-open')
			})
		})

		initNavGroups()
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init)
	} else {
		init()
	}
})()
