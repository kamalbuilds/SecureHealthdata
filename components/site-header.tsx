"use client"
import Link from "next/link"

import { siteConfig } from "./site"
import { MainNav } from "./nav"
import { ConnectWallet } from "@thirdweb-dev/react";
import {
    Twitter,
  } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">

            <ConnectWallet
              dropdownPosition={{
                side: "bottom",
                align: "center",
              }}
            />
          </nav>
        </div>
      </div>
    </header>
  )
}
