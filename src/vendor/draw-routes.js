module.exports = function drawRoutes(routesDefinitionFunc) {
  const routesDefinition = [];

  function nested(...args) {
    const n = args[args.length - 1];
    if (typeof n === 'function') {
      return n();
    }
    return null;
  }

  let branchDepth = 0;

  function branch(type, ...args) {
    const [label, options] = args;

    const route = Object.assign(
      {
        type,
        label,
        children: []
      },
      typeof options === 'object' ? options : {}
    );

    branchDepth += 1;
    const child = nested(...args);
    branchDepth -= 1;

    if (child) {
      route.children.push(child);
    }

    if (branchDepth === 0) {
      routesDefinition.push(route);
    }

    return route;
  }

  function root(...args) {
    return branch('root', ...args);
  }
  function resources(...args) {
    return branch('resources', ...args);
  }
  function namespace(...args) {
    return branch('namespace', ...args);
  }
  function match(...args) {
    return branch('match', ...args);
  }
  function error(...args) {
    return branch('error', ...args);
  }

  routesDefinitionFunc({ root, resources, namespace, match, error });

  return routesDefinition;
};
