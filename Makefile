# SPDX-License-Identifier: GPL-2.0-only
#
# Copyright (C) 2024-2026 yorkane

include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-shadowsocks-rust-server
PKG_VERSION:=1.0.0
PKG_RELEASE:=1

PKG_MAINTAINER:=yorkane
PKG_LICENSE:=GPL-2.0

include $(INCLUDE_DIR)/package.mk

define Package/luci-app-shadowsocks-rust-server
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=3. Applications
  TITLE:=LuCI support for Shadowsocks-Rust Server & Manager
  DEPENDS:=+luci-base +jsonfilter
  PKGARCH:=all
endef

define Package/luci-app-shadowsocks-rust-server/description
  Provides web UI to configure shadowsocks-rust ssserver and ssmanager.
  Supports multiple server instances, encryption methods (AEAD/2022),
  ssmanager multi-user management, and real-time status monitoring.
endef

define Package/luci-app-shadowsocks-rust-server/install
	$(INSTALL_DIR) $(1)/usr/share/luci/menu.d
	$(INSTALL_DIR) $(1)/usr/share/rpcd/acl.d
	$(INSTALL_DIR) $(1)/www/luci-static/resources/view/shadowsocks-rust-server
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_DIR) $(1)/etc/uci-defaults

	$(INSTALL_DATA) ./root/usr/share/luci/menu.d/luci-app-shadowsocks-rust-server.json \
		$(1)/usr/share/luci/menu.d/
	$(INSTALL_DATA) ./root/usr/share/rpcd/acl.d/luci-app-shadowsocks-rust-server.json \
		$(1)/usr/share/rpcd/acl.d/
	$(INSTALL_DATA) ./htdocs/luci-static/resources/view/shadowsocks-rust-server/*.js \
		$(1)/www/luci-static/resources/view/shadowsocks-rust-server/
	$(INSTALL_CONF) ./root/etc/config/shadowsocks-rust-server \
		$(1)/etc/config/
	$(INSTALL_BIN) ./root/etc/init.d/shadowsocks-rust-server \
		$(1)/etc/init.d/
	$(INSTALL_DATA) ./root/etc/uci-defaults/80_luci-shadowsocks-rust-server \
		$(1)/etc/uci-defaults/
endef

define Package/luci-app-shadowsocks-rust-server/postinst
#!/bin/sh
[ -n "$${IPKG_INSTROOT}" ] || {
	( . /etc/uci-defaults/80_luci-shadowsocks-rust-server ) && \
		rm -f /etc/uci-defaults/80_luci-shadowsocks-rust-server
	rm -rf /tmp/luci-indexcache /tmp/luci-modulecache/
}
endef

$(eval $(call BuildPackage,luci-app-shadowsocks-rust-server))
