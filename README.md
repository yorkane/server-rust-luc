# server-rust-luc

LuCI web interface for configuring **server-rust-luc** `ssserver` and `ssmanager` on OpenWrt/ImmortalWrt.

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
# Download the release package
wget https://github.com/yorkane/server-rust-luc/releases/download/v1.0.0/server-rust-luc-1.0.0-r1.apk

# Install using APK (ImmortalWrt 25.12+ and OpenWrt 24.10+)
apk add --allow-untrusted server-rust-luc-1.0.0-r1.apk
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
make package/server-rust-luc/compile V=s
```

## Configuration

After installation, navigate to **Services → Server Rust Luc** in the LuCI web interface.

### UCI Configuration
The configuration is stored in `/etc/config/server-rust-luc`.

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
