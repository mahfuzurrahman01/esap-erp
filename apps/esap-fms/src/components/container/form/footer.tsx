import Link from "next/link"

import { Button, Loader } from "rizzui"

const FormFooter = ({ isLoading, backLink }: any) => {
  return (
    <div className="sticky bottom-0 box-border flex justify-end gap-2 border-t border-solid border-gray-500/20 bg-gray-0 px-5 py-6 dark:bg-gray-800">
      <div className="flex space-x-4">
        <Link href={backLink || "#"}>
          <Button
            variant="text"
            style={{ borderColor: "#919EAB52" }}
            className="hover:text-dark flex rounded-md border bg-transparent px-4 py-2">
            Back to List
          </Button>
        </Link>
        <button
          type="submit"
          disabled={isLoading}
          className={`rounded-md bg-[#00A76F] px-4 py-2 text-white transition-colors ${
            isLoading ? "opacity-50" : ""
          }`}>
          {isLoading ? (
            <div className="grid-col-2 grid">
              <Loader variant="spinner" className="mr-2" />
            </div>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  )
}

export default FormFooter
