import * as fs from 'node:fs'
import * as path from 'node:path'
import * as ts from 'typescript'

const MODALS_DIR = path.resolve('app/lib/modals')
const OUTPUT_TYPES_FILE = path.resolve('app/lib/types/modals.ts')
const COMPOSABLE_FILE = path.resolve('app/lib/composables/modal.ts')
const WIDGET_MODALS_FILE = path.resolve('app/lib/widgets/Modals.vue')

function getModalFiles(): string[] {
  if (!fs.existsSync(MODALS_DIR)) {
    fs.mkdirSync(MODALS_DIR, { recursive: true })
    return []
  }

  return fs
    .readdirSync(MODALS_DIR)
    .filter(f => f.endsWith('.vue'))
    .map(f => f.replace(/\.vue$/, ''))
    .sort()
}

function toPascalCase(str: string): string {
  return str
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/\s+/)
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('')
}

function toKey(str: string): string {
  let clean = str.replace(/^modal[-_]?/i, '').replace(/[-_]?modal$/i, '')
  if (!clean) clean = str

  const words = clean
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/\s+/)
    .filter(Boolean)

  if (words.length === 0) return str.toLowerCase()

  return (
    words?.[0]?.toLowerCase() +
    words
      .slice(1)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join('')
  )
}

function parseModal(rawName: string) {
  const componentPascal = toPascalCase(rawName)
  const componentName = `Lazy${componentPascal}`
  const key = toKey(rawName)
  return { key, componentName }
}

function updateModalComposable(modalKeys: string[]) {
  if (!fs.existsSync(COMPOSABLE_FILE)) {
    console.warn(`Composable file not found at ${COMPOSABLE_FILE}`)
    return
  }

  const content = fs.readFileSync(COMPOSABLE_FILE, 'utf8')
  const sf = ts.createSourceFile('modal.ts', content, ts.ScriptTarget.Latest, true)

  let typeNode: ts.TypeAliasDeclaration | null = null
  for (const node of sf.statements) {
    if (ts.isTypeAliasDeclaration(node) && node.name.text === 'Modals') {
      typeNode = node
      break
    }
  }

  // Map of existing properties: key -> member text
  const existingProps = new Map<string, string>()

  if (typeNode && ts.isTypeLiteralNode(typeNode.type)) {
    for (const member of typeNode.type.members) {
      if (ts.isPropertySignature(member)) {
        const name = member.name.getText(sf).replace(/^['"]|['"]$/g, '')
        existingProps.set(name, member.getText(sf))
      }
    }
  }

  // Build new properties lines:
  // - keep existing ones that match modalKeys untouched
  // - add missing modalKeys with : null
  // - keys not present in modalKeys are omitted (deleted)
  const newPropsLines: string[] = []
  for (const key of modalKeys) {
    if (existingProps.has(key)) {
      const text = existingProps.get(key)!
      const lines = text.split('\n')
      if (lines[0]) {
        lines[0] = lines[0].trimStart()
      }
      newPropsLines.push('  ' + lines.join('\n'))
    } else {
      newPropsLines.push(`  ${key}: null`)
    }
  }

  const newTypeBlock = newPropsLines.length > 0
    ? `export type Modals = {\n${newPropsLines.join('\n')}\n}`
    : `export type Modals = {\n  \n}`

  let updatedContent: string
  if (typeNode) {
    const start = typeNode.getStart(sf)
    const end = typeNode.getEnd()
    updatedContent = content.slice(0, start) + newTypeBlock + content.slice(end)
  } else {
    updatedContent = `${newTypeBlock}\n\n${content}`
  }

  fs.writeFileSync(COMPOSABLE_FILE, updatedContent, 'utf8')
  console.log(`Updated Modals type in: ${COMPOSABLE_FILE}`)
}

function updateModalsWidget(modals: Array<{ key: string; componentName: string }>) {
  if (!fs.existsSync(WIDGET_MODALS_FILE)) {
    console.warn(`Widget file not found at ${WIDGET_MODALS_FILE}`)
    return
  }

  const content = fs.readFileSync(WIDGET_MODALS_FILE, 'utf8')

  const entries = modals
    .map(m => `  ${m.key}: resolveComponent('${m.componentName}') as Component,`)
    .join('\n')

  const generatedBlock = `// @generated-modals-start
import { resolveComponent, type Component } from 'vue'

const modals: Record<keyof Modals, Component> = {
${entries}
}
// @generated-modals-end`

  const startMarker = '// @generated-modals-start'
  const endMarker = '// @generated-modals-end'

  let updatedContent: string
  if (content.includes(startMarker) && content.includes(endMarker)) {
    const startIndex = content.indexOf(startMarker)
    const endIndex = content.indexOf(endMarker) + endMarker.length
    updatedContent = content.slice(0, startIndex) + generatedBlock + content.slice(endIndex)
  } else {
    const scriptSetupMatch = content.match(/<script\s+setup(?: lang="ts")?>/i)
    if (!scriptSetupMatch || scriptSetupMatch.index === undefined) {
      console.warn(`Could not find <script setup> in ${WIDGET_MODALS_FILE}`)
      return
    }
    const insertIndex = scriptSetupMatch.index + scriptSetupMatch[0].length
    updatedContent =
      content.slice(0, insertIndex) +
      '\n' +
      generatedBlock +
      '\n' +
      content.slice(insertIndex)
  }

  fs.writeFileSync(WIDGET_MODALS_FILE, updatedContent, 'utf8')
  console.log(`Updated modals in: ${WIDGET_MODALS_FILE}`)
}

function generate() {
  const rawNames = getModalFiles()
  const modals = rawNames.map(parseModal)

  // 1. Types: app/lib/types/modals.ts
  const modalType = modals.length > 0
    ? modals.map(m => `'${m.key}'`).join(' | ')
    : 'never'

  const typesOutput = `// Auto-generated by modals-type-generate.ts — do not edit manually\nexport type ModalName = ${modalType}\n`

  fs.mkdirSync(path.dirname(OUTPUT_TYPES_FILE), { recursive: true })
  fs.writeFileSync(OUTPUT_TYPES_FILE, typesOutput, 'utf8')

  // 2. Update Modals type in app/lib/composables/modal.ts
  updateModalComposable(modals.map(m => m.key))

  // 3. Update modals map in app/lib/widgets/Modals.vue (beginning of <script setup>)
  updateModalsWidget(modals)

  console.log(`Generated ${modals.length} modal(s): ${modals.map(m => m.key).join(', ') || '(none)'}`)
  console.log(`Written types to: ${OUTPUT_TYPES_FILE}`)
}

generate()
