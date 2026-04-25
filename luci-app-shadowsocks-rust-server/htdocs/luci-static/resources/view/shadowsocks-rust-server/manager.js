'use strict';
'require view';
'require form';
'require uci';
'require rpc';

var callServiceList = rpc.declare({
	object: 'service',
	method: 'list',
	params: ['name'],
	expect: { '': {} }
});

var encryption_methods = [
	'2022-blake3-aes-128-gcm',
	'2022-blake3-aes-256-gcm',
	'2022-blake3-chacha20-poly1305',
	'2022-blake3-chacha8-poly1305',
	'aes-128-gcm',
	'aes-256-gcm',
	'chacha20-ietf-poly1305',
	'xchacha20-ietf-poly1305',
	'aes-128-ccm',
	'aes-256-ccm',
	'aes-128-gcm-siv',
	'aes-256-gcm-siv',
	'chacha20-ietf',
	'aes-128-cfb',
	'aes-256-cfb',
	'aes-128-ctr',
	'aes-256-ctr',
	'rc4-md5',
	'none',
];

return view.extend({
	render: function() {
		var m, s, o;

		m = new form.Map('shadowsocks-rust-server', _('Shadowsocks Rust Manager'),
			_('Configure ssmanager to dynamically manage multiple Shadowsocks server instances with different ports and passwords.'));

		/* Manager settings */
		s = m.section(form.TypedSection, 'manager', _('Manager Configuration'));
		s.anonymous = false;
		s.addremove = true;

		o = s.option(form.Flag, 'enabled', _('Enable'));
		o.default = '0';
		o.rmempty = false;

		o = s.option(form.Value, 'manager_address', _('Manager Listen Address'));
		o.placeholder = '127.0.0.1';
		o.default = '127.0.0.1';
		o.rmempty = false;
		o.description = _('IP address or Unix socket path for the management API');

		o = s.option(form.Value, 'manager_port', _('Manager Port'));
		o.placeholder = '6100';
		o.default = '6100';
		o.datatype = 'port';
		o.rmempty = false;

		o = s.option(form.ListValue, 'method', _('Default Encryption'));
		encryption_methods.forEach(function(m) {
			o.value(m, m);
		});
		o.default = 'aes-256-gcm';
		o.rmempty = false;

		o = s.option(form.Value, 'timeout', _('Default Timeout (s)'));
		o.placeholder = '300';
		o.default = '300';
		o.datatype = 'uinteger';

		o = s.option(form.ListValue, 'mode', _('TCP/UDP Mode'));
		o.value('tcp_only', _('TCP Only'));
		o.value('udp_only', _('UDP Only'));
		o.value('tcp_and_udp', _('TCP & UDP'));
		o.default = 'tcp_and_udp';

		/* Managed users */
		s = m.section(form.TypedSection, 'manager_user', _('Managed Users'),
			_('Define user entries that will be provisioned by ssmanager. Each user gets a unique port and password.'));
		s.addremove = true;
		s.anonymous = true;
		s.template = 'cbi/tblsection';

		o = s.option(form.Value, 'server_port', _('Port'));
		o.datatype = 'port';
		o.rmempty = false;

		o = s.option(form.Value, 'password', _('Password / Key'));
		o.password = true;
		o.rmempty = false;

		o = s.option(form.ListValue, 'method', _('Encryption'));
		encryption_methods.forEach(function(m) {
			o.value(m, m);
		});
		o.default = 'aes-256-gcm';
		o.optional = true;
		o.description = _('Override default encryption method for this user');

		return m.render();
	}
});
