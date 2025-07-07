"use client"
import { toast } from "sonner"
import type React from "react"

import { useUploadThing } from "@/utils/uploadthing"
import UploadFormInput from "./upload-form-input"
import { z } from "zod"
import { generatePdfSummary, storePdfSummaryAction, generatePdfText } from "@/actions/upload-actions"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { formatFileNameAsTitle } from "@/utils/format-utils"
import { Skeleton } from "../ui/skeleton"

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine((file) => file.size < 20 * 1024 * 1024, "File Must be less than 20MB")
    .refine((file) => file.type.startsWith("application/pdf"), "File Must be a PDF"),
})

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("Uploaded Successfully!")
    },
    onUploadError: (err) => {
      toast("Error occurred while uploading", {
        description: <span className="font-semibold text-red-500">{err.message}</span>,
      })
    },
    onUploadBegin: (data) => {
      console.log("Upload has begun for", data)
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const formData = new FormData(e.currentTarget)
      const file = formData.get("file") as File

      if (!file) {
        console.error("No file selected")
        return
      }

      const validedFields = schema.safeParse({ file })

      if (!validedFields.success) {
        toast("❌ Something went Wrong", {
          description: (
            <span className="font-semibold text-red-500">
              {validedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid File"}
            </span>
          ),
        })
        setIsLoading(false)
        return
      }

      toast("📃 Uploading PDF", {
        description: <span className="font-semibold text-blue-500">We are uploading your PDF to our servers! 🚀</span>,
      })

      const uploadResponse = await startUpload([file])

      if (!uploadResponse) {
        toast("⚠️ Something Went Wrong", {
          description: <span className="font-semibold text-red-500">Please use a different file.</span>,
        })
        setIsLoading(false)
        return
      }
      console.log("Upload Response", uploadResponse)

      toast("📃 Processing PDF", {
        description: (
          <span className="font-semibold text-green-500">Hang tight! Our AI is reading through your document! ✨</span>
        ),
      })

      const uploadFileUrl = uploadResponse[0].serverData.fileUrl
      const key = uploadResponse[0].serverData.key

      const formattedFileName = formatFileNameAsTitle(file.name)

      const result = await generatePdfText({
        fileUrl: uploadFileUrl,
      })

      toast("📃 Generating PDF Summary", {
        description: (
          <span className="font-semibold text-green-500">Hang tight! Our AI is reading through your document! ✨</span>
        ),
      })

      const summaryResult = await generatePdfSummary({
        pdfText: result?.data?.pdfText ?? "",
        fileName: formattedFileName,
      })

      toast("📃 Saving PDF Summary", {
        description: (
          <span className="font-semibold text-green-500">Hang tight! Our AI is reading through your document! ✨</span>
        ),
      })

      const { data = null } = summaryResult || {}

      if (data?.summary) {
        const storeResult = await storePdfSummaryAction({
          summary: data.summary,
          fileUrl: uploadFileUrl,
          title: formattedFileName,
          fileName: file.name,
          key,
        })

        toast("✨Summary Generated!", {
          description: (
            <span className="font-semibold text-green-500">Your PDF has been successfully summarized and saved!✨</span>
          ),
        })

        formRef.current?.reset()

        if (storeResult?.data?.id) {
          router.push(`/summaries/${storeResult.data.id}`)
        }
      }
    } catch (error) {
      setIsLoading(false)
      console.log("Error Occurred", error)
      formRef.current?.reset()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background text-muted-foreground px-3 text-sm">Upload PDF</span>
        </div>
      </div>
      <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />
      {isLoading && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background text-muted-foreground px-3 text-sm">Processing</span>
            </div>
          </div>
          <Skeleton />
        </>
      )}
    </div>
  )
}
