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
		if (global.HcsStore && global.HcsStore.validateLogin) {
			const res = global.HcsStore.validateLogin(username, password)
			if (res.ok) {
				const user = Object.assign({ loginAt: Date.now() }, res.user)
				setSession(user)
				return { ok: true, user }
			}
			return { ok: false, message: res.message }
		}
		return { ok: false, message: '系统未就绪，请刷新后重试' }
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
