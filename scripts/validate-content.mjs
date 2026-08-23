// Validates every page JSON in content/pages against page.schema.json.
// Blocks are checked against their own definition so errors name the real problem
// instead of listing every branch of the union.
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import Ajv from 'ajv'

const dir = 'src/content/pages'
const schema = JSON.parse(readFileSync('src/content/page.schema.json', 'utf8'))
const ajv = new Ajv({ allErrors: true, strict: false })

const validatePage = ajv.compile(schema)
const blockValidators = Object.fromEntries(
  Object.keys(schema.definitions)
    .filter((name) => name !== 'variant')
    .map((name) => [name, ajv.compile({ definitions: schema.definitions, $ref: `#/definitions/${name}` })])
)

function report(file, errors) {
  console.error(`GREŠKA  ${file}`)
  for (const err of errors) console.error(`        ${err}`)
}

let failed = false

for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
  const data = JSON.parse(readFileSync(join(dir, file), 'utf8'))

  if (validatePage(data)) {
    console.log(`ok      ${file}`)
    continue
  }

  failed = true
  const errors = []

  for (const field of ['slug', 'title', 'blocks']) {
    if (data[field] === undefined) errors.push(`nedostaje polje "${field}"`)
  }

  data.blocks?.forEach((block, i) => {
    const where = `blok ${i + 1} (${block.type ?? 'bez tipa'})`
    const validate = blockValidators[block.type]

    if (!validate) {
      errors.push(`${where}: nepoznat tip, dopušteni su ${Object.keys(blockValidators).join(', ')}`)
      return
    }
    if (validate(block)) return

    for (const err of validate.errors) {
      const path = err.instancePath ? ` u ${err.instancePath}` : ''
      const extra = err.params?.additionalProperty ? ` "${err.params.additionalProperty}"` : ''
      errors.push(`${where}${path}: ${err.message}${extra}`)
    }
  })

  report(file, errors.length ? errors : validatePage.errors.map((e) => `${e.instancePath} ${e.message}`))
}

process.exit(failed ? 1 : 0)
