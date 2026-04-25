# PDF Export Fix - Code Snippets Reference

## Quick Reference: Key Changes

### Before (Broken)
```typescript
export async function POST(request: NextRequest) {
  const { itinerary } = await request.json()
  
  // PROBLEM: Race condition - Promise created before doc.end() is called
  const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({ bufferPages: true, size: 'A4', margin: 50 })
    const chunks: Buffer[] = []
    
    doc.on('data', (chunk: Buffer) => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))  // Might miss the event!
    doc.on('error', (err: Error) => reject(err))
    
    // doc.end() called inside generatePDF, but the Promise is waiting here
    generatePDF(doc, itinerary).catch(reject)  // ← Async, no await!
  })
  
  return new NextResponse(pdfBuffer, { /* ... */ })
}

// PROBLEM: Image loading not awaited
async function generatePDF(doc: any, itinerary: GeneratedItinerary) {
  try {
    const imageResponse = await fetch(imageUrl)
    if (imageResponse.ok) {
      const arrayBuffer = await imageResponse.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      doc.image(buffer, 0, 0, { width: doc.page.width, height: 250 })
    }
  } catch (e) {
    console.warn('Failed to load destination image:', e)
  }
  // No guarantee doc.image() completed here!
  
  // ... other PDF content ...
  
  doc.end()  // ← Called while image might still be processing!
}
```

---

### After (Fixed)
```typescript
export async function POST(request: NextRequest) {
  const startTime = Date.now()
  console.log('[PDF Export] Starting PDF generation...')
  
  try {
    const { itinerary } = await request.json()
    
    // FIX: Separate Promise wrapper and PDF generation
    const pdfBuffer = await generatePDFBuffer(itinerary)
    
    const duration = Date.now() - startTime
    console.log(`[PDF Export] PDF generated successfully in ${duration}ms, size: ${pdfBuffer.length} bytes`)
    
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="itinerary-${itinerary.request.customer.name}-${itinerary.id}.pdf"`,
      },
    })
  } catch (error) {
    const duration = Date.now() - startTime
    const message = error instanceof Error ? error.message : String(error)
    console.error(`[PDF Export] Failed after ${duration}ms: ${message}`)
    
    return NextResponse.json(
      { message: 'PDF 生成失败: ' + message, timestamp: new Date().toISOString() },
      { status: 500 }
    )
  }
}

// FIX 1: Separate Promise creation and PDF generation
async function generatePDFBuffer(itinerary: GeneratedItinerary): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      bufferPages: true,
      size: 'A4',
      margin: 50,
    })

    const chunks: Buffer[] = []

    // Set up listeners FIRST
    doc.on('data', (chunk: Buffer) => {
      chunks.push(chunk)
      console.log(`[PDF Export] Received chunk: ${chunk.length} bytes`)
    })

    let resolved = false
    doc.on('end', () => {
      if (resolved) return
      resolved = true

      const buffer = Buffer.concat(chunks)
      console.log(`[PDF Export] PDF stream ended, total size: ${buffer.length} bytes`)

      if (buffer.length === 0) {
        reject(new Error('PDF buffer is empty - stream may have failed'))
      } else {
        resolve(buffer)
      }
    })

    doc.on('error', (err: Error) => {
      if (resolved) return
      resolved = true
      console.error('[PDF Export] PDFDocument error:', err.message)
      reject(err)
    })

    // FIX 3: Add timeout protection
    const timeoutHandle = setTimeout(() => {
      if (resolved) return
      resolved = true
      doc.destroy()
      reject(new Error('PDF generation timeout after 30 seconds'))
    }, 30000)

    // FIX 2: Await generatePDF completion before calling doc.end()
    generatePDF(doc, itinerary)
      .then(() => {
        console.log('[PDF Export] generatePDF completed, calling doc.end()')
        doc.end()  // ← Explicit call AFTER generatePDF finishes
      })
      .catch((err) => {
        if (resolved) return
        resolved = true
        clearTimeout(timeoutHandle)
        console.error('[PDF Export] generatePDF error:', err.message)
        doc.destroy()
        reject(err)
      })
      .finally(() => {
        clearTimeout(timeoutHandle)
      })
  })
}

// FIX 4: Proper async handling in generatePDF
async function generatePDF(doc: any, itinerary: GeneratedItinerary) {
  const { request, days, costBreakdown } = itinerary

  const destinationMap: Record<string, string> = {
    auckland: '奥克兰',
    rotorua: '罗托鲁阿',
    queenstown: '皇后镇',
    hobbiton: '霍比特人村',
    waitomo: '怀托摩',
    taupo: '陶波',
  }

  const destinationName = destinationMap[request.destination] || request.destination
  const imageUrl = NZ_DESTINATION_IMAGES[request.destination] || NZ_DESTINATION_IMAGES.auckland

  // FIX 2.1: Image loading in separate function with await
  try {
    await loadAndAddImage(doc, imageUrl)
  } catch (e) {
    console.warn(`[PDF Export] Failed to load destination image from ${imageUrl}:`, e)
  }

  // ... rest of PDF content generation ...
  
  // DON'T call doc.end() here - it's called in generatePDFBuffer after this function returns
}

