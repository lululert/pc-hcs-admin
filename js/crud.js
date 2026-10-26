(function (global) {
	function escapeHtml(str) {
		return String(str == null ? '' : str)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
	}

	function mountModule(moduleKey, rootEl) {
		const MODULES = (global.HcsModules && global.HcsModules.MODULES) || {}
		const store = global.HcsStore
		if (!store) {
			throw new Error('HcsStore 未加载')
		}
		const config = MODULES[moduleKey]
		if (!config || !rootEl) return

		let keyword = ''
		let editingId = null

		rootEl.innerHTML = `
			<h1 class="page-title">${escapeHtml(config.title)}</h1>
			<p class="page-desc">${escapeHtml(config.desc)}</p>
			<div class="crud-toolbar card">
				<input type="search" class="crud-search" placeholder="搜索关键字…" />
				<button type="button" class="btn btn-primary btn-add">新增</button>
			</div>
			<div class="card crud-table-wrap">
				<div class="table-wrap">
					<table class="data-table crud-table">
						<thead><tr></tr></thead>
						<tbody></tbody>
					</table>
				</div>
				<p class="crud-empty" hidden>暂无数据，请点击「新增」</p>
			</div>
		`

		const modal = document.getElementById('crudModal')
		const modalTitle = document.getElementById('crudModalTitle')
		const modalForm = document.getElementById('crudModalForm')
		const modalClose = document.getElementById('crudModalClose')
		const modalCancel = document.getElementById('crudModalCancel')
		const modalSave = document.getElementById('crudModalSave')
		if (!modal || !modalForm || !modalTitle || !modalClose || !modalCancel || !modalSave) {
			throw new Error('弹窗 DOM 缺失，请确认 console.html 为最新版本')
		}

		const searchInput = rootEl.querySelector('.crud-search')
		const addBtn = rootEl.querySelector('.btn-add')
		const theadRow = rootEl.querySelector('.crud-table thead tr')
		const tbody = rootEl.querySelector('.crud-table tbody')
		const emptyEl = rootEl.querySelector('.crud-empty')

		config.columns.forEach((col) => {
			const th = document.createElement('th')
			th.textContent = col.label
			theadRow.appendChild(th)
		})
		const thAct = document.createElement('th')
		thAct.textContent = '操作'
		thAct.style.width = '140px'
		theadRow.appendChild(thAct)

		function buildFormFields(record) {
			modalForm.innerHTML = ''
			config.fields.forEach((field) => {
				const wrap = document.createElement('div')
				wrap.className = 'form-group'
				const label = document.createElement('label')
				label.textContent = field.label + (field.required ? ' *' : '')
				label.setAttribute('for', 'f_' + field.key)
				wrap.appendChild(label)

				let input
				const val = record ? record[field.key] : ''
				if (field.type === 'select') {
					input = document.createElement('select')
					;(field.options || []).forEach((opt) => {
						const o = document.createElement('option')
						o.value = opt
						o.textContent = opt
						if (String(val) === String(opt)) o.selected = true
						input.appendChild(o)
					})
				} else if (field.type === 'textarea') {
					input = document.createElement('textarea')
					input.rows = 3
					input.value = val || ''
				} else {
					input = document.createElement('input')
					input.type = field.type || 'text'
					input.value = val == null ? '' : val
				}
				input.id = 'f_' + field.key
				input.name = field.key
				if (field.required) input.required = true
				wrap.appendChild(input)
				modalForm.appendChild(wrap)
			})
		}

		function openModal(mode, record) {
			editingId = mode === 'edit' && record ? record.id : null
			modalTitle.textContent = mode === 'edit' ? '编辑' : '新增'
			buildFormFields(record || {})
			modal.classList.remove('hidden')
			modal.setAttribute('aria-hidden', 'false')
		}

		function closeModal() {
			modal.classList.add('hidden')
			modal.setAttribute('aria-hidden', 'true')
			editingId = null
		}

		function collectForm() {
			const payload = {}
			config.fields.forEach((field) => {
				const el = modalForm.querySelector('[name="' + field.key + '"]')
				if (!el) return
				let v = el.value
				if (field.type === 'number') v = v === '' ? '' : Number(v)
				payload[field.key] = v
			})
			return payload
		}

		function renderTable() {
			const rows = store.list(moduleKey, keyword)
			tbody.innerHTML = ''
			emptyEl.hidden = rows.length > 0
			rows.forEach((row) => {
				const tr = document.createElement('tr')
				config.columns.forEach((col) => {
					const td = document.createElement('td')
					td.textContent = row[col.key] == null ? '' : row[col.key]
					tr.appendChild(td)
				})
				const tdAct = document.createElement('td')
				tdAct.className = 'crud-actions'
				tdAct.innerHTML =
					'<button type="button" class="btn-link btn-edit">编辑</button>' +
					'<button type="button" class="btn-link btn-del danger">删除</button>'
				tdAct.querySelector('.btn-edit').addEventListener('click', () => openModal('edit', row))
				tdAct.querySelector('.btn-del').addEventListener('click', () => {
					if (confirm('确认删除该记录？')) {
						store.remove(moduleKey, row.id)
						renderTable()
						global.dispatchEvent(new CustomEvent('hcs-data-changed'))
					}
				})
				tr.appendChild(tdAct)
				tbody.appendChild(tr)
			})
		}

		searchInput.addEventListener('input', () => {
			keyword = searchInput.value
			renderTable()
		})
		addBtn.addEventListener('click', () => openModal('add'))
		modalClose.addEventListener('click', closeModal)
		modalCancel.addEventListener('click', closeModal)
		modalSave.addEventListener('click', () => {
			if (!modalForm.reportValidity()) return
			const payload = collectForm()
			if (editingId) {
				store.update(moduleKey, editingId, payload)
			} else {
				store.create(moduleKey, payload)
			}
			closeModal()
			renderTable()
			global.dispatchEvent(new CustomEvent('hcs-data-changed'))
		})
		modal.addEventListener('click', (e) => {
			if (e.target === modal) closeModal()
		})

		renderTable()
	}

	global.HcsCrud = { mountModule }
})(window)
