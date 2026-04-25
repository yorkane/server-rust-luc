# luci-app-shadowsocks-rust-server

LuCI web interface for configuring **shadowsocks-rust** `ssserver` and `ssmanager` on OpenWrt/ImmortalWrt.

## Features

- **Server Instances (ssserver)**
  - Multiple server instance management
  - All modern encryption methods (AEAD 2022, standard AEAD, legacy stream ciphers)
  - TCP/UDP mode selection
  - SIP003 plugin support
  - ACL file support
  - TCP No Delay & IPv6 First options

- **Manager (ssmanager)**
  - Dynamic multi-user management
  - Per-user port/password/encryption configuration
  - Manager API address configuration (TCP or Unix socket)

- **Status Monitoring**
  - Real-time service status display
  - Process information
  - Restart/Stop controls
  - Auto-refresh every 5 seconds

## Target Platform

- ImmortalWrt 25.12.0-rc2 (x86-64)
- Package format: APK (Alpine Package Keeper)

## Installation

### From Release
```bash
# Download the .apk file from GitHub Releases
wget https://github.com/yorkane/server-rust-luc/releases/latest/download/luci-app-shadowsocks-rust-server_*.apk

# Install on your ImmortalWrt device
apk add --allow-untrusted luci-app-shadowsocks-rust-server_*.apk
```

### Prerequisites
The following packages must be installed on your router:
```bash
apk add shadowsocks-rust-ssserver shadowsocks-rust-ssmanager
```

## Building

### Via GitHub Actions
1. Fork this repository
2. Push to `main` branch or create a tag `v*` to trigger a build
3. Download the APK artifact from the Actions tab

### Manually with ImmortalWrt SDK
```bash
# Clone the ImmortalWrt SDK
# Add this package to the feeds
echo "src-link custom /path/to/this/repo" >> feeds.conf
./scripts/feeds update custom
./scripts/feeds install -a -p custom
make package/luci-app-shadowsocks-rust-server/compile V=s
```

## Configuration

After installation, navigate to **Services → Shadowsocks Rust Server** in the LuCI web interface.

### UCI Configuration
The configuration is stored in `/etc/config/shadowsocks-rust-server`.

#### Example
```
config general 'main'
    option enabled '1'
    option log_level 'info'

config server 'my_server'
    option enabled '1'
    option server '0.0.0.0'
    option server_port '8388'
    option method 'aes-256-gcm'
    option password 'your-password'
    option timeout '300'
    option mode 'tcp_and_udp'
```

## License

GPL-2.0
