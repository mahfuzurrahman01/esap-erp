"use client"

import Link from "next/dist/client/link"

import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Text, Title } from "rizzui"

import ListPopover from "@/components/base/list-popover"
import { useModal } from "@/components/base/modal-views/use-modal"
import { FolderInsideIcon } from "@/components/icons/hrms/folder-inside-icon"
import PencilIcon from "@/components/icons/pencil"
import TrashIcon from "@/components/icons/trash"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { useDeleteFolder } from "@/hooks/hrms/file-management/folders/use-folders"
import { Folder } from "@/types/hrms/file-management/folders.types"

import FolderFormDrawerView from "./folders-create-form-view"

type FolderCardProps = {
  folder: Folder
  onDelete?: (id: number) => void
  handleFolderClick?: (folder: Folder) => void
}

export default function FolderCard({ folder }: FolderCardProps) {
  const tTable = useTranslations("table")
  const { openModal } = useModal()
  const { mutateAsync: deleteFolder, isPending: isDeletePending } =
    useDeleteFolder()

  const handleDeleteFolder = async (folderId: number) => {
    await deleteFolder(folderId)
  }

  const handleRename = () => {
    openModal({
      view: (
        <FolderFormDrawerView
          isOpen={true}
          onClose={() => {}}
          initialData={folder}
          isEditForm={true}
        />
      ),
      customSize: "480px",
    })
  }

  return (
    <div className="dropdown-gr card-shadow relative !z-50 mt-1 max-h-40 w-full min-w-[8rem] rounded-lg border border-gray-200 border-transparent bg-paper p-5 transition-all duration-300">
      <div className="mb-4 flex items-start justify-between">
        <Link href={routes.hr.allFiles(folder.id as number)}>
          <FolderInsideIcon className="h-12 w-12 text-gray-500" />
        </Link>

        <ListPopover wrapperClassName="z-[9999]">
          <Button
            onClick={handleRename}
            variant="text"
            size="sm"
            aria-label="Edit"
            className="h-7 w-full justify-start gap-2 font-semibold text-title hover:bg-gray-200">
            <PencilIcon className="h-4 w-4" />
            {tTable("table-text-rename")}
          </Button>

          <Button
            size="sm"
            variant="text"
            color="danger"
            isLoading={isDeletePending}
            onClick={() => handleDeleteFolder?.(folder?.id ?? 0)}
            className="h-7 w-full justify-start gap-2 font-semibold text-title hover:bg-red/20 hover:text-red">
            <TrashIcon className="h-4 w-4" />
            {tTable("table-text-delete")}
          </Button>
        </ListPopover>
      </div>

      <div className="space-y-2">
        <Link href={routes.hr.allFiles(folder.id as number)}>
          <Title
            as="h6"
            className="truncate text-sm font-semibold capitalize text-gray-900">
            {folder.folderName}
          </Title>
        </Link>
        <Text className="text-xs text-gray-500">
          Created on {dayjs(folder.createdDate).format("MMM D, YYYY h:mm A")}
        </Text>
      </div>
    </div>
  )
}
