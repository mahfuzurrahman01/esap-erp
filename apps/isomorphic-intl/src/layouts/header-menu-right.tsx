import SettingsButton from "@/layouts/settings-button"

import DocumentsNavigator from "./documents-navigator"
import LanguageSwitcher from "./language-switcher"
import NotificationButton from "./notification-button"
import ProfileMenu from "./profile-menu"

export default function HeaderMenuRight() {
  return (
    <div className="ms-auto flex shrink-0 items-center gap-2 xs:gap-3 xl:gap-3">
      <LanguageSwitcher />

      <DocumentsNavigator className="hidden xl:block 2xl:block 3xl:block" />
      <div className="grid grid-cols-3 items-center gap-2 text-gray-700">
        <NotificationButton />
        <SettingsButton />
        <ProfileMenu />
      </div>
    </div>
  )
}
