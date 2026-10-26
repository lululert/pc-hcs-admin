(function (global) {
	const DOCS = {
		goals: {
			title: '技术目标',
			subtitle: '第一条 · 本合同研究开发项目的要求 · 1. 技术目标',
			items: [
				'形成餐饮供应链仓储协同服务（HCS）管理模型的核心技术需求，开展供应链节点布局、仓储协同调度、库存动态管控、物料流转追溯、供需协同决策等专项配套技术研究，统一餐饮供应链全流程作业标准与管控细则，提升供应链周转效率与仓储协同精细化水平。',
				'针对餐饮供应链分布式特征（多区域门店、多供应商、多仓储节点），构建节点协同、仓储调度、库存管控、流转追溯、供需决策等完整技术体系，形成 HCS 分布式仓储协同管理方法论，适配多门店常态化协同作业需求。',
				'建立仓储协同状态可协同、库存水平可管控、物料流转可追溯、供需匹配可评价的技术规范，形成覆盖餐饮供应链仓储协同全流程的专业技术支撑条件，为作业优化与管控决策提供依据。',
				'兼顾门店网点扩充、仓储节点新增、供应链规模扩容需求，形成可灵活适配的 HCS 管控机制，根据门店布局调整、供应结构变化、规模增长动态优化管控机制与协同方案，满足 HCS 管理体系长期迭代需求。'
			]
		},
		techContent: {
			title: '技术内容',
			subtitle: '2. 技术内容（六大配套技术）',
			items: [
				'（1）分布式供应链节点布局与协同配套技术：研究餐饮供应链门店、中央仓、前置仓等多级节点的空间布局与协同关系设计技术，构建分区域、分级别的仓储节点协同框架，实现多节点信息互通与作业联动。',
				'（2）仓储协同调度与库存动态管控配套技术：研究多仓储节点间的调拨补货、库存水平动态监控与安全库存核定技术，构建分布式库存协同调控机制，实现库存资源按需调配、避免缺货与积压并存的失衡问题。',
				'（3）餐饮物料流转路径与追溯配套技术：研究餐饮原料、半成品、成品在多节点间的流转路径规划与状态跟踪技术，构建物料全链路流转追溯机制，实现从入库、存储、调拨到门店到货全过程可追踪、可核验。',
				'（4）供应链供需匹配与采购协同配套技术：研究门店需求预测、供应计划编制与采购批次协同技术，构建基于实际消耗的供需匹配模型，实现多门店需求与多节点供给的动态平衡与协同决策。',
				'（5）分布式仓储作业与预警管控配套技术：建立库存水位、临期保质期、流转效率等关键指标的分级预警机制，实现仓储作业异常识别与闭环处置，保障供应链仓储环节稳定运行。',
				'（6）HCS 协同体系迭代适配配套技术：构建餐饮供应链仓储协同知识积累与迭代优化机制，研究门店拓展、节点调整、经营模式变化等条件下 HCS 管理体系的快速适配方法，满足长期演进需求。'
			],
			links: [
				{ label: '节点布局管理', page: 'node' },
				{ label: '库存管控', page: 'inventory' },
				{ label: '仓储调度', page: 'dispatch' },
				{ label: '流转追溯', page: 'trace' },
				{ label: '供需采购', page: 'procurement' },
				{ label: '预警管控', page: 'warning' },
				{ label: 'HCS 规则', page: 'hcs' },
				{ label: '试点核验', page: 'pilot' },
				{ label: '场景模拟推演', page: 'simulation' },
				{ label: 'HCS 知识沉淀', page: 'knowledge' }
			]
		},
		architecture: {
			title: '模块与合同条款映射',
			subtitle: '控制台功能与合同技术内容 / 方法路线 / 成果的一体化对应关系',
			items: [
				'技术内容（1）节点布局 → 节点布局；技术内容（2）调度与库存 → 仓储调度、库存管控。',
				'技术内容（3）流转追溯 → 流转追溯；技术内容（4）供需采购 → 供需采购。',
				'技术内容（5）预警管控 → 预警管控；技术内容（6）迭代适配 → HCS 规则、知识沉淀。',
				'方法路线（3）模拟推演 → 场景模拟推演；方法路线（4）试点核验 → 试点核验与反馈。',
				'体系成果（5）规范定型 → HCS 规则；协同角色与留痕 → 协同人员、操作日志。',
				'数据备份与初始数据恢复 → 数据管理（系统管理）。'
			],
			links: [
				{ label: '数据管理', page: 'settings' },
				{ label: '操作日志', page: 'audit' },
				{ label: '协同人员', page: 'users' }
			]
		},
		methods: {
			title: '技术方法和路线',
			subtitle: '3. 技术方法和路线',
			items: [
				'（1）实地调研餐饮供应链多节点布局、仓储作业现状、库存管控流程与协同短板，梳理节点协同、仓储调度、库存管控、流转追溯、供需决策的约束条件与核心需求，明确 HCS 配套技术整体研究方向与关键管控指标。',
				'（2）按照节点布局协同、仓储协同调度、物料流转追溯、供需匹配决策、预警管控五大模块拆分研究内容，分配配套技术方案推演、作业细则细化、供应链场景模拟核验分步开展专项技术论证。',
				'（3）开展多节点、多网点、多规模模拟推演，校验整套配套技术的协同适配效果，针对节点信息断点、库存调控失衡、流转追溯缺失、供需匹配偏差等问题迭代优化协同模型与管控参数。',
				'（4）依托餐饮供应链实际运营场景开展分阶段试点核验，归集仓储作业人员、调度管理人员及各环节实操反馈，针对性调整节点协同规则、库存核定口径、流转追溯节点与预警阈值。'
			],
			links: [
				{ label: '场景模拟推演', page: 'simulation' },
				{ label: '试点核验与反馈', page: 'pilot' }
			]
		},
		deliverables: {
			title: '体系成果与规范',
			subtitle: '技术体系定型与专项成果',
			items: [
				'（5）完成整套餐饮供应链分布式 HCS 管理配套技术体系定型，编制节点协同操作规范、仓储调度管理细则、库存管控导则、供需协同决策规程，形成成熟可落地的专项技术成果。',
				'节点协同操作规范、仓储调度管理细则、库存管控导则、供需协同决策规程、HCS 分布式管理方法论等成果可在「HCS 规则」模块中维护版本与生效范围。'
			],
			links: [
				{ label: 'HCS 规则维护', page: 'hcs' },
				{ label: '试点核验记录', page: 'pilot' }
			]
		}
	}

	function escapeHtml(str) {
		return String(str == null ? '' : str)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
	}

	function render(docKey, hostEl) {
		const doc = DOCS[docKey]
		if (!doc || !hostEl) return
		let linksHtml = ''
		if (doc.links && doc.links.length) {
			linksHtml =
				'<div class="card"><h3>对应业务模块</h3><div class="quick-links">' +
				doc.links
					.map(
						(l) =>
							'<a href="#' +
							escapeHtml(l.page) +
							'" data-goto="' +
							escapeHtml(l.page) +
							'">' +
							escapeHtml(l.label) +
							'</a>'
					)
					.join('') +
				'</div></div>'
		}
		hostEl.innerHTML =
			'<h1 class="page-title">' +
			escapeHtml(doc.title) +
			'</h1>' +
			'<p class="page-desc">' +
			escapeHtml(doc.subtitle) +
			'</p>' +
			'<div class="card doc-card"><ol class="doc-list">' +
			doc.items.map((t) => '<li>' + escapeHtml(t) + '</li>').join('') +
			'</ol></div>' +
			linksHtml

		hostEl.querySelectorAll('[data-goto]').forEach((a) => {
			a.addEventListener('click', (e) => {
				e.preventDefault()
				const page = a.getAttribute('data-goto')
				if (page) {
					location.hash = page
				}
			})
		})
	}

	global.HcsProjectDocs = { DOCS, render }
})(window)
