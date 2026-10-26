(function (global) {
	function mount(host) {
		if (!host || host.dataset.mounted === '1') return
		host.dataset.mounted = '1'
		const build = global.HCS_BUILD || '—'

		host.innerHTML =
			'<h1 class="page-title">数据与系统管理</h1>' +
			'<p class="page-desc">本地演示环境：导出/导入 JSON 备份，或恢复整套演示数据。正式环境应对接服务端接口。</p>' +
			'<div class="settings-grid">' +
			'<div class="card">' +
			'<h3>数据备份</h3>' +
			'<p class="muted">导出当前浏览器 localStorage 中的全部业务数据。</p>' +
			'<button type="button" class="btn btn-primary" id="btnExport">导出 JSON</button>' +
			'</div>' +
			'<div class="card">' +
			'<h3>数据恢复</h3>' +
			'<p class="muted">选择此前导出的 JSON 文件覆盖本地数据。</p>' +
			'<input type="file" id="importFile" accept="application/json,.json" hidden />' +
			'<button type="button" class="btn btn-ghost" id="btnImport">选择文件导入</button>' +
			'</div>' +
			'<div class="card">' +
			'<h3>演示数据</h3>' +
			'<p class="muted">清空并重新写入合同场景下的演示种子数据。</p>' +
			'<button type="button" class="btn btn-ghost" id="btnResetDemo">恢复演示数据</button>' +
			'</div>' +
			'<div class="card">' +
			'<h3>系统信息</h3>' +
			'<ul class="sys-info">' +
			'<li><span>产品</span>餐饮供应链分布式 HCS 管理控制台（静态版）</li>' +
			'<li><span>构建</span>' +
			build +
			'</li>' +
			'<li><span>存储</span>浏览器 localStorage（键：hcs_admin_crud_v4）</li>' +
			'</ul>' +
			'</div>' +
			'</div>'

		host.querySelector('#btnExport').addEventListener('click', () => {
			if (!global.HcsStore.exportJson) return
			const json = global.HcsStore.exportJson()
			const blob = new Blob([json], { type: 'application/json' })
			const a = document.createElement('a')
			a.href = URL.createObjectURL(blob)
			a.download = 'hcs-admin-backup-' + (global.HCS_BUILD || 'data') + '.json'
			a.click()
			URL.revokeObjectURL(a.href)
		})

		const fileInput = host.querySelector('#importFile')
		host.querySelector('#btnImport').addEventListener('click', () => fileInput.click())
		fileInput.addEventListener('change', () => {
			const file = fileInput.files && fileInput.files[0]
			if (!file) return
			const reader = new FileReader()
			reader.onload = () => {
				try {
					global.HcsStore.importJson(String(reader.result || ''))
					alert('导入成功')
					global.dispatchEvent(new CustomEvent('hcs-data-changed'))
				} catch (e) {
					alert('导入失败：' + (e.message || '格式错误'))
				}
				fileInput.value = ''
			}
			reader.readAsText(file, 'utf-8')
		})

		host.querySelector('#btnResetDemo').addEventListener('click', () => {
			if (!confirm('确认恢复演示数据？当前本地业务数据将被覆盖。')) return
			global.HcsStore.resetDemo()
			global.dispatchEvent(new CustomEvent('hcs-data-changed'))
			alert('已恢复演示数据')
		})
	}

	global.HcsSettings = { mount }
})(window)
