"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Plus, Type, ImageIcon, Undo2, Redo2, ZoomIn, ZoomOut, Save } from 'lucide-react'

export default function DesignEditorPage() {
  const [elements, setElements] = useState([])
  const [history, setHistory] = useState([])
  const [redoStack, setRedoStack] = useState([])
  const [zoom, setZoom] = useState(1)
  const fileRef = useRef(null)

  const pushHistory = (next) => {
    setHistory(h => [...h, elements])
    setElements(next)
    setRedoStack([])
  }

  const addText = () => {
    pushHistory([
      ...elements,
      { id: crypto.randomUUID(), type: "text", x: 80, y: 80, text: "Your text", size: 20 }
    ])
  }

  const addImage = (file) => {
    if (!file) return
    const url = URL.createObjectURL(file)
    pushHistory([
      ...elements,
      { id: crypto.randomUUID(), type: "image", x: 100, y: 100, src: url, w: 160, h: 120 }
    ])
  }

  const onDrag = (id, dx, dy) => {
    setElements(els => els.map(el => el.id === id ? { ...el, x: el.x + dx, y: el.y + dy } : el))
  }

  const undo = () => {
    if (!history.length) return
    const prev = history[history.length - 1]
    setHistory(h => h.slice(0, -1))
    setRedoStack(r => [...r, elements])
    setElements(prev)
  }

  const redo = () => {
    if (!redoStack.length) return
    const next = redoStack[redoStack.length - 1]
    setRedoStack(r => r.slice(0, -1))
    setHistory(h => [...h, elements])
    setElements(next)
  }

  const saveDesign = () => {
    const data = JSON.stringify(elements)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "design.json"
    a.click()
  }

  useEffect(() => {
    return () => {
      elements.forEach(el => {
        if (el.type === "image" && el.src?.startsWith("blob:")) URL.revokeObjectURL(el.src)
      })
    }
  }, [elements])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid gap-6 lg:grid-cols-[320px_1fr]">
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Button onClick={addText} variant="outline" size="sm">
              <Type className="w-4 h-4 mr-2" /> Add text
            </Button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => addImage(e.target.files?.[0])} />
            <Button onClick={() => fileRef.current?.click()} variant="outline" size="sm">
              <ImageIcon className="w-4 h-4 mr-2" /> Upload image
            </Button>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="text-sm font-medium">Zoom</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}><ZoomOut className="w-4 h-4" /></Button>
              <div className="w-36">
                <Slider value={[zoom]} min={0.5} max={2} step={0.1} onValueChange={(v) => setZoom(v[0])} />
              </div>
              <Button variant="outline" size="icon" onClick={() => setZoom(z => Math.min(2, z + 0.1))}><ZoomIn className="w-4 h-4" /></Button>
              <div className="text-sm text-muted-foreground w-10 text-right">{Math.round(zoom * 100)}%</div>
            </div>
          </div>

          <Separator />

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={undo}><Undo2 className="w-4 h-4 mr-2" /> Undo</Button>
            <Button variant="outline" size="sm" onClick={redo}><Redo2 className="w-4 h-4 mr-2" /> Redo</Button>
          </div>

          <Button className="w-full" onClick={saveDesign}><Save className="w-4 h-4 mr-2" /> Save design</Button>
        </CardContent>
      </Card>

      <div className="bg-muted/40 rounded-xl p-4">
        <div className="relative bg-white rounded-lg border overflow-hidden mx-auto" style={{ width: 800, height: 500, transform: `scale(${zoom})`, transformOrigin: "top left" }} aria-label="Design canvas">
          {elements.map(el => (
            <Draggable key={el.id} x={el.x} y={el.y} onDrag={(dx, dy) => onDrag(el.id, dx, dy)}>
              {el.type === "text" ? (
                <Textarea
                  defaultValue={el.text}
                  onBlur={(e) => setElements(els => els.map(n => n.id === el.id ? { ...n, text: e.target.value } : n))}
                  className="absolute bg-white/80 backdrop-blur-sm min-w-[140px] p-2 text-sm"
                  style={{ left: el.x, top: el.y, border: "1px dashed hsl(var(--border))" }}
                />
              ) : (
                <img
                  src={el.src || "/placeholder.svg"}
                  alt="Design element"
                  className="absolute border"
                  style={{ left: el.x, top: el.y, width: el.w, height: el.h, objectFit: "cover" }}
                />
              )}
            </Draggable>
          ))}
        </div>
      </div>
    </div>
  )
}

function Draggable({ x = 0, y = 0, children, onDrag }) {
  return (
    <motion.div
      className="absolute"
      drag
      dragMomentum={false}
      onDrag={(e, info) => onDrag(info.delta.x, info.delta.y)}
      style={{ left: x, top: y }}
    >
      {children}
    </motion.div>
  )
}
