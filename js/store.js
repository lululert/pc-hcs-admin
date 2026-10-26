(function (global) {
	const STORAGE_KEY = 'hcs_admin_crud_v3'

	function nowIso() {
		return new Date().toISOString().slice(0, 19).replace('T', ' ')
	}

	function uid() {
		return 'id_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8)
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
			]
		}
	}

	function mergeLegacyData(parsed) {
		const seed = seedData()
		if (!Array.isArray(parsed.pilots)) {
			parsed.pilots = seed.pilots.slice()
		}
		return parsed
	}

	function loadAll() {
		try {
			let raw = localStorage.getItem(STORAGE_KEY)
			if (!raw) {
				const legacy = localStorage.getItem('hcs_admin_crud_v2')
				if (legacy) {
					const data = mergeLegacyData(JSON.parse(legacy))
					saveAll(data)
					return data
				}
				const seeded = seedData()
				saveAll(seeded)
				return seeded
			}
			return mergeLegacyData(JSON.parse(raw))
		} catch (e) {
			const seeded = seedData()
			saveAll(seeded)
			return seeded
		}
	}

	function saveAll(data) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
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
		const row = Object.assign({}, payload, { id: uid(), updatedAt: nowIso() })
		data[module].unshift(row)
		saveAll(data)
		return row
	}

	function update(module, id, payload) {
		const data = loadAll()
		const idx = (data[module] || []).findIndex((r) => r.id === id)
		if (idx < 0) return null
		data[module][idx] = Object.assign({}, data[module][idx], payload, { id, updatedAt: nowIso() })
		saveAll(data)
		return data[module][idx]
	}

	function remove(module, id) {
		const data = loadAll()
		data[module] = (data[module] || []).filter((r) => r.id !== id)
		saveAll(data)
	}

	function stats() {
		const data = loadAll()
		return {
			nodes: (data.nodes || []).length,
			inventory: (data.inventory || []).length,
			dispatch: (data.dispatch || []).length,
			trace: (data.trace || []).length,
			procurement: (data.procurement || []).length,
			warnings: (data.warnings || []).filter((w) => w.status !== '已闭环').length,
			pilots: (data.pilots || []).length,
			hcsRules: (data.hcsRules || []).length
		}
	}

	function resetDemo() {
		saveAll(seedData())
	}

	global.HcsStore = {
		list,
		getById,
		create,
		update,
		remove,
		stats,
		resetDemo
	}
})(window)
