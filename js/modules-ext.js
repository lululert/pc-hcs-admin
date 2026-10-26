(function (global) {
	if (!global.HcsModules) return
	const M = global.HcsModules.MODULES
	const P = global.HcsModules.PAGE_MODULE

	Object.assign(M, {
		suppliers: {
			title: '供应商档案',
			desc: '多供应商准入、联络方式与协同状态管理。',
			columns: [
				{ key: 'name', label: '供应商' },
				{ key: 'category', label: '品类' },
				{ key: 'contact', label: '联系人' },
				{ key: 'phone', label: '电话' },
				{ key: 'status', label: '状态' }
			],
			fields: [
				{ key: 'name', label: '供应商名称', type: 'text', required: true },
				{ key: 'category', label: '供应品类', type: 'text', required: true },
				{ key: 'contact', label: '联系人', type: 'text' },
				{ key: 'phone', label: '联系电话', type: 'text' },
				{
					key: 'status',
					label: '协同状态',
					type: 'select',
					options: ['合作中', '暂停', '准入审核']
				},
				{ key: 'address', label: '地址', type: 'textarea' },
				{ key: 'remark', label: '备注', type: 'textarea' }
			]
		},
		materials: {
			title: '物料主数据',
			desc: 'SKU、规格、存储要求与默认供应商等主数据维护。',
			columns: [
				{ key: 'skuCode', label: 'SKU 编码' },
				{ key: 'name', label: '名称' },
				{ key: 'category', label: '分类' },
				{ key: 'unit', label: '单位' },
				{ key: 'shelfLifeDays', label: '保质期(天)' }
			],
			fields: [
				{ key: 'skuCode', label: 'SKU 编码', type: 'text', required: true },
				{ key: 'name', label: '物料名称', type: 'text', required: true },
				{ key: 'category', label: '分类', type: 'text', required: true },
				{ key: 'unit', label: '计量单位', type: 'text', required: true },
				{ key: 'shelfLifeDays', label: '保质期(天)', type: 'number' },
				{ key: 'storage', label: '存储要求', type: 'text' },
				{ key: 'defaultSupplier', label: '默认供应商', type: 'text' }
			]
		},
		organizations: {
			title: '组织架构',
			desc: '区域、事业部、营运片区等组织层级，用于权限与统计归集。',
			columns: [
				{ key: 'name', label: '组织名称' },
				{ key: 'type', label: '类型' },
				{ key: 'parentName', label: '上级组织' },
				{ key: 'leader', label: '负责人' },
				{ key: 'status', label: '状态' }
			],
			fields: [
				{ key: 'name', label: '组织名称', type: 'text', required: true },
				{
					key: 'type',
					label: '类型',
					type: 'select',
					options: ['总部', '区域', '事业部', '营运片区', '门店组']
				},
				{ key: 'parentName', label: '上级组织', type: 'text' },
				{ key: 'leader', label: '负责人', type: 'text' },
				{
					key: 'status',
					label: '状态',
					type: 'select',
					options: ['启用', '停用']
				}
			]
		},
		qualityChecks: {
			title: '质检与核验',
			desc: '入库、在途、到货环节的质量检验与放行记录。',
			columns: [
				{ key: 'batchNo', label: '批次' },
				{ key: 'material', label: '物料' },
				{ key: 'nodeName', label: '节点' },
				{ key: 'result', label: '结论' },
				{ key: 'checkDate', label: '检验日期' }
			],
			fields: [
				{ key: 'batchNo', label: '批次号', type: 'text', required: true },
				{ key: 'material', label: '物料', type: 'text', required: true },
				{ key: 'nodeName', label: '检验节点', type: 'text', required: true },
				{
					key: 'result',
					label: '结论',
					type: 'select',
					options: ['合格', '让步接收', '拒收', '复检中']
				},
				{ key: 'inspector', label: '检验员', type: 'text' },
				{ key: 'checkDate', label: '检验日期', type: 'date' },
				{ key: 'note', label: '说明', type: 'textarea' }
			]
		},
		approvals: {
			title: '协同审批',
			desc: '调拨、采购、规则变更等跨节点协同审批流。',
			columns: [
				{ key: 'title', label: '标题' },
				{ key: 'bizType', label: '类型' },
				{ key: 'applicant', label: '申请人' },
				{ key: 'status', label: '状态' },
				{ key: 'applyDate', label: '申请日期' }
			],
			fields: [
				{ key: 'title', label: '标题', type: 'text', required: true },
				{
					key: 'bizType',
					label: '业务类型',
					type: 'select',
					options: ['调拨审批', '采购审批', '规则变更', '预警豁免', '其他']
				},
				{ key: 'applicant', label: '申请人', type: 'text', required: true },
				{
					key: 'status',
					label: '状态',
					type: 'select',
					options: ['待审批', '已通过', '已驳回', '已撤回']
				},
				{ key: 'applyDate', label: '申请日期', type: 'date' },
				{ key: 'content', label: '申请说明', type: 'textarea' }
			]
		},
		dictionaries: {
			title: '数据字典',
			desc: '业务枚举、阈值类型、节点类型等可配置字典项。',
			columns: [
				{ key: 'dictType', label: '字典类型' },
				{ key: 'dictCode', label: '编码' },
				{ key: 'dictLabel', label: '显示名' },
				{ key: 'sort', label: '排序' },
				{ key: 'status', label: '状态' }
			],
			fields: [
				{ key: 'dictType', label: '字典类型', type: 'text', required: true },
				{ key: 'dictCode', label: '编码', type: 'text', required: true },
				{ key: 'dictLabel', label: '显示名', type: 'text', required: true },
				{ key: 'sort', label: '排序', type: 'number' },
				{
					key: 'status',
					label: '状态',
					type: 'select',
					options: ['启用', '停用']
				},
				{ key: 'remark', label: '备注', type: 'textarea' }
			]
		},
		notifications: {
			title: '消息通知',
			desc: '预警推送、审批提醒、系统公告等消息记录。',
			columns: [
				{ key: 'title', label: '标题' },
				{ key: 'type', label: '类型' },
				{ key: 'receiver', label: '接收对象' },
				{ key: 'readFlag', label: '已读' },
				{ key: 'sendTime', label: '时间' }
			],
			fields: [
				{ key: 'title', label: '标题', type: 'text', required: true },
				{
					key: 'type',
					label: '类型',
					type: 'select',
					options: ['预警', '审批', '公告', '任务', '其他']
				},
				{ key: 'receiver', label: '接收对象', type: 'text' },
				{
					key: 'readFlag',
					label: '已读',
					type: 'select',
					options: ['否', '是']
				},
				{ key: 'sendTime', label: '发送时间', type: 'text' },
				{ key: 'content', label: '内容', type: 'textarea', required: true }
			]
		},
		integrations: {
			title: '接口与集成',
			desc: '与 ERP、WMS、门店 POS 等系统的接口地址与同步策略配置。',
			columns: [
				{ key: 'name', label: '接口名称' },
				{ key: 'system', label: '对接系统' },
				{ key: 'endpoint', label: '地址' },
				{ key: 'syncMode', label: '同步方式' },
				{ key: 'status', label: '状态' }
			],
			fields: [
				{ key: 'name', label: '接口名称', type: 'text', required: true },
				{ key: 'system', label: '对接系统', type: 'text', required: true },
				{ key: 'endpoint', label: '服务地址', type: 'text', required: true },
				{
					key: 'syncMode',
					label: '同步方式',
					type: 'select',
					options: ['实时', '定时', '手动', 'Webhook']
				},
				{
					key: 'status',
					label: '状态',
					type: 'select',
					options: ['启用', '停用', '异常']
				},
				{ key: 'remark', label: '说明', type: 'textarea' }
			]
		},
		syncJobs: {
			title: '同步任务',
			desc: '库存、订单、主数据等定时或手动同步作业登记。',
			columns: [
				{ key: 'jobName', label: '任务名' },
				{ key: 'cron', label: '计划' },
				{ key: 'lastRun', label: '上次执行' },
				{ key: 'lastResult', label: '结果' },
				{ key: 'status', label: '状态' }
			],
			fields: [
				{ key: 'jobName', label: '任务名称', type: 'text', required: true },
				{ key: 'cron', label: '执行计划', type: 'text' },
				{ key: 'lastRun', label: '上次执行', type: 'text' },
				{
					key: 'lastResult',
					label: '上次结果',
					type: 'select',
					options: ['成功', '失败', '部分成功', '未执行']
				},
				{
					key: 'status',
					label: '状态',
					type: 'select',
					options: ['运行中', '暂停', '待配置']
				},
				{ key: 'remark', label: '说明', type: 'textarea' }
			]
		}
	})

	Object.assign(P, {
		monitor: null,
		supplier: 'suppliers',
		material: 'materials',
		org: 'organizations',
		quality: 'qualityChecks',
		approval: 'approvals',
		dict: 'dictionaries',
		notify: 'notifications',
		integration: 'integrations',
		syncjob: 'syncJobs',
		reports: null,
		profile: null
	})
})(window)
