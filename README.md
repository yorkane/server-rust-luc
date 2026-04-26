# server-rust-luc

LuCI web interface for configuring **server-rust-luc** on OpenWrt/ImmortalWrt.

## Features

- **Server Instances**
  - Multiple server instance management
  - All modern encryption methods (AEAD 2022, standard AEAD, legacy stream ciphers)
  - TCP/UDP mode selection
  - SIP003 plugin support
  - ACL file support
  - TCP No Delay & IPv6 First options

- **Manager**
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
# Download the latest package
wget -O /tmp/server-rust-luc-1.0.0-r1.apk https://github.com/yorkane/server-rust-luc/releases/download/v1.0.0/server-rust-luc-1.0.0-r1.apk

# Install
apk add --allow-untrusted /tmp/server-rust-luc-1.0.0-r1.apk

# Clear LuCI cache
rm -rf /tmp/luci-indexcache /tmp/luci-modulecache/
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

## License

GPL-2.0
