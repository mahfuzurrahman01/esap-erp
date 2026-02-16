import { useTranslations } from "next-intl";
import { Text, Title } from "rizzui";

import { useUserById } from "@/hooks/auth/use-user";
import { UserList } from "@/types/auth";
import Avatar from "@/components/ui/avatar";
import demoAvatar from "@public/auth/avatar.webp";

interface UserInfoProps {
  id?: string;
}

const UserInfo = ({ id }: UserInfoProps) => {
  const t = useTranslations("crm");

  if (typeof id === 'string' && isNaN(Number(id)) && id.includes('@')) {
    return (
      <div className="flex items-center">
      <div className="relative inline-flex flex-shrink-0">
        <Avatar
          src={demoAvatar.src}
          name={t("text-unknown")}
          className="flex-shrink-0 shadow-sm xs:!h-10 xs:!w-10"
        />
      </div>
      <div className="flex w-full items-center justify-between gap-2 ps-2.5">
        <div className="w-full">
          <Title as="h4" className="text-sm font-normal">
            {t("text-user")}
          </Title>
          <Text className="w-[85%] truncate text-gray-500">
            {id || t("text-no-data")}
          </Text>
        </div>
      </div>
    </div>
    );
  }

  const {
    data,
    isLoading: isUserLoading,
    error,
  } = useUserById(id) as {
    data: { data: UserList } | undefined;
    isLoading: boolean;
    error: Error | null;
  };

  if (isUserLoading) {
    return (
      <Text className="font-medium text-gray-900 dark:text-gray-0">
        {t("text-loading")}
      </Text>
    );
  }

  if (!id || error || !data) {
    return (
      <div className="flex items-center">
      <div className="relative inline-flex flex-shrink-0">
        <Avatar
          src={demoAvatar.src}
          name={t("text-unknown")}
          className="flex-shrink-0 shadow-sm xs:!h-10 xs:!w-10"
        />
      </div>
      <div className="flex w-full items-center justify-between gap-2 ps-2.5">
        <div className="w-full">
          <Title as="h4" className="text-sm font-normal">
            {t("text-na")}
          </Title>
          {/* <Text className="w-[85%] truncate text-gray-500">
            {t("text-no-data")}
          </Text> */}
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="flex items-center">
      <div className="relative inline-flex flex-shrink-0">
        <Avatar
          src={data?.data?.profilePicturePath || demoAvatar.src}
          name={data?.data?.firstName || "Unknown"}
          className="flex-shrink-0 shadow-sm xs:!h-10 xs:!w-10"
        />
      </div>
      <div className="flex w-full items-center justify-between gap-2 ps-2.5">
        <div className="w-full">
          <Title as="h4" className="text-sm font-normal">
            {data?.data?.firstName || "User"}
          </Title>
          {/* <Text className="w-[85%] truncate text-gray-500">
            {data?.data?.applicationUser?.email || t("text-no-data")}
          </Text> */}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;