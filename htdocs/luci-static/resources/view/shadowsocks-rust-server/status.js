'use strict';
'require view';
'require dom';
'require poll';
'require rpc';
'require fs';

var callServiceList = rpc.declare({
	object: 'service',
	method: 'list',
	params: ['name'],
	expect: { '': {} }
});

function getInstances() {
	return L.resolveDefault(callServiceList('shadowsocks-rust-server'), {})
		.then(function(res) {
			var instances = [];
			try {
				var svc = res['shadowsocks-rust-server'];
				if (svc && svc.instances) {
					Object.keys(svc.instances).forEach(function(name) {
						var inst = svc.instances[name];
						instances.push({
							name: name,
							running: inst.running || false,
							pid: inst.pid || '-',
							command: (inst.command || []).join(' ')
						});
					});
				}
			} catch(e) {}
			return instances;
		});
}

function getProcessInfo() {
	return L.resolveDefault(
		fs.exec('/usr/bin/pgrep', ['-a', 'ss(server|manager)']),
		{ code: 1, stdout: '' }
	).then(function(res) {
		return res.stdout || '';
	});
}

return view.extend({
	load: function() {
		return Promise.all([
			getInstances(),
			getProcessInfo()
		]);
	},

	poll_status: function(container) {
		Promise.all([
			getInstances(),
			getProcessInfo()
		]).then(function(data) {
			var instances = data[0];
			var procInfo = data[1];

			dom.content(container, [
				E('h3', {}, _('Service Instances')),
				E('table', { 'class': 'table' }, [
					E('tr', { 'class': 'tr table-titles' }, [
						E('th', { 'class': 'th' }, _('Instance')),
						E('th', { 'class': 'th' }, _('Status')),
						E('th', { 'class': 'th' }, _('PID')),
						E('th', { 'class': 'th' }, _('Command'))
					])
				].concat(
					instances.length > 0 ? instances.map(function(inst) {
						return E('tr', { 'class': 'tr' }, [
							E('td', { 'class': 'td' }, inst.name),
							E('td', { 'class': 'td' },
								E('span', {
									'style': 'color:' + (inst.running ? 'green' : 'red') + ';font-weight:bold'
								}, inst.running ? _('Running') : _('Stopped'))
							),
							E('td', { 'class': 'td' }, String(inst.pid)),
							E('td', { 'class': 'td' },
								E('code', {}, inst.command)
							)
						]);
					}) : [
						E('tr', { 'class': 'tr placeholder' }, [
							E('td', { 'class': 'td', 'colspan': '4' },
								_('No active instances'))
						])
					]
				)),
				E('h3', { 'style': 'margin-top:1.5em' }, _('Process Information')),
				E('pre', {
					'style': 'background:#1a1a2e;color:#e0e0e0;padding:12px;border-radius:6px;overflow-x:auto;font-size:13px;line-height:1.5'
				}, procInfo || _('No shadowsocks-rust processes found'))
			]);
		});
	},

	render: function(data) {
		var instances = data[0];
		var procInfo = data[1];

		var statusContainer = E('div', { 'id': 'ss-status-container' });

		var view = E('div', { 'class': 'cbi-map' }, [
			E('h2', {}, _('Shadowsocks Rust Server - Status')),
			E('div', { 'class': 'cbi-map-descr' },
				_('Real-time status of shadowsocks-rust server and manager instances.')),
			E('div', { 'style': 'margin:1em 0' }, [
				E('button', {
					'class': 'btn cbi-button cbi-button-action',
					'click': L.bind(function() {
						return fs.exec('/etc/init.d/shadowsocks-rust-server', ['restart'])
							.then(L.bind(function() {
								window.setTimeout(L.bind(this.poll_status, this, statusContainer), 2000);
							}, this));
					}, this)
				}, _('Restart Service')),
				' ',
				E('button', {
					'class': 'btn cbi-button cbi-button-negative',
					'click': L.bind(function() {
						return fs.exec('/etc/init.d/shadowsocks-rust-server', ['stop'])
							.then(L.bind(function() {
								window.setTimeout(L.bind(this.poll_status, this, statusContainer), 1000);
							}, this));
					}, this)
				}, _('Stop Service'))
			]),
			statusContainer
		]);

		/* Initial render */
		this.poll_status(statusContainer);

		/* Auto-refresh every 5 seconds */
		poll.add(L.bind(this.poll_status, this, statusContainer), 5);

		return view;
	},

	handleSaveApply: null,
	handleSave: null,
	handleReset: null
});
