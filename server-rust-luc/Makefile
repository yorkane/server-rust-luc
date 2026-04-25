# SPDX-License-Identifier: GPL-2.0-only
#
# Copyright (C) 2024-2026 yorkane

include $(TOPDIR)/rules.mk

PKG_NAME:=server-rust-luc
PKG_VERSION:=1.0.0
PKG_RELEASE:=1

PKG_MAINTAINER:=yorkane
PKG_LICENSE:=GPL-2.0

include $(INCLUDE_DIR)/package.mk

define Package/server-rust-luc
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=3. Applications
  TITLE:=LuCI support for Server Rust Luc
  DEPENDS:=+luci-base +jsonfilter
  PKGARCH:=all
endef

define Package/server-rust-luc/description
  Provides web UI to configure server-rust-luc ssserver and ssmanager.
  Supports multiple server instances, encryption methods (AEAD/2022),
  ssmanager multi-user management, and real-time status monitoring.
endef

define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
endef

define Build/Compile
endef

define Package/server-rust-luc/install
	$(INSTALL_DIR) $(1)/usr/share/luci/menu.d
	$(INSTALL_DIR) $(1)/usr/share/rpcd/acl.d
	$(INSTALL_DIR) $(1)/www/luci-static/resources/view/server-rust-luc
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_DIR) $(1)/etc/uci-defaults

	$(INSTALL_DATA) ./root/usr/share/luci/menu.d/server-rust-luc.json \
		$(1)/usr/share/luci/menu.d/
	$(INSTALL_DATA) ./root/usr/share/rpcd/acl.d/server-rust-luc.json \
		$(1)/usr/share/rpcd/acl.d/
	$(INSTALL_DATA) ./htdocs/luci-static/resources/view/server-rust-luc/*.js \
		$(1)/www/luci-static/resources/view/server-rust-luc/
	$(INSTALL_CONF) ./root/etc/config/server-rust-luc \
		$(1)/etc/config/
	$(INSTALL_BIN) ./root/etc/init.d/server-rust-luc \
		$(1)/etc/init.d/
	$(INSTALL_DATA) ./root/etc/uci-defaults/80_luci-server-rust-luc \
		$(1)/etc/uci-defaults/
endef

define Package/server-rust-luc/postinst
#!/bin/sh
[ -n "$${IPKG_INSTROOT}" ] || {
	( . /etc/uci-defaults/80_luci-server-rust-luc ) && \
		rm -f /etc/uci-defaults/80_luci-server-rust-luc
	rm -rf /tmp/luci-indexcache /tmp/luci-modulecache/
}
endef

$(eval $(call BuildPackage,server-rust-luc))
