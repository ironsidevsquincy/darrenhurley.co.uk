import caniuse from 'caniuse-db/data.json'
import _ from 'lodash'
import semverLoose from 'semver-loose'

const getLowestVersion = versions => {
  return versions.map(version => version.split('-').shift())
    .sort((versionOne, versionTwo) => semverLoose.sort(versionTwo, versionOne))
    .pop()
}

const getSupportedVersions = versions => {
  return Object.entries(versions)
    .filter(([version, available]) => available.includes('y'))
    .map(([version]) => version)
}

export default (req, res) => {
  const features = (req.query.features || '').split(',')
  const featuresSupport = features.filter(feature => caniuse.data[feature])
    .reduce((featureSupportAcc, feature) => {
      const { stats, title } = caniuse.data[feature]
      const support = Object.entries(stats)
        .reduce((statsAcc, [browser, versions]) => {
          const supportedVersions = getSupportedVersions(versions)
          return supportedVersions.length
            ? { ...statsAcc, [browser]: getSupportedVersions(versions) }
            : statsAcc
        }, {})
      return {
        ...featureSupportAcc,
        [title]: support
      }
    }, {})

  const supportedBrowsers = Object.values(featuresSupport)
    .map(support => Object.keys(support))

  const support = _.intersection(...supportedBrowsers)
    .reduce((supportAcc, supportedBrowser) => {
      const browserSupport = Object.values(featuresSupport)
        .reduce((supportAcc, browsers) => {
          if (browsers[supportedBrowser]) {
            supportAcc.splice(supportAcc.length, 0, ...browsers[supportedBrowser])
          }
          return supportAcc
        }, [])
      return {
        ...supportAcc,
        [supportedBrowser]: getLowestVersion(browserSupport)
      }
    }, {})

  res.render('browser-support', {
    title: 'browser support',
    support,
    features: Object.keys(featuresSupport)
  })
}