// FIX 2.2: Dedicated image loading function
async function loadAndAddImage(doc: any, imageUrl: string): Promise<void> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000) // 5s timeout

  try {
    const imageResponse = await fetch(imageUrl, { signal: controller.signal })

    if (!imageResponse.ok) {
      throw new Error(`HTTP ${imageResponse.status}`)
    }

    const arrayBuffer = await imageResponse.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    if (buffer.length === 0) {
      throw new Error('Image buffer is empty')
    }

    console.log(`[PDF Export] Loading image: ${imageUrl.split('?')[0]} (${buffer.length} bytes)`)

    // This is synchronous (buffer already in memory)
    doc.image(buffer, 0, 0, { width: doc.page.width, height: 250 })
  } finally {
    clearTimeout(timeoutId)
  }
}
```

---

## Browser Console Monitoring

### Copy-paste these snippets to monitor PDF export

**Monitor [PDF Export] logs:**
```javascript
// Filter browser console to show only PDF Export logs
console.log = (() => {
  const original = console.log
  return function(...args) {
    if (String(args[0]).includes('[PDF Export]')) {
      original.apply(console, args)
    }
  }
})()

// Or simply watch for the pattern:
// Type in console: [PDF Export]
// Ctrl+Shift+K to filter logs
```

**Measure export timing:**
```javascript
const startTime = performance.now()
console.log('PDF Export started at:', new Date().toISOString())

// After export completes, check timing:
// In the [PDF Export] log: "PDF generated successfully in Xms"
```

**Check response size:**
```javascript
// In Network tab:
// 1. Filter: export-pdf
// 2. Click the request
// 3. Response > Size column shows PDF size
// Expected: 400-500 KB for typical itinerary
```

---

## Error Messages & Debugging

### Common Error Messages (After Fix)

**Success:**
```
[PDF Export] Starting PDF generation...
[PDF Export] Generating PDF for customer: John Smith
[PDF Export] Loading image: https://images.unsplash.com/... (245320 bytes)
[PDF Export] Received chunk: 16384 bytes
[PDF Export] generatePDF completed, calling doc.end()
[PDF Export] PDF stream ended, total size: 450876 bytes
[PDF Export] PDF generated successfully in 2845ms, size: 450876 bytes
```

**Image load timeout (graceful):**
```
[PDF Export] Loading image: https://images.unsplash.com/... (timeout after 5s)
[PDF Export] Failed to load destination image: Error: timeout
[PDF Export] generatePDF completed, calling doc.end()
[PDF Export] PDF generated successfully in 1523ms, size: 445320 bytes
```

**30-second timeout (should rarely happen):**
```
[PDF Export] Starting PDF generation...
[PDF Export] Generating PDF for customer: Jane Doe
[PDF Export] Failed after 32150ms: PDF generation timeout after 30 seconds
```

**Empty buffer error (should never happen with fix):**
```
[PDF Export] PDF stream ended, total size: 0 bytes
[PDF Export] Failed: PDF buffer is empty - stream may have failed
```

---

## Performance Validation Queries

### Server-side (Render logs)
```
Filter: [PDF Export]
Expected per successful export:
- 1 "Starting PDF generation" log
- 1+ "Received chunk" logs
- 1 "generatePDF completed" log
- 1 "PDF generated successfully" log
- 1 success within 30s
```

### Client-side (Browser Network tab)
```
Request: POST /api/itinerary/export-pdf
Status: 200 OK
Content-Type: application/pdf
Size: 400-500 KB
Duration: 2-5 seconds
```

---

## Deployment Verification Checklist

```bash
# 1. Verify file was modified correctly
git diff src/app/api/itinerary/export-pdf/route.ts | grep "generatePDFBuffer"
# Expected: Should find the new function name

# 2. Check for syntax errors
grep -n "doc.end()" src/app/api/itinerary/export-pdf/route.ts
# Expected: Should find it inside .then() callback around line 115-120

# 3. Verify logging added
grep -c "\[PDF Export\]" src/app/api/itinerary/export-pdf/route.ts
# Expected: Should be 8+ occurrences

# 4. Check timeout constant
grep "PDF_TIMEOUT" src/app/api/itinerary/export-pdf/route.ts
# Expected: Should find "const PDF_TIMEOUT = 30000"
```

---

## Comparison Matrix

| Aspect | Before | After |
|--------|--------|-------|
| **Event Listener Race** | Yes (BROKEN) | No (FIXED) |
| **Async Sequencing** | No (fire-and-forget) | Yes (proper await) |
| **Timeout Protection** | No (infinite wait) | Yes (30s max) |
| **Error Logging** | Generic | Detailed [PDF Export] logs |
| **Image Timeout** | None (could hang) | 5s abort timeout |
| **Buffer Validation** | No | Yes (length check) |
| **Memory Cleanup** | Leaks (unresolved promises) | Clean (all resources freed) |
| **User Experience** | "Exporting..." hangs | "Exporting..." + success/error |

---

## Testing Code Snippet

```typescript
// Test helper: Simulate PDF export request
async function testPDFExport() {
  const testItinerary = {
    id: 'test-123',
    request: {
      customer: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '555-1234',
        groupSize: 2
      },
      destination: 'auckland',
      days: 5,
      budget: 50000,
      customerType: 'family'
    },
    days: [
      {
        day: 1,
        title: 'Day 1',
        theme: 'Arrival',
        attractions: [],
        meals: { breakfast: 'Hotel', lunch: 'Local', dinner: 'Restaurant' },
        accommodation: { name: 'Hotel 1', city: 'Auckland', stars: 4, pricePerNight: 200, image: '' },
        notes: 'Arrival day'
      }
    ],
    costBreakdown: {
      attractions: 10000,
      accommodation: 15000,
      meals: 15000,
      other: 10000,
      total: 50000
    },
    createdAt: new Date().toISOString()
  }

  try {
    const response = await fetch('/api/itinerary/export-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itinerary: testItinerary })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('PDF Export Error:', error.message)
      return
    }

    const blob = await response.blob()
    console.log(`Success! PDF size: ${blob.size} bytes`)
    
    // Auto-download for testing
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'test-export.pdf'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  } catch (error) {
    console.error('Request Error:', error)
  }
}

// Run it: testPDFExport()
```

---

**Keep this file for reference during testing and debugging.**
