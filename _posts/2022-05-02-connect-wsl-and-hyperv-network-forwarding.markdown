---
title: "WSL2とHyper-V仮想マシンのネットワークの通信"
layout: post
date: 2022-05-02T14:37:10+0900
categories: blogs
tags: ["wsl2", "hyperv", "minikube"]
---

## WSL2とHyper-Vのネットワーク

MinikubeをローカルマシンのHyper-Vに構築しました。KubectlはWSL2からアクセスしようとしても、ネットワークが通りませんでした。

WSL2とHyper-Vのネットワークインタフェース間のForwardingのデフォルトはDisableのため、通信できません。
Enableに変更すれば、通信できます。

- WSL2：[vEthernet (WSL)]
- Hyper-V: [vEthernet (Default Switch)]

### ネットワークの確認と設定

1. ネットワークステータスの確認

    ```powershell
    Get-NetIPInterface | `
        Select-Object ifIndex,InterfaceAlias,AddressFamily,ConnectionState,Forwarding | `
        Sort-Object -Property IfIndex | `
        Format-Table
    ```

2. ネットワークステータスの設定

    ```powershell
    Get-NetIPInterface | `
    Where-Object {$_.InterfaceAlias -eq 'vEthernet (WSL)' -or $_.InterfaceAlias -eq 'vEthernet (Default Switch)'} | `
    Set-NetIPInterface -Forwarding Enabled
    ```

<details><summary>コマンド実施結果</summary>

```poweshell
$ Get-NetIPInterface | `
>>     Select-Object ifIndex,InterfaceAlias,AddressFamily,ConnectionState,Forwarding | `
>>     Sort-Object -Property IfIndex | `
>>     Format-Table

ifIndex InterfaceAlias              AddressFamily ConnectionState Forwarding
------- --------------              ------------- --------------- ----------
      1 Loopback Pseudo-Interface 1          IPv4       Connected   Disabled
      1 Loopback Pseudo-Interface 1          IPv6       Connected   Disabled
      4 イーサネット                               IPv4       Connected   Disabled
      4 イーサネット                               IPv6       Connected   Disabled
      5 Bluetooth ネットワーク接続                   IPv4    Disconnected   Disabled
      5 Bluetooth ネットワーク接続                   IPv6    Disconnected   Disabled
     31 vEthernet (Default Switch)           IPv6       Connected   Disabled
     31 vEthernet (Default Switch)           IPv4       Connected   Disabled
     38 vEthernet (WSL)                      IPv6       Connected   Disabled
     38 vEthernet (WSL)                      IPv4       Connected   Disabled


$ Get-NetIPInterface | `
>> Where-Object {$_.InterfaceAlias -eq 'vEthernet (WSL)' -or $_.InterfaceAlias -eq 'vEthernet (Default Switch)'} | `
>> Set-NetIPInterface -Forwarding Enabled

$ Get-NetIPInterface | `
>>     Select-Object ifIndex,InterfaceAlias,AddressFamily,ConnectionState,Forwarding | `
>>     Sort-Object -Property IfIndex | `
>>     Format-Table

ifIndex InterfaceAlias              AddressFamily ConnectionState Forwarding
------- --------------              ------------- --------------- ----------
      1 Loopback Pseudo-Interface 1          IPv4       Connected   Disabled
      1 Loopback Pseudo-Interface 1          IPv6       Connected   Disabled
      4 イーサネット                               IPv4       Connected   Disabled
      4 イーサネット                               IPv6       Connected   Disabled
      5 Bluetooth ネットワーク接続                   IPv4    Disconnected   Disabled
      5 Bluetooth ネットワーク接続                   IPv6    Disconnected   Disabled
     31 vEthernet (Default Switch)           IPv6       Connected    Enabled
     31 vEthernet (Default Switch)           IPv4       Connected    Enabled
     38 vEthernet (WSL)                      IPv6       Connected    Enabled
     38 vEthernet (WSL)                      IPv4       Connected    Enabled
```

</details>

## 参照

1. [WSL2とHyper-V仮想マシンの間で通信ができるようにする](http://ogawa.s18.xrea.com/tdiary/20201208p01.html)
