(function (global) {
	function escapeHtml(s) {
		return String(s == null ? '' : s)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
	}

	function downloadCsv(filename, rows, headers) {
		const lines = [headers.join(',')]
		rows.forEach((row) => {
			lines.push(
				headers
					.map((h) => {
						const v = row[h.key] == null ? '' : String(row[h.key])
						return '"' + v.replace(/"/g, '""') + '"'
					})
					.join(',')
			)
		})
		const blob = new Blob(['\ufeff' + lines.join('\n')], { type: 'text/csv;charset=utf-8' })
		const a = document.createElement('a')
		a.href = URL.createObjectURL(blob)
		a.download = filename
		a.click()
		URL.revokeObjectURL(a.href)
	}

	function mount(host) {
		if (!host || host.dataset.mounted === '1') return
		host.dataset.mounted = '1'
		const store = global.HcsStore

		host.innerHTML =
			'<h1 class="page-title">报表中心</h1>' +
			'<p class="page-desc">按模块导出 CSV，用于汇报、归档或与外部系统核对。</p>' +
			'<div class="settings-grid" id="reportCards"></div>' +
			'<div class="card" style="margin-top:16px"><h3>库存汇总</h3><div class="table-wrap"><table class="data-table" id="reportInventoryTable"><thead><tr></tr></thead><tbody></tbody></table></div></div>'

		const reports = [
			{ key: 'inventory', label: '库存明细', file: 'inventory.csv' },
			{ key: 'dispatch', label: '调度单', file: 'dispatch.csv' },
			{ key: 'warnings', label: '预警记录', file: 'warnings.csv' },
			{ key: 'trace', label: '追溯记录', file: 'trace.csv' },
			{ key: 'procurement', label: '采购计划', file: 'procurement.csv' }
		]

		const cols = {
			inventory: [
				{ key: 'nodeName', label: '节点' },
				{ key: 'skuName', label: 'SKU' },
				{ key: 'qty', label: '库存' },
				{ key: 'safetyQty', label: '安全库存' },
				{ key: 'advice', label: '建议' }
			],
			dispatch: [
				{ key: 'fromNode', label: '调出' },
				{ key: 'toNode', label: '调入' },
				{ key: 'skuName', label: '物料' },
				{ key: 'qty', label: '数量' },
				{ key: 'status', label: '状态' }
			],
			warnings: [
				{ key: 'level', label: '级别' },
				{ key: 'indicator', label: '指标' },
				{ key: 'nodeName', label: '节点' },
				{ key: 'status', label: '状态' }
			],
			trace: [
				{ key: 'batchNo', label: '批次' },
				{ key: 'material', label: '物料' },
				{ key: 'currentNode', label: '当前节点' },
				{ key: 'status', label: '状态' }
			],
			procurement: [
				{ key: 'storeName', label: '门店' },
				{ key: 'skuName', label: '物料' },
				{ key: 'demandQty', label: '需求' },
				{ key: 'supplyQty', label: '供应' },
				{ key: 'matchStatus', label: '匹配' }
			]
		}

		const cards = host.querySelector('#reportCards')
		reports.forEach((r) => {
			const card = document.createElement('div')
			card.className = 'card'
			card.innerHTML =
				'<h3>' +
				escapeHtml(r.label) +
				'</h3><p class="muted">导出当前模块全部记录</p>' +
				'<button type="button" class="btn btn-primary btn-export">导出 CSV</button>'
			card.querySelector('.btn-export').addEventListener('click', () => {
				const rows = store.list(r.key, '')
				downloadCsv(r.file, rows, cols[r.key])
			})
			cards.appendChild(card)
		})

		const invRows = store.list('inventory', '')
		const thead = host.querySelector('#reportInventoryTable thead tr')
		const tbody = host.querySelector('#reportInventoryTable tbody')
		cols.inventory.forEach((c) => {
			const th = document.createElement('th')
			th.textContent = c.label
			thead.appendChild(th)
		})
		invRows.forEach((row) => {
			const tr = document.createElement('tr')
			cols.inventory.forEach((c) => {
				const td = document.createElement('td')
				td.textContent = row[c.key] == null ? '' : row[c.key]
				tr.appendChild(td)
			})
			tbody.appendChild(tr)
		})
	}

	global.HcsReports = { mount }
})(window)
