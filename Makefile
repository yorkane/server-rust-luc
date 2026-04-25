# SPDX-License-Identifier: GPL-2.0-only
#
# Copyright (C) 2024-2026 yorkane

include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-shadowsocks-rust-server
PKG_VERSION:=1.0.0
PKG_RELEASE:=1

PKG_MAINTAINER:=yorkane
PKG_LICENSE:=GPL-2.0

LUCI_TITLE:=LuCI support for Shadowsocks-Rust Server & Manager
LUCI_DEPENDS:=+luci-base +shadowsocks-rust-ssserver +shadowsocks-rust-ssmanager +jsonfilter
LUCI_PKGARCH:=all
LUCI_DESCRIPTION:=Provides web UI to configure shadowsocks-rust ssserver and ssmanager

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
