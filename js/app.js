(function () {
	const session = window.HcsAuth.requireAuth()
	if (!session) return

	const panels = document.querySelectorAll('.panel')
	const navLinks = document.querySelectorAll('.nav-menu a[data-page]')
	const crumbTitle = document.getElementById('crumbTitle')
	const userNameEl = document.getElementById('userName')
	const mounted = {}

	const titles = {
		dashboard: '工作台',
		goals: '技术目标',
		techContent: '技术内容',
		methods: '技术方法和路线',
		deliverables: '体系成果与规范',
		architecture: '模块映射',
		node: '节点布局',
		inventory: '库存管控',
		dispatch: '仓储调度',
		trace: '流转追溯',
		procurement: '供需采购',
		warning: '预警管控',
		pilot: '试点核验与反馈',
		simulation: '场景模拟推演',
		knowledge: 'HCS 知识沉淀',
		users: '协同人员与角色',
		audit: '操作日志',
		settings: '数据与系统管理',
		hcs: 'HCS 协同规则'
	}

	if (userNameEl) {
		userNameEl.textContent = session.displayName || session.username
	}

	const buildTag = document.querySelector('.build-tag')
	if (buildTag && window.HCS_BUILD) {
		buildTag.textContent = '版本 ' + window.HCS_BUILD
	}

	function refreshDashboard() {
		const s = window.HcsStore.stats()
		const set = (id, v) => {
			const el = document.getElementById(id)
			if (el) el.textContent = String(v)
		}
		set('statNodes', s.nodes)
		set('statInventory', s.inventory)
		set('statDispatch', s.dispatch)
		set('statWarnings', s.warnings)
		set('statTrace', s.trace)
		set('statProcurement', s.procurement)
		set('statPilots', s.pilots)
		set('statHcsRules', s.hcsRules)
		set('statSimulations', s.simulations)
		set('statKnowledge', s.knowledge)
		set('statUsers', s.users)
		if (window.HcsDashboard && window.HcsDashboard.refreshWidgets) {
			window.HcsDashboard.refreshWidgets()
		}
	}

	function mountDocIfNeeded(pageId) {
		const host = document.getElementById('page-' + pageId)
		if (!host || !host.classList.contains('doc-host')) return
		const docKey = host.getAttribute('data-doc')
		if (!docKey) return
		if (mounted['doc-' + pageId] && host.querySelector('.doc-list')) return
		if (!window.HcsProjectDocs || !window.HcsProjectDocs.render) {
			host.innerHTML =
				'<div class="card"><h3>文档模块未加载</h3><p>请强制刷新页面（Ctrl+F5）。</p></div>'
			return
		}
		window.HcsProjectDocs.render(docKey, host)
		mounted['doc-' + pageId] = true
	}

	function mountSettingsIfNeeded(pageId) {
		if (pageId !== 'settings') return
		const host = document.getElementById('page-settings')
		if (!host || !window.HcsSettings) return
		window.HcsSettings.mount(host)
	}

	function mountCrudIfNeeded(pageId) {
		const host = document.getElementById('page-' + pageId)
		if (!host || !host.classList.contains('crud-host')) return
		const moduleKey = host.getAttribute('data-module')
		if (!moduleKey) return
		if (mounted[pageId] && host.innerHTML.trim()) return

		if (!window.HcsCrud || !window.HcsModules || !window.HcsStore) {
			host.innerHTML =
				'<div class="card"><h3>页面资源未加载完整</h3><p>请强制刷新（Ctrl+F5），或清除缓存后重开。</p></div>'
			return
		}
		try {
			window.HcsCrud.mountModule(moduleKey, host)
			mounted[pageId] = true
		} catch (err) {
			console.error(err)
			host.innerHTML =
				'<div class="card"><h3>模块加载失败</h3><p>' +
				(err && err.message ? err.message : '未知错误') +
				'</p></div>'
		}
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
		mountDocIfNeeded(id)
		mountSettingsIfNeeded(id)
		mountCrudIfNeeded(id)
		if (id === 'dashboard') refreshDashboard()
	}

	navLinks.forEach((a) => {
		a.addEventListener('click', (e) => {
			e.preventDefault()
			showPage(a.getAttribute('data-page'))
		})
	})

	document.querySelectorAll('.quick-links a').forEach((a) => {
		a.addEventListener('click', (e) => {
			e.preventDefault()
			showPage((a.getAttribute('href') || '').replace('#', ''))
		})
	})

	const logoutBtn = document.getElementById('btnLogout')
	if (logoutBtn) {
		logoutBtn.addEventListener('click', () => window.HcsAuth.logout())
	}

	window.addEventListener('hcs-data-changed', () => {
		refreshDashboard()
		const auditHost = document.getElementById('page-audit')
		if (auditHost && auditHost.classList.contains('active')) {
			mounted.audit = false
			auditHost.innerHTML = ''
			mountCrudIfNeeded('audit')
		}
	})

	const hash = (location.hash || '#dashboard').replace('#', '')
	showPage(hash)

	window.addEventListener('hashchange', () => {
		showPage((location.hash || '#dashboard').replace('#', ''))
	})
})()
