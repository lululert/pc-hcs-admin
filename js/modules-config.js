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
		hcs: 'hcsRules'
	}

	global.HcsModules = { MODULES, PAGE_MODULE }
})(window)
