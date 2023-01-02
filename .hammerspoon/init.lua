hs.loadSpoon("HoldToQuit")
spoon.HoldToQuit:start()

local move_windows = require("move_windows")
move_windows.start()

local hyper = require("hyper")

local config = {}

config.applications = {
  ['Kitty'] = {
    bundleID = "net.kovidgoyal.kitty",
    hyper_key = "t",
    preferred_display = 1,
    tags = {'#code'}
  },
  ['Chrome'] = {
    bundleID = "com.google.Chrome",
    hyper_key = "b",
    preferred_display = 1,
  },
  ['Discord'] = {
    bundleID = "com.hnc.Discord",
    hyper_key = "d",
    preferred_display = 1
  },
  ['Slack'] = {
    bundleID = "com.tinyspeck.slackmacgap",
    hyper_key = "q",
    preferred_display = 1
  },
  ['Finder'] = {
    bundleID = "com.apple.finder",
    hyper_key = "f",
    preferred_display = 1
  },
  ['VSCode'] = {
    bundleID = "com.microsoft.VSCode",
    hyper_key = "v",
    preferred_display = 1
  },
  ['Spotify'] = {
    bundleID = "com.spotify.client",
    hyper_key = "p",
    preferred_display = 1
  },
  ['ClickUp'] = {
    bundleID = "com.clickup.desktop-app",
    hyper_key = "u",
    preferred_display = 1
  },
  ['Obsidian'] = {
    bundleID = "md.obsidian",
    hyper_key = "o",
    preferred_display = 1
  },
  ['Insomnia'] = {
    bundleID = "com.insomnia.app",
    hyper_key = "i",
    preferred_display = 1
  },
  ['Notion'] = {
    bundleID = "notion.id",
    hyper_key = "n",
    preferred_display = 1
  },
  ['Authy Desktop'] = {
    bundleID = "com.authy.authy-mac",
    hyper_key = "a",
    preferred_display = 1
  },
  ['Todoist'] = {
    bundleID = "com.todoist.mac.Todoist",
    hyper_key = "[",
    preferred_display = 1
  },
  ['Zeplin'] = {
    bundleID = "io.zeplin.osx",
    hyper_key = "z",
    preferred_display = 1
  },
  ['DBeaver'] = {
    bundleID = "org.jkiss.dbeaver.core.product",
    hyper_key = "y",
    preferred_display = 1
  }
}

hyper.start(config)
