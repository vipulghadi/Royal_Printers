"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function FileUpload({ accept = ".pdf,.png,.jpg,.jpeg,.cdr", maxSizeMB = 100, onFileChange = () => {} }) {
  const [file, setFile] = useState(null)
  const [error, setError] = useState("")
  const [preview, setPreview] = useState(null)

  const onChange = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    const max = maxSizeMB * 1024 * 1024
    if (f.size > max) {
      setError(`File too large. Max ${maxSizeMB}MB.`)
      setFile(null)
      setPreview(null)
      onFileChange(null)
      return
    }
    setError("")
    setFile(f)
    onFileChange(f)
    if (f.type.startsWith("image/")) {
      const url = URL.createObjectURL(f)
      setPreview(url)
    } else {
      setPreview(null)
    }
  }

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <div className="space-y-2">
      <Input type="file" accept={accept} onChange={onChange} aria-describedby="upload-help" />
      <div id="upload-help" className="text-xs text-muted-foreground">Accepted: {accept}. Max {maxSizeMB}MB.</div>
      {error && <div className="text-xs text-red-600">{error}</div>}
      {file && (
        <div className="text-sm">
          Selected: <span className="font-medium">{file.name}</span>
        </div>
      )}
      {preview && (
        <img src={preview || "/placeholder.svg"} alt="Uploaded preview" className="h-28 w-auto rounded-md border" />
      )}
    </div>
  )
}
