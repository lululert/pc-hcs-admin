(function (global) {
	const ADMIN_PAGES = null

	const ROLE_PAGES = {
		调度管理员: [
			'dashboard',
			'monitor',
			'goals',
			'techContent',
			'methods',
			'deliverables',
			'architecture',
			'supplier',
			'material',
			'org',
			'node',
			'inventory',
			'dispatch',
			'trace',
			'procurement',
			'quality',
			'warning',
			'pilot',
			'hcs',
			'simulation',
			'knowledge',
			'users',
			'approval',
			'notify',
			'reports',
			'profile'
		],
		仓储管理员: [
			'dashboard',
			'monitor',
			'supplier',
			'material',
			'node',
			'inventory',
			'dispatch',
			'trace',
			'quality',
			'warning',
			'knowledge',
			'users',
			'approval',
			'notify',
			'reports',
			'profile'
		],
		业务只读: [
			'dashboard',
			'monitor',
			'goals',
			'techContent',
			'methods',
			'deliverables',
			'architecture',
			'supplier',
			'material',
			'org',
			'node',
			'inventory',
			'dispatch',
			'trace',
			'procurement',
			'quality',
			'warning',
			'pilot',
			'hcs',
			'simulation',
			'knowledge',
			'users',
			'approval',
			'notify',
			'reports',
			'profile'
		],
		审计只读: [
			'dashboard',
			'monitor',
			'goals',
			'techContent',
			'methods',
			'deliverables',
			'architecture',
			'reports',
			'audit',
			'notify',
			'profile'
		]
	}

	function canAccess(pageId, role) {
		if (!pageId) return true
		if (!role || role === '系统管理员') return true
		const list = ROLE_PAGES[role]
		if (!list) return true
		return list.indexOf(pageId) >= 0
	}

	function applyNav(session) {
		const role = session && session.role
		document.querySelectorAll('.nav-menu a[data-page]').forEach((a) => {
			const page = a.getAttribute('data-page')
			const li = a.closest('li')
			if (!li) return
			const ok = canAccess(page, role)
			li.style.display = ok ? '' : 'none'
		})
		document.querySelectorAll('.nav-group').forEach((group) => {
			const anyVisible = Array.from(group.querySelectorAll('.nav-menu li')).some(
				(li) => li.style.display !== 'none'
			)
			group.style.display = anyVisible ? '' : 'none'
		})
	}

	global.HcsRbac = { canAccess, applyNav }
})(window)
