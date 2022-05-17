const path = require("path");
const findConfig = require("find-config");
const murmurhash3_32_gc = require("./murmurhash");

const onlyMajorVersionPackages = [
  '@johnbenz13/shared-library', 
  'wix-style-react',
];

// const onlyMajorVersionPackages = [];

module.exports = function resolveNamespaceFactory(name) {
  // the argument `name` is used as a hash like here 
  // https://github.com/wix/stylable/blob/071cb5732868e750e023004d9d10265f0b77576d/packages/node/src/resolve-namespace.ts#L5

  const { dirname, relative} = path;
  const loadConfig = require;
  const prefix = '';
  const hashSalt = name;
  const normalizeVersion = (config) => {
    const semverPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/gm;
    

    const { version, name } = config;

    const semveredVersion = semverPattern.exec(version);

    if (!semveredVersion) {
      throw new Error(`Invalid semver version: ${version}`);
    }

    const [, major, minor, patch, prerelease, build] = semveredVersion;
    console.log(`${name} ${major}.${minor}.${patch}`);
    
    return onlyMajorVersionPackages.includes(name) ? major : version;
  };

  // Rest of the function is written according to https://github.com/wix/stylable/blob/071cb5732868e750e023004d9d10265f0b77576d/packages/core/src/resolve-namespace-factories.ts#L4
  return (namespace, stylesheetPath) => {
    const configPath = findConfig('package.json', { cwd: dirname(stylesheetPath) });

    if (!configPath) {
      throw new Error(`Could not find package.json for ${stylesheetPath}`);
    }

    const config = loadConfig(configPath);

    const fromRoot = relative(dirname(configPath), stylesheetPath).replace(/\\/g, '/');

    const hashedAndNormalizedNamespace = prefix +
    namespace +
    murmurhash3_32_gc(
        onlyMajorVersionPackages.includes(config.name) ? config.name : hashSalt + 
        config.name + 
        '@' + 
        normalizeVersion(config) + 
        '/' + 
        fromRoot
    );

    console.log('Hashed and normalized namespace:', hashSalt, hashedAndNormalizedNamespace);

    return hashedAndNormalizedNamespace;
  }
}