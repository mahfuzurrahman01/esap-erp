import Logo from "@/components/icons/logo";
import Image from "next/image";


export default function PageLoading() {
  return (
    <div className="flex space-x-4 justify-center items-center h-full">
      <Image src={"https://res.cloudinary.com/dtsm9eluo/image/upload/v1740654258/22_FEBIAEGIF2-ezgif.com-video-to-gif-converter_oa1xrq.gif"} alt="Page Loader Icon" height={200} width={200} />
    </div>
  )
}
