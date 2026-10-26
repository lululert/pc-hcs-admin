(function (global) {
	const MODULES = {
		nodes: {
			title: '供应链节点布局',
			desc: '管理中心仓、前置仓、门店等多层级节点及协同规则。',
			columns: [
				{ key: 'name', label: '节点名称' },
				{ key: 'type', label: '节点类型' },
				{ key: 'region', label: '所在区域' },
				{ key: 'status', label: '协同状态' },
				{ key: 'syncRule', label: '协同规则摘要' }
			],
			fields: [
				{ key: 'name', label: '节点名称', type: 'text', required: true },
				{
					key: 'type',
					label: '节点类型',
					type: 'select',
					required: true,
					options: ['中心仓', '前置仓', '门店', '供应商节点']
				},
				{ key: 'region', label: '所在区域', type: 'text', required: true },
				{ key: 'province', label: '省', type: 'text' },
				{ key: 'city', label: '市', type: 'text' },
				{
					key: 'status',
					label: '协同状态',
					type: 'select',
					options: ['正常联动', '信息同步中', '暂停协同']
				},
				{ key: 'syncRule', label: '协同规则', type: 'textarea' },
				{ key: 'remark', label: '备注', type: 'textarea' }
			]
		},
		inventory: {
			title: '库存动态管控',
			desc: '多仓库存水位、安全库存与周转监测。',
			columns: [
				{ key: 'nodeName', label: '仓节点' },
				{ key: 'skuName', label: '物料/SKU' },
				{ key: 'qty', label: '当前库存' },
				{ key: 'safetyQty', label: '安全库存' },
				{ key: 'turnoverDays', label: '周转天数' },
				{ key: 'advice', label: '调拨建议' }
			],
			fields: [
				{ key: 'nodeName', label: '仓节点', type: 'text', required: true },
				{ key: 'skuName', label: '物料/SKU', type: 'text', required: true },
				{ key: 'qty', label: '当前库存', type: 'number', required: true },
				{ key: 'safetyQty', label: '安全库存', type: 'number', required: true },
				{ key: 'turnoverDays', label: '周转天数', type: 'number' },
				{
					key: 'advice',
					label: '调拨建议',
					type: 'select',
					options: ['维持', '补货', '调出', '盘点复核']
				}
			]
		},
		dispatch: {
			title: '仓储协同调度',
			desc: '跨节点调拨、补货计划与执行状态。',
			columns: [
				{ key: 'fromNode', label: '调出节点' },
				{ key: 'toNode', label: '调入节点' },
				{ key: 'skuName', label: '物料' },
				{ key: 'qty', label: '数量' },
				{ key: 'planDate', label: '计划日期' },
				{ key: 'status', label: '状态' }
			],
			fields: [
				{ key: 'fromNode', label: '调出节点', type: 'text', required: true },
				{ key: 'toNode', label: '调入节点', type: 'text', required: true },
				{ key: 'skuName', label: '物料', type: 'text', required: true },
				{ key: 'qty', label: '数量', type: 'number', required: true },
				{ key: 'planDate', label: '计划日期', type: 'date', required: true },
				{
					key: 'status',
					label: '状态',
					type: 'select',
					options: ['待调度', '在途', '已完成', '已取消']
				},
				{ key: 'remark', label: '备注', type: 'textarea' }
			]
		},
		trace: {
			title: '物料流转追溯',
			desc: '批次在全链路的流转路径与状态跟踪。',
			columns: [
				{ key: 'batchNo', label: '批次号' },
				{ key: 'material', label: '物料' },
				{ key: 'fromNode', label: '来源节点' },
				{ key: 'currentNode', label: '当前节点' },
				{ key: 'status', label: '状态' }
			],
			fields: [
				{ key: 'batchNo', label: '批次号', type: 'text', required: true },
				{ key: 'material', label: '物料', type: 'text', required: true },
				{ key: 'fromNode', label: '来源节点', type: 'text' },
				{ key: 'currentNode', label: '当前节点', type: 'text', required: true },
				{
					key: 'status',
					label: '状态',
					type: 'select',
					options: ['已入库', '在途', '已到货核验', '异常待处理']
				},
				{ key: 'trackNote', label: '流转说明', type: 'textarea' }
			]
		},
		procurement: {
			title: '供需匹配与采购协同',
			desc: '门店需求预测、供应计划与采购批次协同。',
			columns: [
				{ key: 'storeName', label: '门店/节点' },
				{ key: 'skuName', label: '物料' },
				{ key: 'demandQty', label: '预测需求' },
				{ key: 'supplyQty', label: '供应计划' },
				{ key: 'batchNo', label: '采购批次' },
				{ key: 'matchStatus', label: '匹配状态' }
			],
			fields: [
				{ key: 'storeName', label: '门店/节点', type: 'text', required: true },
				{ key: 'skuName', label: '物料', type: 'text', required: true },
				{ key: 'demandQty', label: '预测需求', type: 'number', required: true },
				{ key: 'supplyQty', label: '供应计划', type: 'number', required: true },
				{ key: 'batchNo', label: '采购批次', type: 'text' },
				{
					key: 'matchStatus',
					label: '匹配状态',
					type: 'select',
					options: ['平衡', '供大于求', '供小于求', '待复核']
				},
				{ key: 'planDate', label: '计划日期', type: 'date' }
			]
		},
		warnings: {
			title: '仓储作业预警',
			desc: '库存、临期、流转效率等指标分级预警与处置。',
			columns: [
				{ key: 'level', label: '级别' },
				{ key: 'indicator', label: '指标' },
				{ key: 'nodeName', label: '节点' },
				{ key: 'threshold', label: '阈值' },
				{ key: 'currentValue', label: '当前值' },
				{ key: 'status', label: '处置状态' }
			],
			fields: [
				{
					key: 'level',
					label: '级别',
					type: 'select',
					options: ['蓝色', '黄色', '橙色', '红色']
				},
				{ key: 'indicator', label: '指标', type: 'text', required: true },
				{ key: 'nodeName', label: '节点', type: 'text', required: true },
				{ key: 'threshold', label: '阈值', type: 'text' },
				{ key: 'currentValue', label: '当前值', type: 'text' },
				{
					key: 'status',
					label: '处置状态',
					type: 'select',
					options: ['待处理', '处理中', '已闭环']
				},
				{ key: 'description', label: '说明', type: 'textarea' }
			]
		},
		pilots: {
			title: '试点核验与反馈',
			desc: '技术方法路线（4）：分阶段试点、归集实操反馈并调整协同规则与预警阈值。',
			columns: [
				{ key: 'phase', label: '阶段' },
				{ key: 'scene', label: '试点场景' },
				{ key: 'owner', label: '负责人' },
				{ key: 'status', label: '状态' },
				{ key: 'feedback', label: '反馈摘要' }
			],
			fields: [
				{ key: 'phase', label: '阶段', type: 'text', required: true },
				{ key: 'scene', label: '试点场景', type: 'text', required: true },
				{ key: 'owner', label: '负责人', type: 'text' },
				{
					key: 'status',
					label: '状态',
					type: 'select',
					options: ['计划中', '进行中', '已完成', '待复盘']
				},
				{ key: 'feedback', label: '实操反馈', type: 'textarea' },
				{ key: 'adjustment', label: '规则/阈值调整', type: 'textarea' }
			]
		},
		simulations: {
			title: '场景模拟推演',
			desc: '技术方法路线（3）：多节点、多网点、多规模模拟，校验协同适配并迭代管控参数。',
			columns: [
				{ key: 'name', label: '推演名称' },
				{ key: 'scale', label: '规模' },
				{ key: 'focus', label: '验证重点' },
				{ key: 'result', label: '结论' },
				{ key: 'runDate', label: '推演日期' }
			],
			fields: [
				{ key: 'name', label: '推演名称', type: 'text', required: true },
				{ key: 'scale', label: '规模描述', type: 'text', required: true },
				{ key: 'focus', label: '验证重点', type: 'text' },
				{
					key: 'result',
					label: '结论',
					type: 'select',
					options: ['通过', '部分通过', '未通过', '待复测']
				},
				{ key: 'issues', label: '发现问题', type: 'textarea' },
				{ key: 'tuning', label: '参数/模型调整', type: 'textarea' },
				{ key: 'runDate', label: '推演日期', type: 'date' }
			]
		},
		knowledge: {
			title: 'HCS 知识沉淀',
			desc: '技术内容（6）：仓储协同知识积累与迭代优化，支撑门店拓展与节点调整快速适配。',
			columns: [
				{ key: 'title', label: '标题' },
				{ key: 'category', label: '分类' },
				{ key: 'version', label: '版本' },
				{ key: 'source', label: '来源' },
				{ key: 'updatedAt', label: '更新时间' }
			],
			fields: [
				{ key: 'title', label: '标题', type: 'text', required: true },
				{
					key: 'category',
					label: '分类',
					type: 'select',
					options: ['节点协同', '调度策略', '库存核定', '追溯规范', '供需模型', '预警阈值']
				},
				{ key: 'version', label: '版本', type: 'text' },
				{ key: 'source', label: '来源', type: 'text' },
				{ key: 'summary', label: '要点摘要', type: 'textarea', required: true }
			]
		},
		users: {
			title: '协同人员与角色',
			desc: '作业人员、调度管理人员及各环节协同角色维护。',
			columns: [
				{ key: 'name', label: '姓名' },
				{ key: 'role', label: '角色' },
				{ key: 'nodeName', label: '所属节点' },
				{ key: 'phone', label: '联系电话' },
				{ key: 'status', label: '状态' }
			],
			fields: [
				{ key: 'name', label: '姓名', type: 'text', required: true },
				{
					key: 'role',
					label: '角色',
					type: 'select',
					options: ['调度管理员', '仓储作业', '门店负责人', '供应商联络', '其他']
				},
				{ key: 'nodeName', label: '所属节点', type: 'text' },
				{ key: 'phone', label: '联系电话', type: 'text' },
				{
					key: 'status',
					label: '状态',
					type: 'select',
					options: ['在岗', '休假', '停用']
				},
				{ key: 'remark', label: '备注', type: 'textarea' }
			]
		},
		systemUsers: {
			title: '系统用户管理',
			desc: '管理端登录账号、权限角色与启用状态（本地存储；上线应对接统一认证）。',
			columns: [
				{ key: 'username', label: '登录账号' },
				{ key: 'displayName', label: '姓名' },
				{ key: 'role', label: '权限角色' },
				{ key: 'phone', label: '手机' },
				{ key: 'status', label: '状态' }
			],
			fields: [
				{ key: 'username', label: '登录账号', type: 'text', required: true },
				{ key: 'password', label: '登录密码', type: 'password', placeholder: '编辑时留空则不修改' },
				{ key: 'displayName', label: '姓名', type: 'text', required: true },
				{
					key: 'role',
					label: '权限角色',
					type: 'select',
					required: true,
					options: ['系统管理员', '调度管理员', '仓储管理员', '业务只读', '审计只读']
				},
				{ key: 'phone', label: '手机', type: 'text' },
				{
					key: 'status',
					label: '状态',
					type: 'select',
					options: ['正常', '停用']
				},
				{ key: 'remark', label: '备注', type: 'textarea' }
			]
		},
		auditLogs: {
			title: '操作日志',
			desc: '本控制台内的增删改操作留痕（本地存储，最多保留 200 条）。',
			readOnly: true,
			columns: [
				{ key: 'time', label: '时间' },
				{ key: 'action', label: '操作' },
				{ key: 'moduleLabel', label: '模块' },
				{ key: 'detail', label: '摘要' },
				{ key: 'operator', label: '操作人' }
			],
			fields: []
		},
		hcsRules: {
			title: 'HCS 协同规则',
			desc: '体系成果：节点协同操作规范、调度细则、库存导则、供需决策规程。',
			columns: [
				{ key: 'version', label: '版本' },
				{ key: 'title', label: '规则名称' },
				{ key: 'scope', label: '适用范围' },
				{ key: 'status', label: '状态' },
				{ key: 'effectiveDate', label: '生效日期' }
			],
			fields: [
				{ key: 'version', label: '版本号', type: 'text', required: true },
				{ key: 'title', label: '规则名称', type: 'text', required: true },
				{ key: 'scope', label: '适用范围', type: 'text', required: true },
				{
					key: 'status',
					label: '状态',
					type: 'select',
					options: ['草稿', '生效中', '已归档']
				},
				{ key: 'effectiveDate', label: '生效日期', type: 'date' },
				{ key: 'adaptationNote', label: '迭代适配说明', type: 'textarea' }
			]
		}
	}

	const PAGE_MODULE = {
		node: 'nodes',
		inventory: 'inventory',
		dispatch: 'dispatch',
		trace: 'trace',
		procurement: 'procurement',
		warning: 'warnings',
		pilot: 'pilots',
		simulation: 'simulations',
		knowledge: 'knowledge',
		users: 'users',
		sysusers: 'systemUsers',
		audit: 'auditLogs',
		hcs: 'hcsRules'
	}

	global.HcsModules = { MODULES, PAGE_MODULE }
})(window)
