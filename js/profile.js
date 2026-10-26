(function (global) {
	function mount(host, session) {
		if (!host || host.dataset.mounted === '1') return
		host.dataset.mounted = '1'
		const name = session.displayName || session.username || '—'
		const role = session.role || '—'

		host.innerHTML =
			'<h1 class="page-title">个人中心</h1>' +
			'<p class="page-desc">查看当前账号信息，修改登录密码。</p>' +
			'<div class="settings-grid">' +
			'<div class="card">' +
			'<h3>账号信息</h3>' +
			'<ul class="sys-info">' +
			'<li><span>登录账号</span>' +
			(session.username || '—') +
			'</li>' +
			'<li><span>姓名</span>' +
			name +
			'</li>' +
			'<li><span>角色</span>' +
			role +
			'</li>' +
			'</ul>' +
			'</div>' +
			'<div class="card">' +
			'<h3>修改密码</h3>' +
			'<div class="form-group"><label for="pwdOld">原密码</label><input id="pwdOld" type="password" autocomplete="current-password" /></div>' +
			'<div class="form-group"><label for="pwdNew">新密码</label><input id="pwdNew" type="password" autocomplete="new-password" /></div>' +
			'<div class="form-group"><label for="pwdNew2">确认新密码</label><input id="pwdNew2" type="password" autocomplete="new-password" /></div>' +
			'<button type="button" class="btn btn-primary" id="btnChangePwd">保存密码</button>' +
			'</div>' +
			'</div>'

		host.querySelector('#btnChangePwd').addEventListener('click', () => {
			const oldP = host.querySelector('#pwdOld').value
			const n1 = host.querySelector('#pwdNew').value
			const n2 = host.querySelector('#pwdNew2').value
			if (!oldP || !n1) {
				alert('请填写原密码和新密码')
				return
			}
			if (n1 !== n2) {
				alert('两次新密码不一致')
				return
			}
			try {
				global.HcsStore.changePassword(session.username, oldP, n1)
				alert('密码已更新，请重新登录')
				global.HcsAuth.logout()
			} catch (e) {
				alert(e.message || '修改失败')
			}
		})
	}

	global.HcsProfile = { mount }
})(window)
