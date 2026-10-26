(function (global) {
	function mount(host) {
		if (!host || host.dataset.mounted === '1') return
		host.dataset.mounted = '1'
		const s = global.HcsStore.stats()
		let storageKb = '—'
		try {
			const raw = localStorage.getItem('hcs_admin_crud_v4') || ''
			storageKb = (raw.length / 1024).toFixed(1) + ' KB'
		} catch (e) {}

		const audits = global.HcsStore.list('auditLogs', '')
		const lastAudit = audits[0] ? audits[0].time : '—'
		const pendingApproval = global.HcsStore.list('approvals', '').filter(
			(a) => a.status === '待审批'
		).length
		const unread = global.HcsStore.list('notifications', '').filter((n) => n.readFlag === '否')
			.length

		host.innerHTML =
			'<h1 class="page-title">运行监控</h1>' +
			'<p class="page-desc">关键指标、待办与本地存储占用概览。</p>' +
			'<div class="stat-row stat-row-4">' +
			'<div class="stat-card"><div class="label">待审批</div><div class="value">' +
			pendingApproval +
			'</div></div>' +
			'<div class="stat-card"><div class="label">未读消息</div><div class="value">' +
			unread +
			'</div></div>' +
			'<div class="stat-card"><div class="label">待处理预警</div><div class="value">' +
			s.warnings +
			'</div></div>' +
			'<div class="stat-card"><div class="label">在途调度</div><div class="value">' +
			s.dispatch +
			'</div></div>' +
			'</div>' +
			'<div class="card"><h3>系统状态</h3><ul class="sys-info">' +
			'<li><span>构建</span>' +
			(global.HCS_BUILD || '—') +
			'</li>' +
			'<li><span>存储</span>' +
			storageKb +
			'</li>' +
			'<li><span>最近操作</span>' +
			lastAudit +
			'</li>' +
			'<li><span>接口</span>静态控制台（本地数据）</li>' +
			'</ul></div>'
	}

	global.HcsMonitor = { mount }
})(window)
