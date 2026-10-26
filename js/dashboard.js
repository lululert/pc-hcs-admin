(function (global) {
	function escapeHtml(str) {
		return String(str == null ? '' : str)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
	}

	function refreshWidgets() {
		const store = global.HcsStore
		if (!store) return

		const warnings = store.list('warnings', '').slice(0, 5)
		const audits = store.list('auditLogs', '').slice(0, 8)
		const inventory = store.list('inventory', '').slice(0, 6)

		const warnEl = document.getElementById('dashRecentWarnings')
		if (warnEl) {
			if (!warnings.length) {
				warnEl.innerHTML = '<p class="dash-empty">暂无待展示预警</p>'
			} else {
				warnEl.innerHTML = warnings
					.map(
						(w) =>
							'<div class="dash-list-item">' +
							'<span class="tag tag-' +
							escapeHtml(w.level || '') +
							'">' +
							escapeHtml(w.level) +
							'</span>' +
							'<strong>' +
							escapeHtml(w.indicator) +
							'</strong> · ' +
							escapeHtml(w.nodeName) +
							' <span class="muted">' +
							escapeHtml(w.status) +
							'</span></div>'
					)
					.join('')
			}
		}

		const auditEl = document.getElementById('dashRecentAudit')
		if (auditEl) {
			if (!audits.length) {
				auditEl.innerHTML = '<p class="dash-empty">暂无操作记录</p>'
			} else {
				auditEl.innerHTML = audits
					.map(
						(a) =>
							'<div class="dash-list-item dash-audit">' +
							'<time>' +
							escapeHtml((a.time || '').slice(0, 16)) +
							'</time> ' +
							escapeHtml(a.action) +
							' · ' +
							escapeHtml(a.moduleLabel || a.module) +
							' <span class="muted">' +
							escapeHtml(a.operator) +
							'</span></div>'
					)
					.join('')
			}
		}

		const chartEl = document.getElementById('dashInventoryChart')
		if (chartEl) {
			if (!inventory.length) {
				chartEl.innerHTML = '<p class="dash-empty">暂无库存数据</p>'
			} else {
				let maxQty = 1
				inventory.forEach((r) => {
					const q = Number(r.qty) || 0
					if (q > maxQty) maxQty = q
				})
				chartEl.innerHTML = inventory
					.map((r) => {
						const q = Number(r.qty) || 0
						const s = Number(r.safetyQty) || 0
						const pct = Math.min(100, Math.round((q / maxQty) * 100))
						const low = s > 0 && q < s
						return (
							'<div class="bar-row' +
							(low ? ' bar-low' : '') +
							'">' +
							'<div class="bar-label" title="' +
							escapeHtml(r.nodeName + ' / ' + r.skuName) +
							'">' +
							escapeHtml(r.skuName) +
							'</div>' +
							'<div class="bar-track"><div class="bar-fill" style="width:' +
							pct +
							'%"></div></div>' +
							'<div class="bar-val">' +
							q +
							'</div></div>'
						)
					})
					.join('')
			}
		}

		const simEl = document.getElementById('dashSimSummary')
		if (simEl) {
			const sims = store.list('simulations', '')
			const pass = sims.filter((s) => s.result === '通过').length
			simEl.textContent = sims.length ? pass + ' / ' + sims.length + ' 次推演已通过' : '—'
		}
	}

	global.HcsDashboard = { refreshWidgets }
})(window)
