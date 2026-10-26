(function (global) {
	const AUTH_KEY = 'hcs_admin_session'

	function getSession() {
		try {
			const raw = sessionStorage.getItem(AUTH_KEY)
			return raw ? JSON.parse(raw) : null
		} catch (e) {
			return null
		}
	}

	function setSession(user) {
		sessionStorage.setItem(AUTH_KEY, JSON.stringify(user))
	}

	function clearSession() {
		sessionStorage.removeItem(AUTH_KEY)
	}

	function login(username, password) {
		const u = String(username || '').trim()
		const p = String(password || '')
		if (!u || !p) {
			return { ok: false, message: '请输入账号和密码' }
		}
		// 内置账号；正式环境对接后端登录接口
		if (u === 'admin' && p === '123456') {
			const user = { username: u, displayName: '系统管理员', loginAt: Date.now() }
			setSession(user)
			return { ok: true, user }
		}
		return { ok: false, message: '账号或密码错误' }
	}

	function requireAuth() {
		const session = getSession()
		if (!session) {
			window.location.replace('index.html')
			return null
		}
		return session
	}

	function logout() {
		clearSession()
		window.location.replace('index.html')
	}

	global.HcsAuth = {
		login,
		logout,
		getSession,
		requireAuth
	}
})(window)
