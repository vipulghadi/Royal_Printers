"use client"

import FileUpload from "@/components/file-upload"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function UploadDesignPage() {
  const [file, setFile] = useState(null)
  const [notes, setNotes] = useState("")
  const router = useRouter()

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold">Upload Your Design</h1>
      <p className="text-muted-foreground mt-1">Supported types: PDF, PNG, CDR, JPG. Max size 100MB.</p>
      <div className="mt-6 space-y-4">
        <FileUpload accept=".pdf,.png,.jpg,.jpeg,.cdr" maxSizeMB={100} onFileChange={setFile} />
        <textarea
          className="w-full rounded-md border bg-background p-2 text-sm"
          placeholder="Extra instructions (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
        />
        <Button onClick={() => router.push("/checkout")}>Continue to Checkout</Button>
      </div>
    </div>
  )
}
