const path = require('path')
const fs = require('fs-extra')
const { processStats } = require('./utils/stats')

module.exports = api => {
  const { getSharedData, setSharedData, removeSharedData } = api.namespace('org.vue.webpack.')

  let firstRun = true
  let hadFailed = false

  // Specific to each modes (serve, build, ...)
  const fields = {
    status: null,
    progress: {},
    operations: null,
    stats: null,
    sizes: null,
    problems: null,
    url: null
  }

  // Common fields for all mode
  const commonFields = {
    'modern-mode': false
  }

  // Init data
  api.onProjectOpen(setup)
  api.onPluginReload(setup)

  function setup () {
    for (const key of ['serve', 'build', 'build-modern']) {
      setupSharedData(key)
    }
    setupCommonData()
  }

  // Called when opening a project
  function setupSharedData (mode) {
    resetSharedData(mode)
  }

  // Called when opening a project
  function setupCommonData () {
    for (const field in commonFields) {
      setSharedData(field, getSharedDataInitialValue(field, commonFields[field]))
    }
  }

  function resetSharedData (mode, clear = false) {
    for (const field in fields) {
      const id = `${mode}-${field}`
      setSharedData(id, getSharedDataInitialValue(id, fields[field], clear))
    }
  }

  function getSharedDataInitialValue (id, defaultValue, clear) {
    if (!clear) {
      const data = getSharedData(id)
      if (data != null) return data.value
    }
    return defaultValue
  }

  async function onWebpackMessage ({ data: message }) {
    if (message.webpackDashboardData) {
      const modernMode = getSharedData('modern-mode').value
      const type = message.webpackDashboardData.type

      for (const data of message.webpackDashboardData.value) {
        const id = `${type}-${data.type}`

        if (data.type === 'stats') {
          // Stats are read from a file
          const statsFile = path.resolve(api.getCwd(), `./node_modules/.stats-${type}.json`)
          const value = await fs.readJson(statsFile)
          const { stats, analyzer } = processStats(value)
          setSharedData(id, stats)
          setSharedData(`${id}-analyzer`, analyzer)
          await fs.remove(statsFile)
        } else if (data.type === 'progress') {
          if (type === 'serve' || !modernMode) {
            setSharedData(id, {
              [type]: data.value
            })
          } else {
            // Display two progress bars
            const progress = getSharedData(id).value
            progress[type] = data.value
            for (const t of ['build', 'build-modern']) {
              setSharedData(`${t}-${data.type}`, {
                build: progress.build || 0,
                'build-modern': progress['build-modern'] || 0
              })
            }
          }
        } else {
          // Don't display success until both build and build-modern are done
          if (type !== 'serve' && modernMode && data.type === 'status' && data.value === 'Success') {
            if (type === 'build-modern') {
              for (const t of ['build', 'build-modern']) {
                setSharedData(`${t}-status`, data.value)
              }
            }
          } else {
            setSharedData(id, data.value)
          }

          // Notifications
          if (type === 'serve' && data.type === 'status') {
            if (data.value === 'Failed') {
              api.notify({
                title: 'Build failed',
                message: 'The build has errors.',
                icon: 'error'
              })
              hadFailed = true
            } else if (data.value === 'Success') {
              if (hadFailed) {
                api.notify({
                  title: 'Build fixed',
                  message: 'The build succeeded.',
                  icon: 'done'
                })
                hadFailed = false
              } else if (firstRun) {
                api.notify({
                  title: 'App ready',
                  message: 'The build succeeded.',
                  icon: 'done'
                })
                firstRun = false
              }
            }
          }
        }
      }
    }
  }
};