(function (global) {
	const STORAGE_KEY = 'hcs_admin_crud_v4'
	const LEGACY_KEYS = ['hcs_admin_crud_v3', 'hcs_admin_crud_v2']

	const MODULE_LABELS = {
		nodes: '节点布局',
		inventory: '库存管控',
		dispatch: '仓储调度',
		trace: '流转追溯',
		procurement: '供需采购',
		warnings: '预警管控',
		pilots: '试点核验',
		simulations: '场景推演',
		knowledge: '知识沉淀',
		users: '协同人员',
		systemUsers: '系统用户',
		hcsRules: 'HCS 规则',
		auditLogs: '操作日志'
	}

	function nowIso() {
		return new Date().toISOString().slice(0, 19).replace('T', ' ')
	}

	function uid() {
		return 'id_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8)
	}

	function getOperator() {
		try {
			const raw = sessionStorage.getItem('hcs_admin_session')
			if (!raw) return '未知'
			const s = JSON.parse(raw)
			return s.displayName || s.username || '未知'
		} catch (e) {
			return '未知'
		}
	}

	function seedData() {
		return {
			nodes: [
				{
					id: uid(),
					name: '华中中央厨房仓',
					type: '中心仓',
					region: '湖北武汉',
					province: '湖北省',
					city: '武汉市',
					status: '正常联动',
					syncRule: '与前置仓 T+0 库存同步',
					remark: '',
					updatedAt: nowIso()
				},
				{
					id: uid(),
					name: '武昌前置仓',
					type: '前置仓',
					region: '湖北武汉',
					province: '湖北省',
					city: '武汉市',
					status: '正常联动',
					syncRule: '门店需求 2 小时汇总',
					remark: '',
					updatedAt: nowIso()
				},
				{
					id: uid(),
					name: '光谷餐饮门店 A',
					type: '门店',
					region: '湖北武汉',
					province: '湖北省',
					city: '武汉市',
					status: '正常联动',
					syncRule: '日销预测 T+1 补货',
					remark: '',
					updatedAt: nowIso()
				}
			],
			inventory: [
				{
					id: uid(),
					nodeName: '华中中央厨房仓',
					skuName: '净菜包-A',
					qty: 3200,
					safetyQty: 2800,
					turnoverDays: 18,
					advice: '维持',
					updatedAt: nowIso()
				},
				{
					id: uid(),
					nodeName: '武昌前置仓',
					skuName: '净菜包-A',
					qty: 420,
					safetyQty: 540,
					turnoverDays: 9,
					advice: '补货',
					updatedAt: nowIso()
				},
				{
					id: uid(),
					nodeName: '武昌前置仓',
					skuName: '冷鲜禽肉-B',
					qty: 180,
					safetyQty: 200,
					turnoverDays: 5,
					advice: '补货',
					updatedAt: nowIso()
				}
			],
			dispatch: [
				{
					id: uid(),
					fromNode: '华中中央厨房仓',
					toNode: '武昌前置仓',
					skuName: '净菜包-A',
					qty: 200,
					planDate: '2026-10-27',
					status: '待调度',
					remark: '',
					updatedAt: nowIso()
				},
				{
					id: uid(),
					fromNode: '武昌前置仓',
					toNode: '光谷餐饮门店 A',
					skuName: '净菜包-A',
					qty: 80,
					planDate: '2026-10-27',
					status: '在途',
					remark: '',
					updatedAt: nowIso()
				}
			],
			trace: [
				{
					id: uid(),
					batchNo: 'FL-20261026-001',
					material: '净菜包',
					fromNode: '中心仓',
					currentNode: '前置仓在途',
					status: '在途',
					trackNote: '冷链运输',
					updatedAt: nowIso()
				},
				{
					id: uid(),
					batchNo: 'FL-20261025-008',
					material: '冷鲜禽肉',
					fromNode: '供应商节点',
					currentNode: '华中中央厨房仓',
					status: '已入库',
					trackNote: '质检合格',
					updatedAt: nowIso()
				}
			],
			procurement: [
				{
					id: uid(),
					storeName: '光谷餐饮门店 A',
					skuName: '净菜包-A',
					demandQty: 120,
					supplyQty: 118,
					batchNo: 'PO-20261026-03',
					matchStatus: '平衡',
					planDate: '2026-10-28',
					updatedAt: nowIso()
				}
			],
			warnings: [
				{
					id: uid(),
					level: '黄色',
					indicator: '库存水位',
					nodeName: '武昌前置仓',
					threshold: '≥540',
					currentValue: '420',
					status: '待处理',
					description: '低于安全线 22%',
					updatedAt: nowIso()
				},
				{
					id: uid(),
					level: '橙色',
					indicator: '临期保质期',
					nodeName: '华中中央厨房仓',
					threshold: '≤48h',
					currentValue: '36h',
					status: '处理中',
					description: '批次 FL-20261024 优先出库',
					updatedAt: nowIso()
				}
			],
			hcsRules: [
				{
					id: uid(),
					version: 'v1.2',
					title: '节点协同操作规范',
					scope: '全链路节点',
					status: '生效中',
					effectiveDate: '2026-01-01',
					adaptationNote: '门店拓展时自动复制前置仓模板',
					updatedAt: nowIso()
				},
				{
					id: uid(),
					version: 'v1.1',
					title: '仓储调度管理细则',
					scope: '中心仓-前置仓',
					status: '生效中',
					effectiveDate: '2026-01-01',
					adaptationNote: '',
					updatedAt: nowIso()
				},
				{
					id: uid(),
					version: 'v1.0',
					title: '库存管控导则',
					scope: '全仓储节点',
					status: '生效中',
					effectiveDate: '2026-01-01',
					adaptationNote: '',
					updatedAt: nowIso()
				},
				{
					id: uid(),
					version: 'v1.0',
					title: '供需协同决策规程',
					scope: '门店采购',
					status: '生效中',
					effectiveDate: '2026-01-01',
					adaptationNote: '',
					updatedAt: nowIso()
				}
			],
			pilots: [
				{
					id: uid(),
					phase: '第一阶段',
					scene: '华中区前置仓补货协同',
					owner: '调度管理员',
					status: '进行中',
					feedback: '库存核定口径需与门店日销对齐',
					adjustment: '预警阈值下调 5%',
					updatedAt: nowIso()
				}
			],
			simulations: [
				{
					id: uid(),
					name: '三仓十二店峰值补货推演',
					scale: '3 仓储节点 · 12 门店',
					focus: '调拨时序与库存水位',
					result: '通过',
					issues: '极端天气下前置仓响应延迟 4h',
					tuning: '增加备用线路参数',
					runDate: '2026-10-20',
					updatedAt: nowIso()
				},
				{
					id: uid(),
					name: '追溯断点压力测试',
					scale: '全链路 500 批次',
					focus: '信息断点与核验闭环',
					result: '部分通过',
					issues: '门店到货扫码漏录 1.2%',
					tuning: '补录节点与提醒阈值',
					runDate: '2026-10-22',
					updatedAt: nowIso()
				}
			],
			knowledge: [
				{
					id: uid(),
					title: '前置仓安全库存核定口径',
					category: '库存核定',
					version: 'v2.0',
					source: '试点反馈沉淀',
					summary: '按门店 7 日滚动均销 × 覆盖天数，节假日系数 1.15。',
					updatedAt: nowIso()
				},
				{
					id: uid(),
					title: '中心仓向前置仓补货波次',
					category: '调度策略',
					version: 'v1.3',
					source: '模拟推演优化',
					summary: '日配 06:00 / 14:00 两波；紧急单走 2h 快速通道。',
					updatedAt: nowIso()
				}
			],
			users: [
				{
					id: uid(),
					name: '王调度',
					role: '调度管理员',
					nodeName: '华中中央厨房仓',
					phone: '138****0001',
					status: '在岗',
					remark: '',
					updatedAt: nowIso()
				},
				{
					id: uid(),
					name: '李仓管',
					role: '仓储作业',
					nodeName: '武昌前置仓',
					phone: '139****0002',
					status: '在岗',
					remark: '',
					updatedAt: nowIso()
				}
			],
			systemUsers: [
				{
					id: uid(),
					username: 'admin',
					password: '123456',
					displayName: '系统管理员',
					role: '系统管理员',
					phone: '',
					status: '正常',
					remark: '',
					updatedAt: nowIso()
				},
				{
					id: uid(),
					username: 'dispatch01',
					password: '123456',
					displayName: '调度管理员',
					role: '调度管理员',
					phone: '13800000001',
					status: '正常',
					remark: '',
					updatedAt: nowIso()
				}
			],
			auditLogs: []
		}
	}

	function countActiveAdmins(data) {
		return (data.systemUsers || []).filter(
			(u) => u.role === '系统管理员' && u.status === '正常'
		).length
	}

	function ensureShape(parsed) {
		const seed = seedData()
		Object.keys(seed).forEach((key) => {
			if (!Array.isArray(parsed[key])) {
				parsed[key] = key === 'auditLogs' ? [] : seed[key].slice()
			}
		})
		return parsed
	}

	function loadAll() {
		try {
			let raw = localStorage.getItem(STORAGE_KEY)
			if (!raw) {
				for (let i = 0; i < LEGACY_KEYS.length; i++) {
					const legacy = localStorage.getItem(LEGACY_KEYS[i])
					if (legacy) {
						const data = ensureShape(JSON.parse(legacy))
						saveAll(data)
						return data
					}
				}
				const seeded = seedData()
				saveAll(seeded)
				return seeded
			}
			return ensureShape(JSON.parse(raw))
		} catch (e) {
			const seeded = seedData()
			saveAll(seeded)
			return seeded
		}
	}

	function saveAll(data) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
	}

	function appendAudit(module, action, detail) {
		if (module === 'auditLogs') return
		const data = loadAll()
		if (!data.auditLogs) data.auditLogs = []
		data.auditLogs.unshift({
			id: uid(),
			time: nowIso(),
			module,
			moduleLabel: MODULE_LABELS[module] || module,
			action,
			detail: detail || '',
			operator: getOperator()
		})
		if (data.auditLogs.length > 200) {
			data.auditLogs = data.auditLogs.slice(0, 200)
		}
		saveAll(data)
	}

	function list(module, keyword) {
		const data = loadAll()
		const rows = data[module] || []
		const kw = (keyword || '').trim().toLowerCase()
		if (!kw) return rows.slice()
		return rows.filter((row) => JSON.stringify(row).toLowerCase().includes(kw))
	}

	function getById(module, id) {
		return list(module).find((r) => r.id === id) || null
	}

	function create(module, payload) {
		const data = loadAll()
		if (!data[module]) data[module] = []
		if (module === 'systemUsers') {
			const username = String(payload.username || '').trim()
			if (!username) throw new Error('请填写登录账号')
			if (!payload.password) throw new Error('请设置登录密码')
			if ((data.systemUsers || []).some((u) => u.username === username)) {
				throw new Error('登录账号已存在')
			}
		}
		const row = Object.assign({}, payload, { id: uid(), updatedAt: nowIso() })
		if (module === 'systemUsers') {
			row.username = String(row.username || '').trim()
		}
		data[module].unshift(row)
		saveAll(data)
		const auditPayload = Object.assign({}, payload)
		if (auditPayload.password) auditPayload.password = '***'
		appendAudit(module, '新增', JSON.stringify(auditPayload).slice(0, 120))
		return row
	}

	function update(module, id, payload) {
		const data = loadAll()
		const idx = (data[module] || []).findIndex((r) => r.id === id)
		if (idx < 0) return null
		if (module === 'systemUsers') {
			const next = Object.assign({}, data[module][idx], payload, { id, updatedAt: nowIso() })
			const username = String(next.username || '').trim()
			next.username = username
			if (
				(data.systemUsers || []).some((u) => u.id !== id && u.username === username)
			) {
				throw new Error('登录账号已存在')
			}
			if (!payload.password) {
				next.password = data[module][idx].password
			}
			if (next.status === '停用' && next.role === '系统管理员' && countActiveAdmins(data) <= 1) {
				throw new Error('至少保留一名启用中的系统管理员')
			}
			data[module][idx] = next
		} else {
			data[module][idx] = Object.assign({}, data[module][idx], payload, { id, updatedAt: nowIso() })
		}
		saveAll(data)
		appendAudit(module, '编辑', 'id=' + id)
		return data[module][idx]
	}

	function remove(module, id) {
		const data = loadAll()
		if (module === 'systemUsers') {
			const row = (data.systemUsers || []).find((r) => r.id === id)
			if (!row) return
			if (row.role === '系统管理员' && row.status === '正常' && countActiveAdmins(data) <= 1) {
				throw new Error('无法删除最后一名系统管理员')
			}
		}
		data[module] = (data[module] || []).filter((r) => r.id !== id)
		saveAll(data)
		appendAudit(module, '删除', 'id=' + id)
	}

	function validateLogin(username, password) {
		const u = String(username || '').trim()
		const p = String(password || '')
		if (!u || !p) {
			return { ok: false, message: '请输入账号和密码' }
		}
		const row = list('systemUsers', '').find(
			(r) => r.username === u && r.status === '正常'
		)
		if (!row || row.password !== p) {
			return { ok: false, message: '账号或密码错误' }
		}
		return {
			ok: true,
			user: {
				username: row.username,
				displayName: row.displayName || row.username,
				role: row.role || ''
			}
		}
	}

	function stats() {
		const data = loadAll()
		return {
			nodes: (data.nodes || []).length,
			inventory: (data.inventory || []).length,
			dispatch: (data.dispatch || []).filter((d) => d.status === '在途' || d.status === '待调度').length,
			trace: (data.trace || []).length,
			procurement: (data.procurement || []).length,
			warnings: (data.warnings || []).filter((w) => w.status !== '已闭环').length,
			pilots: (data.pilots || []).length,
			simulations: (data.simulations || []).length,
			knowledge: (data.knowledge || []).length,
			users: (data.users || []).length,
			systemUsers: (data.systemUsers || []).filter((u) => u.status === '正常').length,
			hcsRules: (data.hcsRules || []).length
		}
	}

	function resetDemo() {
		saveAll(seedData())
		appendAudit('system', '恢复初始数据', '重置全部业务数据')
	}

	function exportJson() {
		return JSON.stringify(loadAll(), null, 2)
	}

	function importJson(text) {
		const parsed = ensureShape(JSON.parse(text))
		saveAll(parsed)
		appendAudit('system', '导入数据', 'JSON 覆盖本地存储')
	}

	global.HcsStore = {
		list,
		getById,
		create,
		update,
		remove,
		stats,
		resetDemo,
		exportJson,
		importJson,
		validateLogin
	}
})(window)
